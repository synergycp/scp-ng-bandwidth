var paths = require('./paths');
var settings = require('./settings');

module.exports = {
  app: {
    project: settings.dir,
    css: paths.dist.css,
    sass: paths.styles,
    image: paths.dist.img,
  },
  themes: {
    project: settings.dir,
    css: paths.dist.css,
    sass: paths.styles,
    image: paths.dist.img,
  },
};
