function third_party_main(config) {
    console.info( "3rd_party_main", config);
    var $q = $('#'+config.element_id);
    var orig_value = config.edx_load();
    $q.html( "3rd party script is here! " + orig_value );
    new_value = new Date();
    config.edx_save(""+new_value);
}
console.info( "loading 3rd_party_main");