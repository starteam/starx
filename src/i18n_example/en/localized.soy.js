// This file was automatically generated from localized.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var test= test ? test : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
test.switch2 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Switch to NE');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
test.test = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Test');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
test.world = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<b>world! </b>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
test.is = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('is');
  return opt_sb ? '' : output.toString();
};
for(var i in test) { exports[i] = test[i] };
});
