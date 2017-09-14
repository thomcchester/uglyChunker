module.exports = function(grunt) {
    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       watch:{
         scripts:{
           files:['client/**/*'],
           tasks:['uglify','copy'],
           options:{
             spawn: false,
             interrupt: true,
           }
         }
       },
       uglify: {
         options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
         },
         build: {
            src: [
              'client/scripts/app.js',
              'client/scripts/controllers/*.js',
              'client/scripts/factories/*.js'
            ],
            dest: 'server/public/scripts/app.min.js'
         }
       },
       copy: {
         angular : {
           expand: true,
           cwd: 'node_modules',
           src: [
              "angular/*",
              "angular-animate/*",
              "angular-aria/*",
              "angular-material/*",
              "angular-messages/*",
              "angular-route/*",
              "angular-sanitize/*",
              "angular-cookies/*",
              "angular-google-chart/*"
            ],
            "dest": "server/public/vendors/"
         },
         html : {
           expand: true,
           cwd: 'client/views/',
           src: [
              "*",
              "partials/*"
            ],
            "dest": "server/public/views/"
        },
        style : {
          expand: true,
          cwd: 'client/styles/',
          src: [
             "*"
           ],
           "dest": "server/public/styles/"
        }
       }
    });
    grunt.event.on('watch',function(action,filepath,target){
      grunt.log.writeln(target+ ': '+filepath+" has"+action)
    })
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['copy', 'uglify', 'watch']);
};
