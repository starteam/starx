define(['../StarBiochem/main'], function (StarBiochem) {
    return {
        configure: function (config) {
            if (StarBiochem) {
                StarBiochem.configure(config);
            }
        }
    }
});
