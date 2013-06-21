define(['jquery','soy_example/test.soy'], function ($,test) {
    console.info("soy is:" + test);
    return {
        configure: function (config) {
            console.info( "Autoload success!");
//            $('#'+config.element_id).html( "Autoload success!" );
            var list = ['a','b','hi chuck!'];
            $('#'+config.element_id).html( test.helloWorld({my_list:list}));
        }
    }
});
