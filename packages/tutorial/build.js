({
	onBuildWrite: function( moduleName, path, contents) {
		console.info( "writing " , moduleName , path ); 
//		var prefix = "(function(window,undefined){ var modules = {} ; modules['jquery'] = window.$; var require = function(deps, creator) { var args = []; var global = { window:window }; var exports = {}; for( var i in deps ) { var m = deps[i]; if( m == 'exports') { args.push(exports); } else if( modules[m]) { args.push(modules[m]); } else if(m.indexOf( '../') == 0 ) { var mm = m.substr(3); if( modules[mm]) { args.push(modules[mm]); } } } console.info( args ); creator.apply( global , args ); }; modules['require'] = require; var define = function(what, deps, creator) { creator = creator || Object; var args = []; var creator_this = { window: window}; var exports = {}; for( var i in deps ) { var m = deps[i]; if( m == 'exports') { args.push(exports); } else { console.info( 'modules' + modules ) ; args.push(modules[m]); } } console.info( 'define start ' + what); var module = creator.apply( creator_this , args ); modules[what] = exports; console.info( 'defined end  ' + what); };";
//		var suffix = "})(window);";
		var prefix = '' ;
		var suffix = '' ;
		return prefix + contents + suffix ;
	},
	optimize: "none",
	preserveLicenseComments:false,
	generateSourceMaps: true,
	appDir: ".",
	baseUrl: ".",
	dir: "../build",
	modules: [ 
		{ name: "SGC" },
	] ,
	paths: {
	        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
//		'jquery': 'StarX/lib/jquery-1.10.1.min',
		'lib/soyutils': 'StarX/lib/soyutils',
		'jquery-ui': 'StarX/lib/jquery-1.10.3.ui.min',
		'css': 'StarX/css'
	},
	map: {
                '*': {
                    'css': 'StarX/css'
                },
	logLevel: 5
}
})
