define(['jquery'], function ($) {
    return {
        configure: function (config) {
            console.info( "Autoload success!");
            $('#'+config.element_id).html( "Autoload success!" );
        }
    }
});
