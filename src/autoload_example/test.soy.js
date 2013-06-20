// This file was automatically generated from test.soy.
// Please don't edit this file by hand.

define(['require','exports','libs/soyutils'],function(require,exports,soy){
 var test= test ? test : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
test.helloWorld = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Hello world! To Me!');
  return opt_sb ? '' : output.toString();
};
for(var i in test) { exports[i] = test[i] };
});
