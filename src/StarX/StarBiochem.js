define(['StarBiochem/main'], function (StarBiochem) {
    return {
        configure: function (config) {
            $('#' + config.element_id).html(StarBiochem ? "Loading StarBiochem" : "Failed initializing StarBiochem");
            if (StarBiochem) {
                StarBiochem.configure(config);
            }
        }
    }
});
