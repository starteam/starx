define(['jquery','require','i18n_example/en'], function ($, require,default_lang) {
    var config;
    var lang = {};

    function setLang( l )
    {
        lang = l;
    }

    function show() {
            console.info( "i18n success!");
            console.info( lang ) ;
            console.info(lang.helloWorld({}));
            $('#'+config.element_id).html( "i18n success!" + lang.helloWorld({}));
            events();
    }

    function events() {
        $('button').click( function() {
           console.info( "Click!");
           require( [/*'i18n_example/ne'*/ lang.next_language()], function( new_lang ) {
               console.info( new_lang);
               console.info( new_lang.world());

               setLang(new_lang);
               show();
           });
        });
    }
    return {

        configure: function (cfg) {
            config = cfg;
            setLang(default_lang);
            show();
            events();
        }
    }
});
