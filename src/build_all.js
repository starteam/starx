({
	appDir: ".",
	baseUrl: ".",
	dir: "../build",
	modules: [ 
//		{ name: "StarX/main" },
	//	{ name: "StarGenetics/main" },
	//	{ name: "StarSimpleText/main" },
	//	{ name: "StarTMI/main" },
	//	{ name: "StarDistanceMap/main" },
		{ name: "demo" },
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
                }
}
})
