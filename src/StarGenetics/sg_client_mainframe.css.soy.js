// This file was automatically generated from sg_client_mainframe.css.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var less_css= less_css ? less_css : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
less_css.css_text = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('.sg_workspace {background: white; top: 20px; left: 20px; min-height: 800px; min-width: 650px; resize: none; overflow-x: hidden; font-family: "Helvetica Neue Light", "HelveticaNeue-Light", "Helvetica Neue", Calibri, Helvetica, Arial;}.sg_exercise_title {display: inline-block; top: 0px; left: 0px; height: 50px; background: white; border: black 1px; font-family: "Helvetica Neue Light", "HelveticaNeue-Light", "Helvetica Neue", Calibri, Helvetica, Arial; font-size: 15pt;}.sg_logo {width: 200px; vertical-align: middle; position: relative; top: -3px;}.sg_strains_box {display: block; background: #ffffff; border: 1px solid #a0a4a8; margin-bottom: 8px;}.sg_strains_title {float: left; width: 100px; height: 100px; background-color: darkgreen; color: white; font-weight: 900; font-size: 15pt;}.sg_s_strain_box {display: inline-block; margin: 1px; padding: 0px;}.sg_strain_box_hover:hover {margin: 0px; border: 1px solid #add8e6; border-radius: 9px; cursor: copy;}.sg_strain_title {display: block; vertical-align: top; width: 100%; height: 25px; white-space: nowrap;}.sg_strain_title > img {float: right;}.sg_strain_visual {display: block; vertical-align: top; text-align: center; vertical-align: text-bottom; position: relative;}.sg_strain_visual_canvas {position: static; top: 0px; left: 0px;}.sg_strain_visual_canvas_sex {position: absolute; right: 5px; bottom: 0px; zoom: 75%; float: left; opacity: .65; z-index: 2;}.sg_experiment_box {display: block; vertical-align: top; margin-bottom: 8px; border: 1px solid #a0a4a8;}.sg_experiment_heading {display: block; vertical-align: top; width: 100%; background-color: yellow;}.sg_experiment_title_group {vertical-align: top; display: inline-block; background-color: orange;}.sg_experiment_title {display: block; background-color: orange;}.sg_experiment_commands {display: block; background-color: orangered;}.sg_experiment_parents_wrapper {position: relative; left: 110px;}.sg_experiment_parents {vertical-align: top; display: inline-block; text-align: center;}.sg_experiment_parent {vertical-align: top; display: inline-block; margin: 5px; min-width: 70px; height: 80px; text-align: center; position: relative; border: 2px dashed #808080; border-radius: 8px; padding: 2px;}.sg_s_experiment_parent_table {vertical-align: top; display: inline-block; margin: 5px; min-width: 70px; height: 80px; text-align: center; position: relative; border: 2px dashed #808080; border-radius: 8px; padding: 2px;}td.sg_s_experiment_parent_table_x .sg_s_experiment_parent_x {top: 0px;}.sg_experiment_parent_remove {position: absolute; top: 0px; right: 0px; -webkit-appearance: none; background-color: #ffffff; border: 0px; padding: 3px;}.sg_experiment_parent_x {display: inline-block; vertical-align: center; position: relative; top: 25px; font-size: 30pt;}td.sg_s_experiment_parent_table_x .sg_experiment_parent_x {top: 0px;}.sg_s_experiment_parent_x_floaty {float: left; position: relative; left: 110px; width: 0px;}.sg_s_experiment_parent_to_floaty {display: inline-block; vertical-align: center; font-size: 30pt; padding-right: 20px;}.sg_experiment_parents_can_mate {display: inline-block; max-width: 300px; margin-left: 10pt;}.sg_experiment_parents_can_mate_info {padding-top: 10pt; padding-bottom: 5pt;}.sg_s_col_head {border-right: solid black 1px;}.sg_s_row_head {border-bottom: solid black 1px;}.sg_title_box {font-size: 13.5pt; font-weight: 400; padding-left: 6px; text-transform: uppercase; padding-top: 6px;}.sg_add_strain_box {vertical-align: top; width: 70px; heigth: 80px;}.sg_s_expand {border: none; border-radius: 9px; float: right; margin-right: 10px; background: #e3e3e3;}.sg_s_expand_mating_site {margin-left: 150px; margin-bottom: 1em;}.sg_strain_expand_properties {padding-left: 10px; padding-right: 10px;}.sg_new_experiment_box {margin-bottom: 8px; border: 1px solid #a0a4a8; position: static;}.sg_s_clear_parents, .sg_s_new_experiment_mate {border: none; border-radius: 9px; background: #e3e3e3;}.sg_s_new_experiment_mate_large {background-image: linear-gradient(#51b151, #8aca8a) !important;}table {border-collapse: collapse;}.sg_s_row_head {border: 1px solid #a0a4a8; background: white;}.sg_strain_box {text-align: center; z-index: 99;}.sg_mini_experiment_box {display: inline-block; width: auto; position: relative; margin: 1px; border: 1px solid #f0f0f0; margin-right: 8px; padding: 5px;}.sg_mini_experiment_box:hover {border: 1px solid #add8e6; border-radius: 9px;}.sg_experiment_phenotype_detail_parent_m {text-align: center; padding-left: 5px; padding-right: 5px;}.sg_experiment_phenotype_detail_parent_f {text-align: center; padding-left: 5px; padding-right: 5px;}.sg_experiment_phenotype_detail_left {text-align: center; border-left: 1px solid #d0d4d8; padding-left: 5px; padding-right: 5px;}.sg_experiment_phenotype_detail_right {text-align: center; border-right: 1px solid #d0d4d8; padding-left: 5px; padding-right: 5px;}.sg_experiment_phenotype_detail_double {padding-left: 15px !important; text-align: center !important;}.sg_experiment_phenotype_detail_header {width: 5.5em;}.sg_experiment_p_count {text-align: center;}.sg_strains_p_visual {text-align: center !important;}.sg_experiment_p_visual {text-align: center !important;}.sg_experiment_phenotype_detail_align_top {vertical-align: top !important;}.sg_slider {width: 100%;}.sg_slider_thumb {width: 100%; height: 1em; background-color: #e3e3e3; text-align: center;}.sg_slider_table {position: relative; left: 0px; top: 0px;}.sg_experiment_holder {zoom: 50%; -moz-transform-origin: 0 0; -moz-transform: scale(0.5); position: relative; left: 0px; top: 0px; white-space: nowrap;}.sg_experiment_box_floaty {position: absolute; width: 100%; height: 100%; float: right; background: #4D4C49; opacity: .01; z-index: 99;}.sg_experiment_selected {border: 1px solid black;}.sg_experiment_selected:hover {border: 1px solid black;}.sg_experiment_history {border: 1px solid #a0a4a8;}.sg_slider_widget_wrapper {overflow-x: scroll; resize: none; padding: 8px; width: 100%;}.sg_strain_add_strain {border: 2px dashed #808080; border-radius: 8px; font-size: 50px; padding: 10px; padding-bottom: 20px;}::-webkit-scrollbar {-webkit-appearance: none; width: 7px;}::-webkit-scrollbar-thumb {border-radius: 4px; background-color: rgba(192, 192, 192, 0.3); -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);}.sg_plus_floaty {float: right; position: absolute; top: 0px; right: 0px; background-color: #add8e6; padding: 1px; font-size: 12pt;}.sg_s_rename {border-bottom: 2px dotted #add8e6; cursor: pointer;}.sg_s_discard {float: right; margin-right: 6px; cursor: pointer;}.sg_slider_widget_wrapper table tbody tr td {text-align: center !important;}.sg_new_experiment_mate_count {width: 5em !important; margin-bottom: 5px; margin-right: 5px;}.sg_workapace_button {margin-left: 5px !important; margin-right: 5px !important; margin-bottom: 5px !important;}table.sg_slider_table tbody tr th {text-align: center !important;}div.sg_mini_experiment_box table.sg_slider_table {margin: 0px !important;}div.sg_mini_experiment_box table.sg_slider_table tbody tr th {max-height: 20px;}.sg_expand_females {margin-left: 5px !important; margin-right: 5px !important;}.sg_expand_males {margin-left: 5px !important; margin-right: 5px !important;}.sg_s_strain_remove {float: right;}');
  return opt_sb ? '' : output.toString();
};
for(var i in less_css) { exports[i] = less_css[i] };
});
