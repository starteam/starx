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
  output.append('<form action="#" method="POST" enctype="multipart/form-data"><span class="fileinput-button"><span>Add student_state files...</span><input type="file" class="btn btn-default student_files active " name="student_files" multiple></span><br><span class="fileinput-button"><span>Add mapping file...</span><input type="file" class="btn btn-default mapping_file active" name="mapping_file"></span><br><span class="fileinput-button"><span>Prefix:</span><input type="text"class="mapping_prefix" name="mapping_prefix"></span><br><p class="fileinput-button"><button type="submit" class="btn btn-primary start">Start coversion</button><button type="reset" class="btn btn-danger cancel">Reset</button><button type="button" class="btn btn-info select_table">Select Table</button><span class=\'download\' /></p><span class="status"></span><span class="out"></span></form>');
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
  output.append('<h2>Converted data</h2><table id="csv_table" class="table table-striped"><tbody>');
  var rowList6 = opt_data.rows;
  var rowListLen6 = rowList6.length;
  for (var rowIndex6 = 0; rowIndex6 < rowListLen6; rowIndex6++) {
    var rowData6 = rowList6[rowIndex6];
    output.append('<tr><td>', soy.$$escapeHtml(rowData6[0]), '</td><td>', soy.$$escapeHtml(rowData6[1]), '</td><td>', soy.$$escapeHtml(rowData6[2]), '</td></tr>');
  }
  output.append('</tbody></table>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
ssse.download = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href=\'', soy.$$escapeHtml(opt_data.data), '\' style="margin-top:5px; display:inline-block" class=\'btn btn-info\' download="converted_data.csv">Download</a>');
  return opt_sb ? '' : output.toString();
};
for(var i in ssse) { exports[i] = ssse[i] };
});
