// This file was automatically generated from widget_template.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var widget_template= widget_template ? widget_template : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.wrapper = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_workspace\' id=\'', soy.$$escapeHtml(opt_data.config.element_id + '_workspace'), '\'>Workspace</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_generations = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var generationList7 = opt_data.options.generations;
  var generationListLen7 = generationList7.length;
  for (var generationIndex7 = 0; generationIndex7 < generationListLen7; generationIndex7++) {
    var generationData7 = generationList7[generationIndex7];
    output.append('<div class=\'starpedigree_generation\' style=\'left:0px;top:', soy.$$escapeHtml(opt_data.options.cell_height * generationIndex7), 'px\'><span class=\'starpedigree_generation_label\'>', soy.$$escapeHtml(generationData7), '</span></div>');
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_individual_not_annotated = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'starpedigree_individual_not_annotated\' >');
  var mList16 = opt_data.individual.genotype_markers;
  var mListLen16 = mList16.length;
  for (var mIndex16 = 0; mIndex16 < mListLen16; mIndex16++) {
    var mData16 = mList16[mIndex16];
    output.append(soy.$$escapeHtml(mData16.id), (! (mIndex16 == mListLen16 - 1)) ? '/' : '');
  }
  output.append('</span>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_individuals_name = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'starpedigree_individual_name\'>', soy.$$escapeHtml(opt_data.individual.name), '</span>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_below_individual = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.individual.annotator.is_annotated) {
    output.append('<span class=\'starpedigree_individual_label\' >', soy.$$escapeHtml(opt_data.individual.id), ' An</span>');
  } else {
    widget_template.render_individual_not_annotated(opt_data, output);
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_individual = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_individual starpedigree_sexsymbol_', soy.$$escapeHtml(opt_data.individual.sex.kind), ' ', (opt_data.individual.affected) ? 'starpedigree_individual_label_affected_1' : 'starpedigree_individual_label_unaffected_1', '\' style=\'left:', soy.$$escapeHtml(opt_data.individual.location.left), 'px;top:', soy.$$escapeHtml(opt_data.individual.location.top), 'px\' data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\' data-kind=\'starpedigree_individual\' ><div data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\' class=\'starpedigree_individual_border\'>&nbsp; </div>');
  widget_template.render_below_individual(opt_data, output);
  widget_template.render_individuals_name(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_individuals = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var individualList60 = opt_data.individuals;
  var individualListLen60 = individualList60.length;
  for (var individualIndex60 = 0; individualIndex60 < individualListLen60; individualIndex60++) {
    var individualData60 = individualList60[individualIndex60];
    widget_template.render_individual({individual: individualData60}, output);
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_relationships = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var relationshipList65 = opt_data.relationships;
  var relationshipListLen65 = relationshipList65.length;
  for (var relationshipIndex65 = 0; relationshipIndex65 < relationshipListLen65; relationshipIndex65++) {
    var relationshipData65 = relationshipList65[relationshipIndex65];
    widget_template.render_relationship({relationship: relationshipData65, options: opt_data.options, options: opt_data.options}, output);
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_relationship = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  widget_template.render_parental_link({from: opt_data.relationship.parents[0], to: opt_data.relationship.parents[1], options: opt_data.options}, output);
  widget_template.render_children_links({from: opt_data.relationship.children_column_span[0], to: opt_data.relationship.children_column_span[1], children: opt_data.relationship.children, options: opt_data.options}, output);
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_parental_link = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_parents_link\' style=\'top:', soy.$$escapeHtml(opt_data.from.location.row * opt_data.options.cell_width), 'px;left:', soy.$$escapeHtml(opt_data.from.location.column * opt_data.options.cell_height), 'px;width:', soy.$$escapeHtml((opt_data.to.location.column - opt_data.from.location.column) * opt_data.options.cell_height), 'px;height:', soy.$$escapeHtml(opt_data.options.cell_height), 'px\'><div class=\'starpedigree_parents_link_horizontal\'></div><div class=\'starpedigree_parents_link_vertical_2\'><div class=\'starpedigree_parents_link_vertical\'></div></div></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_children_links = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_children_span\' style=\'top:', soy.$$escapeHtml(opt_data.from.row * opt_data.options.cell_width), 'px;left:', soy.$$escapeHtml(opt_data.from.column * opt_data.options.cell_height), 'px;width:', soy.$$escapeHtml((opt_data.to.column - opt_data.from.column) * opt_data.options.cell_height), 'px;height:', soy.$$escapeHtml(opt_data.options.cell_height), 'px\'><div class=\'starpedigree_children_link_horizontal\'></div></div>');
  var childList101 = opt_data.children;
  var childListLen101 = childList101.length;
  for (var childIndex101 = 0; childIndex101 < childListLen101; childIndex101++) {
    var childData101 = childList101[childIndex101];
    output.append('<div class=\'starpedigree_children_link\' style=\'top:', soy.$$escapeHtml(childData101.location.row * opt_data.options.cell_width), 'px;left:', soy.$$escapeHtml(childData101.location.column * opt_data.options.cell_height), 'px;width:', soy.$$escapeHtml(opt_data.options.cell_width), 'px;height:', soy.$$escapeHtml(opt_data.options.cell_height), 'px\'><div class=\'starpedigree_children_link_vertical\'></div></div>');
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_individual_in_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_individual starpedigree_sexsymbol_', soy.$$escapeHtml(opt_data.individual.sex.kind), ' ', (opt_data.individual.affected) ? 'starpedigree_individual_label_affected_1' : 'starpedigree_individual_label_unaffected_1', '\' style=\'left:', soy.$$escapeHtml(opt_data.options.cell_width * opt_data.column + opt_data.options.cell_width), 'px;top:', soy.$$escapeHtml(opt_data.options.cell_height * opt_data.row), 'px\' data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\' data-kind=\'starpedigree_individual\' ><div data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\' class=\'starpedigree_individual_border\'>&nbsp; </div>');
  widget_template.render_below_individual(opt_data, output);
  widget_template.render_individuals_name(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.genotype_dialog_lhs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_genotype_dialog_lhs\'><span class=\'starpedigree_genotype_dialog_render\'>');
  widget_template.render_individual_in_dialog({individual: opt_data.individual, options: opt_data.options, column: 1, row: 1.75}, output);
  var parentList142 = opt_data.individual.parents;
  var parentListLen142 = parentList142.length;
  for (var parentIndex142 = 0; parentIndex142 < parentListLen142; parentIndex142++) {
    var parentData142 = parentList142[parentIndex142];
    widget_template.render_individual_in_dialog({individual: parentData142, options: opt_data.options, column: 0.5 + parentIndex142, row: 1}, output);
  }
  output.append((opt_data.individual.parents.length > 0) ? '<div class=\'starpedigree_parents_link\' style=\'top:' + soy.$$escapeHtml(1 * opt_data.options.cell_width) + 'px;left:' + soy.$$escapeHtml(1.5 * opt_data.options.cell_height) + 'px;width:' + soy.$$escapeHtml(1 * opt_data.options.cell_height) + 'px;height:' + soy.$$escapeHtml(opt_data.options.cell_height) + 'px\'><div class=\'starpedigree_parents_link_horizontal\'></div><div class=\'starpedigree_parents_link_vertical_2\'><div class=\'starpedigree_parents_link_vertical\'></div></div></div>' : '', '</span><div class=\'starpedigree_pa_informative_label_wrapper\'><div class=\'starpedigree_pa_informative_label starpedigree_genotype_dialog_bold\'>Informative:</div><span class=\'starpedigree_genotype_phase_indent\'><div class=\'starpedigree_pa_informative_question\'>Does this individual represents the result of an informative meiosis?</div><div class=\'starpedigree_pa_informative_select\'><input class=\'starpedigree_flat_radio\' type="radio" value="yes" kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id="starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_yes"><label for="starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_yes">yes</label><input class=\'starpedigree_flat_radio\' type="radio" value="no" kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id="starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_no"><label for="starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_no">no</label></div></span></div><button data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class=\'starpedigree_genotype_dialog_check_genotype_and_phase\' data-text="Check phase">Check</button><!--        <button data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class=\'starpedigree_genotype_dialog_close\' data-text="Close">Close</button> --></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.genotype_dialog_select = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<label for=\'starpedigree_genotype_dialog_select_', soy.$$escapeHtml(opt_data.individual.id), '_', soy.$$escapeHtml(opt_data.index), '\' class=\'starpedigree_genotype_dialog_select_label\'><select id=\'starpedigree_genotype_dialog_select_', soy.$$escapeHtml(opt_data.individual.id), '_', soy.$$escapeHtml(opt_data.index), '\' data-index="', soy.$$escapeHtml(opt_data.index), '" data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class="starpedigree_genotype_dialog_select">');
  var markerList195 = opt_data.individual.genotype_markers;
  var markerListLen195 = markerList195.length;
  for (var markerIndex195 = 0; markerIndex195 < markerListLen195; markerIndex195++) {
    var markerData195 = markerList195[markerIndex195];
    output.append('<option value="', soy.$$escapeHtml(markerData195.id), '" ', (opt_data.individual.genotype[opt_data.index] == markerData195.id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(markerData195.id), '</option>');
  }
  output.append('<select></label>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.genotype_dialog_select_disease = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<label for=\'starpedigree_genotype_dialog_select_', soy.$$escapeHtml(opt_data.individual.id), '_', soy.$$escapeHtml(opt_data.index), '\' class=\'starpedigree_genotype_dialog_select_label\'><select id=\'starpedigree_genotype_dialog_select_', soy.$$escapeHtml(opt_data.individual.id), '_', soy.$$escapeHtml(opt_data.index), '\' data-index="', soy.$$escapeHtml(opt_data.index), '" data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class="starpedigree_genotype_dialog_select">');
  var markerList221 = opt_data.options.disease_markers;
  var markerListLen221 = markerList221.length;
  for (var markerIndex221 = 0; markerIndex221 < markerListLen221; markerIndex221++) {
    var markerData221 = markerList221[markerIndex221];
    output.append('<option value="', soy.$$escapeHtml(markerData221), '" ', (opt_data.individual.genotype[opt_data.index] == markerData221) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(markerData221), '</option>');
  }
  output.append('<select></label>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.genotype_dialog_select_individual = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<label for=\'genotype_dialog_select_individual_', soy.$$escapeHtml(opt_data.individual.id), '\' class=\'genotype_dialog_select_individual_label\'><select id=\'genotype_dialog_select_individual_', soy.$$escapeHtml(opt_data.individual.id), '\' data-current="', soy.$$escapeHtml(opt_data.individual.id), '" class="genotype_dialog_select_individual">');
  var iList241 = opt_data.individuals;
  var iListLen241 = iList241.length;
  for (var iIndex241 = 0; iIndex241 < iListLen241; iIndex241++) {
    var iData241 = iList241[iIndex241];
    output.append('<option value="', soy.$$escapeHtml(iData241.id), '" ', (iData241.id == opt_data.individual.id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(iData241.id), '</option>');
  }
  output.append('<select></label>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.genotype_dialog_rhs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_genotype_dialog_rhs\'><table><tr><td>Individual</td><td>');
  widget_template.genotype_dialog_select_individual(opt_data, output);
  output.append('</td></tr><tr><td><span class=\'starpedigree_genotype_dialog_bold\'>Marker:</span></td><td>', soy.$$escapeHtml(opt_data.options.selected_marker_name), ', alleles detected:&nbsp;');
  var mList262 = opt_data.individual.genotype_markers;
  var mListLen262 = mList262.length;
  for (var mIndex262 = 0; mIndex262 < mListLen262; mIndex262++) {
    var mData262 = mList262[mIndex262];
    output.append(soy.$$escapeHtml(mData262.id), (! (mIndex262 == mListLen262 - 1)) ? '/' : '');
  }
  output.append('</td></tr></table><span class=\'starpedigree_genotype_phase_indent\'><table><tr><th>Genotype</th><th>Marker</th><th>Disease</th><tr><td>Allele 1</td><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 0}, output);
  output.append('</td><td>');
  widget_template.genotype_dialog_select_disease({individual: opt_data.individual, options: opt_data.options, index: 1}, output);
  output.append('</td></tr><tr><td>Alleles 2</td><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 2}, output);
  output.append('</td><td>');
  widget_template.genotype_dialog_select_disease({individual: opt_data.individual, options: opt_data.options, index: 3}, output);
  output.append('</td></tr></table></span><div class=\'starpedigree_genotype_phase_select_label starpedigree_genotype_dialog_bold\'>Phase:</div><span class=\'starpedigree_genotype_phase_indent\'><span class="starpedigree_genotype_phase_select_label_info">Arrangement of alleles on chromosome:</span><br><span class=\'starpedigree_genotype_phase_select\'><input class=\'starpedigree_flat_radio\' type=\'radio\' value=\'known\' kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_known\'><label for=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_known\'>known</label></input><input class=\'starpedigree_flat_radio\' type=\'radio\' value=\'unknown\' kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_unknown\'><label for=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_unknown\'>unknown</label></input></span><br><div class=\'starpedigree_genotype_phase_options_label starpedigree_genotype_dialog_bold starpedigree_genotype_pad_top\'>Possible Phases</div><div class=\'starpedigree_genotype_phase_options_label\'>Phase 1 or Phase 2 HERE GOES VISUAL</div></span><br>');
  widget_template.render_genotype(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.render_genotype = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'starpedigree_genotype\'><span class=\'starpedigree_genotype_1_Top\'>1T</span><span class=\'starpedigree_genotype_1_Bottom\'>1B</span><span class=\'starpedigree_genotype_2_Top\'>2T</span><span class=\'starpedigree_genotype_2_Bottom\'>2B</span><span class=\'starpedigree_genotype_Symbol\'>*</span></span>', soy.$$escapeHtml(opt_data.individual.id));
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.genotype_dialog_prev = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'starpedigree_genotype_prev\'><span class=\'starpedigree_genotype_arrow\'>&lt;</span></span>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.genotype_dialog_next = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'starpedigree_genotype_next\'><span class=\'starpedigree_genotype_arrow\'>&gt;</span></span>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget_template.genotype_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_genotype_dialog\' title=\'Genotype editor for ', soy.$$escapeHtml(opt_data.individual.id), '\'><span class=\'starpedigree_genotype_dialog_title\'><span class=\'starpedigree_genotype_dialog_title_text\'>Pedigree Annotator</span><span class=\'starpedigree_genotype_dialog_title_triangle\'></span><span class=\'starpedigree_genotype_dialog_title_line\'></span><button data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class=\'starpedigree_genotype_dialog_close_x\' data-text="Close">X</button></span>');
  widget_template.genotype_dialog_prev(opt_data, output);
  widget_template.genotype_dialog_lhs(opt_data, output);
  widget_template.genotype_dialog_rhs(opt_data, output);
  widget_template.genotype_dialog_next(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};
for(var i in widget_template) { exports[i] = widget_template[i] };
});
