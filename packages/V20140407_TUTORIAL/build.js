({
    onBuildWrite: function (moduleName, path, contents) {
        console.info("writing ", moduleName, path);
        var prefix = '';
        var suffix = '';
        return prefix + contents + suffix;
    },
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
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
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
