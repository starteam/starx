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
  output.append('<style>');
  less_css.css_text(null, output);
  output.append('</style>');
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
  output.append('.starpedigree_workspace {display: block; position: relative;}.starpedigree_generation {display: block; position: absolute; height: 40px;}.starpedigree_generation_label {display: block; position: relative; top: 10px;}.starpedigree_individual {display: block; position: absolute; background-color: grey; z-index: 2;}.starpedigree_individual_genotype {position: absolute; left: 0px; top: 40px; width: 40px; text-align: center; color: black; padding: 0px; font-size: 8px; margin-top: 1px;}.starpedigree_individual_markers {position: absolute; left: 42px; top: 0px; color: black; background-color: lightgray; padding: 3px; font-size: 8px;}.starpedigree_sexsymbol_male {width: 40px; height: 40px; border-radius: 0px;}.starpedigree_sexsymbol_female {width: 40px; height: 40px; border-radius: 20px;}.starpedigree_parents_link {position: absolute; overflow: hidden;}.starpedigree_parents_link_horizontal {position: relative; height: 1px; top: 20px; left: 40px; right: 40px; background-color: black;}.starpedigree_parents_link_vertical_2 {position: relative; left: 20px;}.starpedigree_parents_link_vertical {position: relative; left: 50%; top: 20px; width: 1px; height: 60px; background-color: black;}.starpedigree_children_span {position: absolute;}.starpedigree_children_link_horizontal {position: relative; height: 1px; top: -20px; left: 20px; background-color: black;}.starpedigree_children_link {position: absolute;}.starpedigree_children_link_vertical {position: relative; top: -20px; left: 20px; width: 1px; height: 20px; background-color: black;}.starpedigree_individual_label_affected_1 {background-color: black; color: white; border: 1px solid black;}.starpedigree_individual_label_unaffected_1 {background-color: white; color: black; border: 1px solid black;}.starpedigree_genotype_dialog {width: 100%; max-width: 600px; height: 400px; background-color: whitesmoke; position: relative; top: 75px; left: 0px;}.starpedigree_genotype_dialog_title {display: block; position: absolute; width: 100%; height: 30px; color: white; font-size: 18px; background-color: #00ae63; z-index: 3; text-align: center;}.starpedigree_genotype_dialog_lhs {width: 290px; height: 400px; background-color: #f1f1f1; position: absolute; top: 30px; left: 300px; display: inline-block; z-index: 3;}.starpedigree_genotype_dialog_rhs {width: 290px; height: 400px; background-color: #f1f1f1; position: absolute; top: 30px; left: 010px; padding-left: 2px; display: inline-block; z-index: 3;}.starpedigree_genotype_prev {position: absolute; width: 10px; height: 400px; left: 0px; top: 30px; display: inline-block; background-color: #f1f1f1; z-index: 3;}.starpedigree_genotype_next {position: absolute; width: 10px; height: 400px; left: 588px; top: 30px; display: inline-block; background-color: #f1f1f1; z-index: 3;}.starpedigree_genotype_arrow {position: absolute; top: 160px; transform: scaleX(0.5); font-size: 40px; left: -6px;}.starpedigree_genotype {position: relative; display: block; width: 30px; height: 20px;}.starpedigree_genotype_1_Top {position: absolute; top: 0px; left: 0px; width: 10px; height: 10px; font-size: 8px;}.starpedigree_genotype_1_Bottom {position: absolute; top: 12px; left: 0px; width: 10px; height: 10px; font-size: 8px;}.starpedigree_genotype_2_Top {position: absolute; top: 0px; left: 20px; width: 10px; height: 10px; font-size: 8px;}.starpedigree_genotype_2_Bottom {position: absolute; top: 12px; left: 20px; width: 10px; height: 10px; font-size: 8px;}.starpedigree_genotype_Symbol {position: absolute; top: 8px; left: 12px; width: 10px; height: 10px; font-size: 8px;}.starpedigree_individual_not_annotated {position: relative; top: 40px; left: 5px; color: black; width: 30px; display: block; text-align: center;}.starpedigree_individual_name {position: relative; top: -20px; left: -40px; width: 38px; text-align: right; display: block; color: black;}.starpedigree_pa_informative_label_wrapper {position: relative; top: 200px;}.starpedigree_genotype_dialog_render {top: -80px; position: relative;}.starpedigree_genotype_dialog_close_x {float: right; border: 0px; border-radius: 9px; height: 18px; width: 18px; margin: 4px; font-weight: 900; font-size: 12px; font-family: arial; padding: 2px; background-color: white;}.starpedigree_individual_border {border: #00ae63 2px solid; position: absolute; top: -15px; left: -15px; width: 70px; height: 70px; background-color: transparent; display: none;}');
  return opt_sb ? '' : output.toString();
};
for(var i in less_css) { exports[i] = less_css[i] };
});
