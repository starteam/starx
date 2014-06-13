function third_party_main(config) {
    console.info("3rd_party_main", config);
    var $q = $('#' + config.element_id);
    var orig_value = config.edx_load();
    var state = {
        'add1': 1,
        'add2': 2,
        'sum': 3
    };
    try {
        state = JSON.parse(orig_value);
    } catch (e) {
        console.info(e);
    }
    var html = '';
    html += "<input class='sx_graded_input' type='text' data-key='add1' value='" + state.add1 + "'>";
    html += "+";
    html += "<input class='sx_graded_input' type='text' data-key='add2' value='" + state.add2 + "'>";
    html += "=";
    html += "<input class='sx_graded_input' type='text' data-key='sum' value='" + state.sum + "'>";
    $q.html(html);
    $('.sx_graded_input', $q).change(function () {
        var $e = $(this);
        var key = $e.data('key');
        var value = $e.val();
        if (key) {
            state[key] = value;
            config.edx_save(JSON.stringify(state));
            console.info("State saved ", state);
        }
    });
}
console.info("loading 3rd_party_main");