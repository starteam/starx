define([], function() {
return {
 configure: function( config ) {
  alert( "Hi from StarBiochem/main" ) ;
  $('#'+config.element_id).html( "Hi Chuck!") ;
 }
}});