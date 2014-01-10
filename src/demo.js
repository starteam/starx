
require(['StarX/main', 'StarSimpleText/main'], function ( main, simple) {
    window.STARX_SELECTOR = '.starx_widget';
    window.STARX_NO_BIND = true;
    main.init();
    console.info( "Hello");
});
