module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({


	sass: {
      		options: {
        		sourceMap: true
      		},
      		dist: {
        		files: {
          			'./css/kanban.css': './sass/kanban.sass'
        		}
      		}
    	},

	watch: {
    		scripts: {
        		files: ['**/*.sass'],
        		tasks: ['sass'],
        		options: {
            			spawn: false,
        		},
    		} 
	},
	browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
            			baseDir: "./"
        						}
                }
            }
        }
  });
  // Load the plugins tasks 

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-browser-sync');
  
  // Default task(s).
  grunt.registerTask('default', ["browserSync","sass", "watch"]);
};
