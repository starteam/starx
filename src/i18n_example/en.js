define(['i18n_example/en/test.soy','i18n_example/en/localized.soy'], function (lang,lang2) {
    for( var i in lang2 )
    {
        console.info( i + " " + lang2[i]);
        lang[i] = lang2[i];
    }
    return lang;
    }
);
