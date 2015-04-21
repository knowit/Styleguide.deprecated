/* global module: false */
/*global require*/

var sassIncludePaths = require('node-neat').includePaths;
sassIncludePaths.push('sass/');

module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/screen.css': 'sass/screen.scss'
				},
				options: {
				  includePaths: sassIncludePaths
				}
			},
			dev: {
				files: [{
					'css/screen.css': 'sass/screen.scss'
				}, {
					'styleguide/css/styleguide.css': 'sass/styleguide.scss'
				}],
				options: {
				  includePaths: sassIncludePaths
				}
			}
		},
		kss: {
			options: {
				css: 'css/styleguide.css',
				template: 'template'
			},
			dist: {
				files: {
					'styleguide': ['sass']
				}
			}
		},
		browserSync: {
			styleguide: {
				bsFiles: {
					src: ['styleguide/**/*.css', 'styleguide/**/*.html']
				},
				options: {
					open: true,
					watchTask: true,
					port: 3333,
					server: {
						baseDir: 'styleguide'
					},
				}
			},
			// dev: {
			// 	bsFiles: {
			// 		src: [
			// 			'web.config',
			// 			'obj/**/*.dll',
			// 			'css/screen.css',
			// 			'scripts/**/*.js',
			// 			'Views/**/*.cshtml',
			// 			'*.jsx'
			// 		]
			// 	},
			// 	options: {
			// 		open: false,
			// 		proxy: '[Local Hostname]',
			// 		watchTask: true,
			// 		port: 3000
			// 	}
			// }
		},
		watch: {
			css: {
				files: ['sass/**/*.scss'],
				tasks: ['sass:dev']
			},
      html: {
          files: ['sass/modules/*.scss'],
          tasks: ['kss']
      },
			configFiles: {
				files: ['Gruntfile.js', 'package.json'],
				options: {
					reload: true
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 9']
			},
			dist: {
				src: 'css/screen.css',
				dest: 'css/screen.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-kss');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('build', ['sass:dev']);
	grunt.registerTask('maps', ['sass:dev', 'autoprefixer']);
	grunt.registerTask('default', ['sass:dev', 'kss', 'browserSync:styleguide', 'watch']);

	// grunt.registerTask('default', ['sass:dev', 'autoprefixer', 'kss', 'browserSync:dev',
	// 	'watch'
	// ]);
};
