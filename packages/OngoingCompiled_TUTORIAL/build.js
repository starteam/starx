({
    optimize: "none",
    preserveLicenseComments: false,
    generateSourceMaps: true,
    appDir: ".",
    baseUrl: ".",
    dir: "../build",
    modules: [
        { name: "SGC" }
    ],
    paths: {
//	        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
        'jquery': 'StarX/jquery',
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
