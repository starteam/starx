function third_party_main(config) {
    console.info( "3rd_party_main", config);
    var $q = $('#'+config.element_id);
    var value = config.edx_load();
//    var orig_value = config.edx_load();
    $inc_button = '<button value="+" id="INC">+</button>';
    $dec_button = '<button value="-" id="DEC">-</button>';
    $text = '<input type="text" id="VAL"></input>';
    $q.html( $inc_button + $dec_button + $text);
    $('#INC', $q).click( function() { value++; show() });
    $('#DEC', $q).click( function() { value--; show() });

    function show() {
        $('#VAL',$q).val( value );
        config.edx_save(value);
    }
    show();
}
console.info( "loading 3rd_party_main");