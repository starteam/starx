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
  output.append('<h1>Hello world!</h1><b>Test</b><ul>');
  var elementList4 = opt_data.my_list;
  var elementListLen4 = elementList4.length;
  for (var elementIndex4 = 0; elementIndex4 < elementListLen4; elementIndex4++) {
    var elementData4 = elementList4[elementIndex4];
    output.append('<li><em>', soy.$$escapeHtml(elementData4), '</em></li>');
  }
  output.append('</ul><b>Produced by STAR team. </b>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
test.footer = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<b>Produced by STAR team. </b>');
  return opt_sb ? '' : output.toString();
};
for(var i in test) { exports[i] = test[i] };
});
