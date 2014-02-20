define(['StarX/main', 'StarSimpleText/main'], function ( main, simple) {
//    window.STARX_SELECTOR = '.starx_widget';
//    window.STARX_NO_BIND = true;
//    main.init();
    var parent = document.getElementById("insert_here");
    parent.textContent = '{["StarX":"StarSimpleText","state":"jshidden"]}';
    main.load( parent.parentElement ) ;
    console.info( "Hello");
});
require(['demo'], function(q) { console.info(q); } ) ;
