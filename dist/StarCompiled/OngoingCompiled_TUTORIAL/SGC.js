define('SGC',['StarX/main', 'StarTMI/itmi','StarGenetics/main'], function ( main, itmi, simple) {
    var parent = document.getElementById("insert_here");
    parent.textContent = '{["StarX":"StarGenetics", "gwt_path":"StarCompiled/OngoingCompiled_TUTORIAL/gwtframe.html","edx_opts":{"full_screen":false,"auto_load":true,"studio_hostname":"studio.mitx.mit.edu","hide_actions":true,"auto_load":true},"state":"star_genetics_input","width":500, "height":500,"color":"red","Widget":"JSApp","config":{"model_type":"bundled_samples","bundled_samples":"tutorial"}]}';
    main.load( parent.parentElement ) ;
    console.info( "Hello");
});
require(['SGC'], function(q) { console.info(q); } ) ;

