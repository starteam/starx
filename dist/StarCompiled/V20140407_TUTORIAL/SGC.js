define('SGC',['StarX/main', 'StarGenetics/main'], function ( main, simple) {
    var parent = document.getElementById("insert_here");
    parent.textContent = '{["StarX":"StarGenetics", "gwt_path":"StarCompiled/V20140407_TUTORIAL/gwtframe.html","state":"star_genetics_input","width":500, "height":500,"color":"red","Widget":"JSApp","config":{"model_type":"bundled_samples","bundled_samples":"tutorial"}]}';
    main.load( parent.parentElement ) ;
    console.info( "Hello");
});
require(['SGC'], function(q) { console.info(q); } ) ;