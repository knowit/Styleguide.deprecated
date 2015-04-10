/* global module: false */

module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/screen.css': 'sass/screen.scss'
				}
			},
			dev: {
				files: [{
					'css/screen.css': 'sass/screen.scss'
				}, {
					'styleguide/css/styleguide.css': 'sass/styleguide.scss'
				}]
			}
		},
		kss: {
			options: {
				css: 'css/styleguide.css',
				template: 'template'
			},
			dist: {
				files: {
					'styleguide': ['sass/modules']
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
			dev: {
				bsFiles: {
					src: [
						'web.config',
						'obj/**/*.dll',
						'css/screen.css',
						'scripts/**/*.js',
						'Views/**/*.cshtml',
						'*.jsx'
					]
				},
				options: {
					open: false,
					proxy: '[Local Hostname]',
					watchTask: true,
					port: 3000
				}
			}
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
		},
		bower: {
	    install: {
	    	options: {
	    			targetDir: 'bower_components'
	       //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
	    	}
	    }
  	}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-kss');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-bower-task');

	grunt.registerTask('teamcity', ['bower:install']);

	grunt.registerTask('build', ['sass:dev']);
	grunt.registerTask('maps', ['sass:dev', 'autoprefixer']);
	grunt.registerTask('styleguide', ['sass:dev', 'kss', 'browserSync:styleguide', 'watch']);
	grunt.registerTask('default', ['sass:dev', 'autoprefixer', 'kss', 'browserSync:dev',
		'watch'
	]);
};
