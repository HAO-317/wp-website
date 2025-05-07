const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

(async () => {
  await imagemin(['src/images/*.{jpg,png}'], {
    destination: 'dist/assets',
    plugins: [imageminWebp({ quality: 80 })]
  });
  console.log('Images optimized to WebP');
})();