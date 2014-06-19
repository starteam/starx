// This file was automatically generated from editor.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var editor= editor ? editor : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
editor.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p>Columns: <input data-bind="value: cols" /></p><p>Rows: <input data-bind="value: rows" /></p><p>EdX State: <input data-bind="value: state" /></p><p>Minimal Widget Height: <input data-bind="value: min_widget_height" /></p><p>Full Text:<div class="starx_widget" data-bind="text: starx_text"></div><div id="', soy.$$escapeHtml(opt_data.config.element_id), '_Preview"></div></p>');
  return opt_sb ? '' : output.toString();
};
for(var i in editor) { exports[i] = editor[i] };
});
