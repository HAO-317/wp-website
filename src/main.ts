// 类型定义
interface Partner {
  name: string;
  title: string;
  professionalTitle: string;
  bio: string;
  imageSrc: string;
}

interface ModalContent {
  title: string;
  description?: string;
  imageSrc?: string | string[];
  partners?: Partner[];
}

// 规范化标题
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .trim();
}

// 加载 content.json
async function loadContent(): Promise<{ [key: string]: ModalContent }> {
  try {
    const response = await fetch('/src/data/content.json');
    if (!response.ok) throw new Error('Failed to load content.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading content:', error);
    return {};
  }
}

// 创建轮播 HTML
function createCarousel(imageSrc: string[]): string {
  return `
    <div class="carousel">
      ${imageSrc
        .map(
          (src, index) => `
        <img src="${src}" alt="Carousel image ${index + 1}" class="carousel-image ${index === 0 ? 'active' : ''}" />
      `
        )
        .join('')}
      <button class="carousel-prev">❮</button>
      <button class="carousel-next">❯</button>
    </div>
  `;
}

// 弹窗功能
const createModal = (content: ModalContent) => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  let contentHtml = '';

  if (content.partners) {
    // TEAM 弹窗：左右并列合伙人
    contentHtml = `
      <h4>${content.title}</h4>
      <div class="team-container">
        ${content.partners
          .map(
            (partner) => `
          <div class="partner-box">
            <img src="${partner.imageSrc}" alt="${partner.name}" class="partner-image" />
            <h5>${partner.name}</h5>
            <p class="partner-title">${partner.title}</p>
            <p class="partner-professional">${partner.professionalTitle}</p>
            <div class="partner-bio">${partner.bio}</div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  } else {
    // 其他弹窗：默认布局
    const imageHtml = Array.isArray(content.imageSrc)
      ? createCarousel(content.imageSrc)
      : `<img src="${content.imageSrc}" alt="${content.title}" class="modal-image" />`;
    contentHtml = `
      ${imageHtml}
      <h4>${content.title}</h4>
      <div class="modal-description">${content.description}</div>
    `;
  }

  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">×</span>
      ${contentHtml}
      <button class="modal-go-back">Go Back</button>
    </div>
  `;
  document.body.appendChild(modal);

  // 关闭弹窗
  const closeModal = () => modal.remove();
  modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modal.querySelector('.modal-go-back')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 轮播逻辑
  if (Array.isArray(content.imageSrc)) {
    const images = modal.querySelectorAll('.carousel-image') as NodeListOf<HTMLImageElement>;
    const prevBtn = modal.querySelector('.carousel-prev') as HTMLButtonElement;
    const nextBtn = modal.querySelector('.carousel-next') as HTMLButtonElement;
    let currentIndex = 0;

    const showImage = (index: number) => {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }, 3000);
  }
};

// 导航滚动和汉堡菜单
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-list li');
  const navList = document.querySelector('.nav-list') as HTMLElement;
  const hamburger = document.querySelector('.hamburger') as HTMLElement;
  const impressumLink = document.querySelector('.impressum') as HTMLElement;
  const sectionMap: { [key: string]: string } = {
    HOME: '.hero',
    ABOUT: '.about',
    SERVICES: '.services',
    PROJECTS: '.projects',
    CONTACT: '.contact',
  };

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const sectionId = sectionMap[item.textContent?.toUpperCase() || ''];
      if (sectionId) {
        document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        navList.classList.remove('active');
      }
    });
  });

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navList.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!navList.contains(e.target as Node) && !hamburger.contains(e.target as Node)) {
      navList.classList.remove('active');
    }
  });

  impressumLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const contentData = await loadContent();
    const content = contentData['Imprint'];
    if (content) {
      createModal({
        imageSrc: content.imageSrc,
        title: content.title,
        description: content.description,
      });
    } else {
      console.error('No content found for Imprint');
    }
  });
});

// 处理 Read More 按钮
document.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'A' && target.textContent === 'Read More') {
    e.preventDefault();
    const parent = target.closest('.img-text-box, .img-text-box2');
    if (parent) {
      const title = parent.querySelector('h4')?.textContent || '';
      console.log('Clicked title:', title);
      const contentData = await loadContent();
      const normalizedTitle = normalizeTitle(title);
      const contentEntry = Object.entries(contentData).find(
        ([key]) => normalizeTitle(key) === normalizedTitle
      );
      if (contentEntry) {
        const content = contentEntry[1];
        createModal(content);
      } else {
        console.error(`No content found for title: ${title}`);
      }
    }
  }
});

// 表单提交
const contactForm = document.querySelector('.contact form') as HTMLFormElement;
const submitButton = document.querySelector('.subm') as HTMLInputElement;
const feedback = document.createElement('p');
feedback.className = 'form-feedback';
submitButton.insertAdjacentElement('afterend', feedback);

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = (document.getElementById('name') as HTMLInputElement).value.trim();
  const company = (document.getElementById('company') as HTMLInputElement).value.trim();
  const email = (document.getElementById('mail') as HTMLInputElement).value.trim();
  const message = (document.getElementById('textarea') as HTMLTextAreaElement).value.trim();

  if (!name || !company || !email || !message) {
    feedback.textContent = 'Please fill in all fields.';
    feedback.style.color = 'red';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    feedback.textContent = 'Please enter a valid email address.';
    feedback.style.color = 'red';
    return;
  }

  const mailtoLink = `mailto:info@Wagner-partners.com?subject=Contact Form Submission&body=Name: ${encodeURIComponent(name)}%0AEmail:  ${encodeURIComponent(company)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
  window.location.href = mailtoLink;

  feedback.textContent = 'Please complete the email sending to confirm the successful submission of your contact inquiry!';
  feedback.style.color = 'green';
  contactForm.reset();
});