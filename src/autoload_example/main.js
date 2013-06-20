define(['jquery','autoload_example/test.soy'], function ($,test) {
    console.info("soy is:" + test);
    return {
        configure: function (config) {
            console.info( "Autoload success!");
            $('#'+config.element_id).html( "Autoload success!" );
            console.info( test.helloWorld());
        }
    }
});
