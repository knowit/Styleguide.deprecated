var path = require('path');

/**
 * Registers the "package-version" Handlebars helper.
 *
 * @param {object} handlebars The global Handlebars object used by kss-node's kssHandlebarsGenerator.
 */
module.exports.register = function(handlebars) {
  handlebars.registerHelper('package-version', function() {
    // package.json config object
    var config = require(path.resolve(process.cwd(), 'package.json'));
    return config.version;
  });
};
