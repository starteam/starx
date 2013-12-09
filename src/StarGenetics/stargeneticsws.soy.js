// This file was automatically generated from stargeneticsws.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var stargeneticsws= stargeneticsws ? stargeneticsws : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
stargeneticsws.before_open = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1>Hello world!</h1><b>Produced by STAR team. </b>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
stargeneticsws.onopen = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1>Connection Established!</h1>', (opt_data['new']) ? '<button class=\'sg_new_experiment\'>New</button>' : '', (opt_data.open) ? '<button class=\'sg_open_experiment\'>Open</button>' : '', (opt_data.save) ? '<button class=\'sg_save_experiment\'>Save</button>' : '', '<textarea class=\'save_experiment_output\'></textarea><br>Text area length:<div class=\'save_experiment_length\'><div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
stargeneticsws.footer = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<b>Produced by STAR team. </b>');
  return opt_sb ? '' : output.toString();
};
for(var i in stargeneticsws) { exports[i] = stargeneticsws[i] };
});
