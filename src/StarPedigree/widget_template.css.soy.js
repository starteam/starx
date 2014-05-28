// This file was automatically generated from widget_template.css.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var less_css= less_css ? less_css : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
less_css.css_html = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<style>.starpedigree_workspace {display: block;}</style>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
less_css.css_text = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('.starpedigree_workspace {display: block;}');
  return opt_sb ? '' : output.toString();
};
for(var i in less_css) { exports[i] = less_css[i] };
});
