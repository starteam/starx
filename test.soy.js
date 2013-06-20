// This file was automatically generated from test.soy.
// Please don't edit this file by hand.

goog.provide('examples.simple');

goog.require('soy');
goog.require('soy.StringBuilder');


examples.simple.helloWorld = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Hello world! To Me!');
  return opt_sb ? '' : output.toString();
};
