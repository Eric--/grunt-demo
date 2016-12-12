module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n',
				banner : '/*! <%= pkg.name %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			slidercss: {
				src: [
					'./src/css/a.css',
					'./src/css/b.css'
				],
				dest: './src/css/<%= pkg.name %>.css'
			},
			sliderjs: {
				src: [
					'./src/js/a.js',
					'./src/js/b.js'
				],
				dest: './src/js/<%= pkg.name %>.js'
			}
		},
		jshint: {
			options: {
				banner : '/*! <%= pkg.name %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			sliderjs: {
				src: [
					'./src/js/<%= pkg.name %>.js'
				]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			sliderjs: {
				files: {
					'./output/asset/js/<%= pkg.name %>.min.js' : './src/js/<%= pkg.name %>.js'
				}
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0,
				banner: '/*! <%= pkg.name %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			slidercss: {
				files:{
					'./output/asset/css/<%= pkg.name %>.min.css' : './src/css/<%= pkg.name %>.css'
				}
			}
		},
		copy: {
			sliderfile: {
				files: [
					{expand: true, cwd: './src/tpl/', src: ['**'], dest: './output/asset/'}
				]
			}
		},
		watch: {
			scripts:{
				files: ['./src/js/*.js'],
				tasks: ["concat", "uglify"]
			},
			csses: {
				files: ['./src/css/*.css'],
				tasks: ["concat", "cssmin"]
			},
			statics: {
				files: ["./src/tpl/*.html"],
				tasks: ["copy"]
			},
			refresh: {
				  options: {
						livereload: 35737
					},
					files: [
							'./output/asset/*.html',
							'./output/asset/css/<%= pkg.name %>.min.css',
							'./output/asset/js/<%= pkg.name %>.min.js'
					]
			}
		},
		connect:{
			server: {
				options: {
					port: 9001,
					livereload: 35737,
					base: './'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ["concat"]);
	grunt.registerTask('mywatch', ["watch"]);
  grunt.registerTask('myuglify', ["uglify"]);
  grunt.registerTask('mydef',['concat','uglify', 'cssmin', 'copy', 'connect','watch']);
};