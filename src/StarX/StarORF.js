define(['../StarORF/main'], function (StarORF) {
    return {
        configure: function (config) {
            $('#' + config.element_id).html(StarORF ? "Loading StarORF" : "Failed initializing StarORF");
            if (StarORF) {
                StarORF.configure(config);
            }
        }
    }
});
