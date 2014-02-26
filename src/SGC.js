(function(window,undefined){

var modules = {} ;
modules['jquery'] = window.$;
var require = function(deps, creator) {
    var args = [];
    var global = { window:window };
    var exports = {};
    for( var i in deps )
    {
        var m = deps[i];
        if( m == 'exports')
        {
            args.push(exports);
        }
        else if( modules[m])
        {
            args.push(modules[m]);
        } else if(m.indexOf( "../") == 0 )
        {
            var mm = m.substr(3);
            if( modules[mm])
            {
                args.push(modules[mm]);
            }
        }
    }
    console.info( args );
    creator.apply( global , args );
}
    modules['require'] = require;

var define = function(what, deps, creator) {

    creator = creator || Object;
    var args = [];
    var creator_this = { window: window};
    var exports = {};
    for( var i in deps )
    {
        var m = deps[i];
        if( m == 'exports')
        {
            args.push(exports);
        }
        else
        {
            console.info( "modules" + modules ) ;
            args.push(modules[m]);
        }
    }
    console.info( "define start " + what);
    var module = creator.apply( creator_this , args );
    modules[what] = exports;
    console.info( "defined end  " + what);
}
    // here goes content
define('SGC',['StarX/main', 'StarGenetics/main'], function ( main, simple) {
    var parent = document.getElementById("insert_here");
//    parent.textContent = '{["StarX":"StarGenetics", "gwt_path":"StarCompiled/V20140225_EX5/gwtframe.html","state":"star_genetics_input","width":500, "height":500,"color":"red","Widget":"JSApp","config":{"model_type":"bundled_samples","bundled_samples":"fruit_fly_exercise_5"}]}';
    parent.textContent = '{["StarX":"StarGenetics", "gwt_path":"StarCompiled/V20140225_TUTORIAL/gwtframe.html","state":"star_genetics_input","width":500, "height":500,"color":"red","Widget":"JSApp","config":{"model_type":"bundled_samples","bundled_samples":"tutorial"}]}';
    main.load( parent.parentElement ) ;
    console.info( "Hello");
});
require(['SGC'], function(q) { console.info(q); } ) ;
    // here goes content

})(window);
