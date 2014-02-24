define('SGC',['StarX/main', 'StarGenetics/main'], function ( main, simple) {
    var parent = document.getElementById("insert_here");
    parent.textContent = '{["StarX":"StarGenetics", "gwt_path":"StarCompiled/V20140225_EX5/gwtframe.html","width":500, "height":500,"color":"red","Widget":"JSApp","config":{"model_type":"bundled_samples","bundled_samples":"fruit_fly_exercise_5"}]}';
    main.load( parent.parentElement ) ;
    console.info( "Hello");
});
require(['SGC'], function(q) { console.info(q); } ) ;
