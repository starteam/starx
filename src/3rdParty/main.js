define(['jquery'],function($) {
    return {
        configure: function(config) {
            var edx_save = function(val) {
                var jq = $('[name=' + config.state + ']');
                var ret = $('#' + jq.attr('inputid'));
                ret.attr('value', val);
            };

            var edx_load = function() {
                var jq = $('[name=' + config.state + ']');
                var ret = $('#' + jq.attr('inputid'));
                return ret.val();
            };

            var onload = function() {
                console.info("script loaded");
                var main_fn = config.main;
                if(window[main_fn]) {
                    window[main_fn](config);
                }
                else
                {
                    $m.html( "Main not found.");
                }
            };

            config.edx_save = edx_save;
            config.edx_load = edx_load;

            console.info("3rdParty starting...");
            var $q = $('#'+config.element_id);
            var $m = $( "<div>3rdParty loading...</div>" );
            $q.html($m);
            var script = '<script src="'+config.src+'"></script>';
            var $script = $(script);
            $.getScript(config.src,onload);
        }
    }
})