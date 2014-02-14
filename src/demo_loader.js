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

    // here goes content

})(window);