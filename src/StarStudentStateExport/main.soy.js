// This file was automatically generated from main.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var ssse= ssse ? ssse : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
ssse.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append(soy.$$escapeHtml(opt_data.config), '<form action="#" method="POST" enctype="multipart/form-data"><span class="fileinput-button"><span>Add student_state files...</span><input type="file" class="student_files" name="student_files" multiple></span><br><span class="fileinput-button"><span>Add mapping file...</span><input type="file" class="mapping_file" name="mapping_file"></span><br><input type="text" class="mapping_prefix" name="mapping_prefix"><button type="submit" class="start">Start coversion</button><button type="reset" class="cancel">Reset</button><button type="button" class="select_table">Select Table</button><span class="status"></span><span class="out"></span></form>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
ssse.table = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table id="csv_table">');
  var rowList7 = opt_data.rows;
  var rowListLen7 = rowList7.length;
  for (var rowIndex7 = 0; rowIndex7 < rowListLen7; rowIndex7++) {
    var rowData7 = rowList7[rowIndex7];
    output.append('<tr><td>', soy.$$escapeHtml(rowData7[0]), '</td><td>', soy.$$escapeHtml(rowData7[1]), '</td><td>', soy.$$escapeHtml(rowData7[2]), '</td></tr>');
  }
  output.append('</table>');
  return opt_sb ? '' : output.toString();
};
for(var i in ssse) { exports[i] = ssse[i] };
});
