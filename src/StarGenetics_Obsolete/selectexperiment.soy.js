// This file was automatically generated from selectexperiment.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var stargenetic_selectexperiment= stargenetic_selectexperiment ? stargenetic_selectexperiment : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
stargenetic_selectexperiment.select_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select class=\'sg_1_select_experiment\'>');
  var experimentList4 = opt_data.experiments;
  var experimentListLen4 = experimentList4.length;
  for (var experimentIndex4 = 0; experimentIndex4 < experimentListLen4; experimentIndex4++) {
    var experimentData4 = experimentList4[experimentIndex4];
    output.append('<option value=\'', soy.$$escapeHtml(experimentData4.id), '\' ', (opt_data.selected == experimentData4.id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(experimentData4.name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};
for(var i in stargenetic_selectexperiment) { exports[i] = stargenetic_selectexperiment[i] };
});
