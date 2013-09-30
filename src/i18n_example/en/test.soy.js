// This file was automatically generated from test.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var test= test ? test : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
test.helloWorld = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1>Hello ');
  exports.world(null, output);
  output.append('</h1><b>');
  exports.test(null, output);
  output.append('</b><br/>');
  exports.sum({a: 2, b: 3}, output);
  output.append('<br/><button>');
  exports.switch(null, output);
  output.append('</button>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
test.sum = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append(soy.$$escapeHtml(opt_data.a), ' + ', soy.$$escapeHtml(opt_data.b), ' ');
  exports.is(null, output);
  output.append(' ', soy.$$escapeHtml(opt_data.a + opt_data.b));
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
test.next_language = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('i18n_example/ne');
  return opt_sb ? '' : output.toString();
};
for(var i in test) { exports[i] = test[i] };
});
