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

interface ContentData {
  EN: { [key: string]: ModalContent };
  DE: { [key: string]: ModalContent };
}

// 翻译对象，覆盖静态内容、表单和子内容，添加 originalKey 映射
const translations = {
  EN: {
    nav: ['HOME', 'ABOUT', 'SERVICES', 'PROJECTS', 'CONTACT'],
    hero: {
      title: 'WAGNER & PARTNERS',
      subtitle: 'The Credible Way To Incredible Success'
    },
    about: {
      title: 'ABOUT US',
      subtitle: 'Pioneering Global Success with Integrity and Sustainability',
      items: [
        {
          title: 'MISSION',
          subtitle: 'The Credible Way to Incredible Success.',
          originalKey: 'MISSION'
        },
        {
          title: 'TEAM',
          subtitle: 'Our team consists of experienced professionals across industries.',
          originalKey: 'TEAM'
        },
        {
          title: 'STRUCTURE',
          subtitle: 'We operate a global network to support our clients.',
          originalKey: 'STRUCTURE'
        }
      ]
    },
    services: {
      title: 'OUR SERVICES',
      subtitle: 'Empowering Your Global Ambitions with Sustainable Expertise',
      items: [
        {
          title: 'International Business Resources',
          subtitle: 'Your Gateway to Global Markets',
          originalKey: 'International Business Resources'
        },
        {
          title: 'Cross-Border Financial Solutions & Services',
          subtitle: 'Financial Freedom Through Global Expertise',
          originalKey: 'Cross-Border Financial Solutions and Services'
        },
        {
          title: 'Technology',
          subtitle: 'Transferring Technology for Global Impact.',
          originalKey: 'Technology'
        },
        {
          title: 'China Affairs Expert',
          subtitle: 'Your Partner for the Chinese Market',
          originalKey: 'China Affairs Expert'
        }
      ]
    },
    projects: {
      title: 'PROJECTS',
      subtitle: 'Driving Lasting Impact Through Sustainable Global Initiatives',
      items: [
        {
          title: 'Food & Agriculture',
          subtitle: 'Connecting Sustainable Producers to Global Markets',
          originalKey: 'Food & Agriculture'
        },
        {
          title: 'Technology & Patents',
          subtitle: 'Bridging Innovators with Global Opportunities',
          originalKey: 'Technology & Patents'
        },
        {
          title: 'Investment & Foundation',
          subtitle: 'Building Wealth and Social Good Globally',
          originalKey: 'Investment & Foundation'
        }
      ]
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Partner with Us for Sustainable Global Success',
      placeholders: ['Your Name', 'Company', 'Enter email', 'Write Something'],
      submit: 'Say Hello',
      feedback: {
        success: 'Please complete the email sending to confirm the successful submission of your contact inquiry!',
        empty: 'Please fill in all fields.',
        invalidEmail: 'Please enter a valid email address.'
      }
    },
    footer: {
      copyright: '© 2025 WAGNER & PARTNERS',
      imprint: 'IMPRINT'
    }
  },
  DE: {
    nav: ['STARTSEITE', 'ÜBER UNS', 'DIENSTLEISTUNGEN', 'PROJEKTE', 'KONTAKT'],
    hero: {
      title: 'WAGNER & PARTNERS',
      subtitle: 'Der verlässliche Weg zu außergewöhnlichem Erfolg'
    },
    about: {
      title: 'ÜBER UNS',
      subtitle: 'Pionierarbeit für globalen Erfolg mit Integrität und Nachhaltigkeit',
      items: [
        {
          title: 'MISSION',
          subtitle: 'Der verlässliche Weg zu außergewöhnlichem Erfolg.',
          originalKey: 'MISSION'
        },
        {
          title: 'TEAM',
          subtitle: 'Unser Team besteht aus erfahrenen Fachleuten aus verschiedenen Branchen.',
          originalKey: 'TEAM'
        },
        {
          title: 'STRUKTUR',
          subtitle: 'Wir betreiben ein globales Netzwerk zur Unterstützung unserer Kunden.',
          originalKey: 'STRUCTURE'
        }
      ]
    },
    services: {
      title: 'UNSERE DIENSTLEISTUNGEN',
      subtitle: 'Ermöglichung Ihrer globalen Ambitionen mit nachhaltiger Expertise',
      items: [
        {
          title: 'Internationale Geschäftsressourcen',
          subtitle: 'Ihr Tor zu globalen Märkten',
          originalKey: 'International Business Resources'
        },
        {
          title: 'Grenzüberschreitende Finanzlösungen & Dienstleistungen',
          subtitle: 'Finanzielle Freiheit durch globale Expertise',
          originalKey: 'Cross-Border Financial Solutions and Services'
        },
        {
          title: 'Technologie',
          subtitle: 'Technologietransfer für globale Wirkung.',
          originalKey: 'Technology'
        },
        {
          title: 'Experte für China-Angelegenheiten',
          subtitle: 'Ihr Partner für den chinesischen Markt',
          originalKey: 'China Affairs Expert'
        }
      ]
    },
    projects: {
      title: 'PROJEKTE',
      subtitle: 'Nachhaltige globale Initiativen für langfristige Wirkung',
      items: [
        {
          title: 'Lebensmittel & Landwirtschaft',
          subtitle: 'Verbindung nachhaltiger Produzenten mit globalen Märkten',
          originalKey: 'Food & Agriculture'
        },
        {
          title: 'Technologie & Patente',
          subtitle: 'Verbindung von Innovatoren mit globalen Möglichkeiten',
          originalKey: 'Technology & Patents'
        },
        {
          title: 'Investitionen & Stiftungen',
          subtitle: 'Aufbau von Wohlstand und sozialem Wohl global',
          originalKey: 'Investment & Foundation'
        }
      ]
    },
    contact: {
      title: 'Kontaktieren Sie uns',
      subtitle: 'Partner für nachhaltigen globalen Erfolg',
      placeholders: ['Ihr Name', 'Unternehmen', 'E-Mail eingeben', 'Nachricht schreiben'],
      submit: 'Hallo sagen',
      feedback: {
        success: 'Bitte senden Sie die E-Mail ab, um die erfolgreiche Übermittlung Ihrer Kontaktanfrage zu bestätigen!',
        empty: 'Bitte füllen Sie alle Felder aus.',
        invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
      }
    },
    footer: {
      copyright: '© 2025 WAGNER & PARTNERS',
      imprint: 'IMPRESSUM'
    }
  }
};

// 规范化标题
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .trim();
}

// 加载 content.json
async function loadContent(): Promise<ContentData> {
  try {
    const response = await fetch('/src/data/content.json');
    if (!response.ok) throw new Error('Failed to load content.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading content:', error);
    return { EN: {}, DE: {} };
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

  const closeModal = () => modal.remove();
  modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modal.querySelector('.modal-go-back')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

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

// 更新页面内容
function updateContent(lang: 'EN' | 'DE') {
  // 更新导航
  const navItems = document.querySelectorAll('.nav-list li');
  navItems.forEach((item, i) => {
    item.textContent = translations[lang].nav[i];
  });

  // 更新 hero
  const heroTitle = document.querySelector('.hero h1') as HTMLElement;
  const heroSubtitle = document.querySelector('.hero p') as HTMLElement;
  heroTitle.textContent = translations[lang].hero.title;
  heroSubtitle.textContent = translations[lang].hero.subtitle;

  // 更新 about
  const aboutTitle = document.querySelector('.about .head-subhead h3') as HTMLElement;
  const aboutSubtitle = document.querySelector('.about .head-subhead p') as HTMLElement;
  aboutTitle.textContent = translations[lang].about.title;
  aboutSubtitle.textContent = translations[lang].about.subtitle;
  const aboutItems = document.querySelectorAll('.about .img-text-box');
  aboutItems.forEach((item, i) => {
    const title = item.querySelector('h4') as HTMLElement;
    const subtitle = item.querySelector('p') as HTMLElement;
    title.textContent = translations[lang].about.items[i].title;
    subtitle.textContent = translations[lang].about.items[i].subtitle;
  });

  // 更新 services
  const servicesTitle = document.querySelector('.services .head-subhead h3') as HTMLElement;
  const servicesSubtitle = document.querySelector('.services .head-subhead p') as HTMLElement;
  servicesTitle.textContent = translations[lang].services.title;
  servicesSubtitle.textContent = translations[lang].services.subtitle;
  const serviceItems = document.querySelectorAll('.services .img-text-box2');
  serviceItems.forEach((item, i) => {
    const title = item.querySelector('h4') as HTMLElement;
    const subtitle = item.querySelector('p') as HTMLElement;
    title.textContent = translations[lang].services.items[i].title;
    subtitle.textContent = translations[lang].services.items[i].subtitle;
  });

  // 更新 projects
  const projectsTitle = document.querySelector('.projects .head-subhead h3') as HTMLElement;
  const projectsSubtitle = document.querySelector('.projects .head-subhead p') as HTMLElement;
  projectsTitle.textContent = translations[lang].projects.title;
  projectsSubtitle.textContent = translations[lang].projects.subtitle;
  const projectItems = document.querySelectorAll('.projects .img-text-box');
  projectItems.forEach((item, i) => {
    const title = item.querySelector('h4') as HTMLElement;
    const subtitle = item.querySelector('p') as HTMLElement;
    title.textContent = translations[lang].projects.items[i].title;
    subtitle.textContent = translations[lang].projects.items[i].subtitle;
  });

  // 更新 contact
  const contactTitle = document.querySelector('.contact .head-subhead h3') as HTMLElement;
  const contactSubtitle = document.querySelector('.contact .head-subhead p') as HTMLElement;
  contactTitle.textContent = translations[lang].contact.title;
  contactSubtitle.textContent = translations[lang].contact.subtitle;

  // 更新表单
  const contactForm = document.querySelector('.contact form') as HTMLFormElement;
  const inputs = contactForm.querySelectorAll('input:not([type="submit"]), textarea');
  inputs.forEach((input, i) => {
    input.setAttribute('placeholder', translations[lang].contact.placeholders[i]);
  });
  const submitButton = document.querySelector('.subm') as HTMLInputElement;
  submitButton.value = translations[lang].contact.submit;

  // 更新 footer
  const footerCopyright = document.querySelector('.footer p') as HTMLElement;
  const footerImprint = document.querySelector('.footer .impressum') as HTMLElement;
  footerCopyright.textContent = translations[lang].footer.copyright;
  footerImprint.textContent = translations[lang].footer.imprint;
}

// 主逻辑
document.addEventListener('DOMContentLoaded', async () => {
  // 初始化语言
  let currentLang: 'EN' | 'DE' = (localStorage.getItem('lang') as 'EN' | 'DE') || 'EN';
  const langMenu = document.querySelector('.lang-menu') as HTMLElement;
  const currentLangSpan = document.querySelector('#current-lang') as HTMLElement;
  const languageContainer = document.querySelector('.language') as HTMLElement;
  currentLangSpan.textContent = currentLang;

  // 更新页面内容
  updateContent(currentLang);

  // 语言切换
  languageContainer.addEventListener('click', (e) => {
    e.stopPropagation(); // 防止触发 document 的关闭事件
    langMenu.classList.toggle('active');
  });

  // 鼠标离开时关闭选单
  languageContainer.addEventListener('mouseleave', () => {
    langMenu.classList.remove('active');
  });

  document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = option.getAttribute('data-lang') as 'EN' | 'DE';
      localStorage.setItem('lang', lang);
      currentLang = lang;
      currentLangSpan.textContent = lang;
      updateContent(lang);
      langMenu.classList.remove('active');
    });
  });

  // 点击外部关闭语言选单
  document.addEventListener('click', (e) => {
    if (!langMenu.contains(e.target as Node) && !languageContainer.contains(e.target as Node)) {
      langMenu.classList.remove('active');
    }
  });

  // 导航滚动和汉堡菜单
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
    STARTSEITE: '.hero',
    'ÜBER UNS': '.about',
    DIENSTLEISTUNGEN: '.services',
    PROJEKTE: '.projects',
    KONTAKT: '.contact'
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
    const content = contentData[currentLang][currentLang === 'EN' ? 'Imprint' : 'Impressum'];
    if (content) {
      createModal({
        imageSrc: content.imageSrc,
        title: content.title,
        description: content.description
      });
    } else {
      console.error(`No content found for ${currentLang === 'EN' ? 'Imprint' : 'Impressum'}`);
    }
  });

  // 处理 Read More 按钮
  document.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' && target.textContent === 'Read More') {
      e.preventDefault();
      const parent = target.closest('.img-text-box, .img-text-box2');
      if (parent) {
        const title = parent.querySelector('h4')?.textContent || '';
        const contentData = await loadContent();
        
        // 查找 translations 中匹配的 originalKey
        let originalKey = '';
        const sections = [translations[currentLang].about.items, translations[currentLang].services.items, translations[currentLang].projects.items].flat();
        const matchingItem = sections.find(item => item.title === title);
        if (matchingItem) {
          originalKey = matchingItem.originalKey;
        }

        // 使用 originalKey 查找 content.json
        const content = originalKey ? contentData[currentLang][originalKey] : undefined;
        if (content) {
          createModal(content);
        } else {
          console.error(`No content found for title: ${title}, originalKey: ${originalKey}`);
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
      feedback.textContent = translations[currentLang].contact.feedback.empty;
      feedback.style.color = 'red';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = translations[currentLang].contact.feedback.invalidEmail;
      feedback.style.color = 'red';
      return;
    }

    const mailtoLink = `mailto:info@Wagner-partners.com?subject=Contact Form Submission&body=Name: ${encodeURIComponent(name)}%0ACompany: ${encodeURIComponent(company)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;

    feedback.textContent = translations[currentLang].contact.feedback.success;
    feedback.style.color = 'green';
    contactForm.reset();
  });
});