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
  output.append('<div class=\'starpedigree_individual starpedigree_sexsymbol_', soy.$$escapeHtml(opt_data.individual.sex.kind), ' ', (opt_data.individual.affected) ? 'starpedigree_individual_label_affected_1' : 'starpedigree_individual_label_unaffected_1', '\' style=\'left:', soy.$$escapeHtml(opt_data.individual.location.left), 'px;top:', soy.$$escapeHtml(opt_data.individual.location.top), 'px\' data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\' data-kind=\'starpedigree_individual\' >');
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
  var individualList58 = opt_data.individuals;
  var individualListLen58 = individualList58.length;
  for (var individualIndex58 = 0; individualIndex58 < individualListLen58; individualIndex58++) {
    var individualData58 = individualList58[individualIndex58];
    widget_template.render_individual({individual: individualData58}, output);
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
  var relationshipList63 = opt_data.relationships;
  var relationshipListLen63 = relationshipList63.length;
  for (var relationshipIndex63 = 0; relationshipIndex63 < relationshipListLen63; relationshipIndex63++) {
    var relationshipData63 = relationshipList63[relationshipIndex63];
    widget_template.render_relationship({relationship: relationshipData63, options: opt_data.options, options: opt_data.options}, output);
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
  var childList99 = opt_data.children;
  var childListLen99 = childList99.length;
  for (var childIndex99 = 0; childIndex99 < childListLen99; childIndex99++) {
    var childData99 = childList99[childIndex99];
    output.append('<div class=\'starpedigree_children_link\' style=\'top:', soy.$$escapeHtml(childData99.location.row * opt_data.options.cell_width), 'px;left:', soy.$$escapeHtml(childData99.location.column * opt_data.options.cell_height), 'px;width:', soy.$$escapeHtml(opt_data.options.cell_width), 'px;height:', soy.$$escapeHtml(opt_data.options.cell_height), 'px\'><div class=\'starpedigree_children_link_vertical\'></div></div>');
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
  output.append('<div class=\'starpedigree_individual starpedigree_sexsymbol_', soy.$$escapeHtml(opt_data.individual.sex.kind), ' ', (opt_data.individual.affected) ? 'starpedigree_individual_label_affected_1' : 'starpedigree_individual_label_unaffected_1', '\' style=\'left:', soy.$$escapeHtml(opt_data.options.cell_width * opt_data.column), 'px;top:', soy.$$escapeHtml(opt_data.options.cell_height * opt_data.row), 'px\' data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\' data-kind=\'starpedigree_individual\' ><span class=\'starpedigree_individual_label\' data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\'>', soy.$$escapeHtml(opt_data.individual.id), '</span><span class=\'starpedigree_individual_markers\' data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\'>');
  var markerList132 = opt_data.individual.markers;
  var markerListLen132 = markerList132.length;
  for (var markerIndex132 = 0; markerIndex132 < markerListLen132; markerIndex132++) {
    var markerData132 = markerList132[markerIndex132];
    output.append(soy.$$escapeHtml(markerData132.id));
  }
  output.append('</span><span class=\'starpedigree_individual_genotype\' data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\'>', soy.$$escapeHtml(opt_data.individual.id), '<br>');
  var markerList140 = opt_data.individual.markers;
  var markerListLen140 = markerList140.length;
  for (var markerIndex140 = 0; markerIndex140 < markerListLen140; markerIndex140++) {
    var markerData140 = markerList140[markerIndex140];
    output.append(soy.$$escapeHtml(markerData140.id));
  }
  output.append('</span></div>');
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
  var parentList151 = opt_data.individual.parents;
  var parentListLen151 = parentList151.length;
  for (var parentIndex151 = 0; parentIndex151 < parentListLen151; parentIndex151++) {
    var parentData151 = parentList151[parentIndex151];
    widget_template.render_individual_in_dialog({individual: parentData151, options: opt_data.options, column: 0.5 + parentIndex151, row: 1}, output);
  }
  output.append((opt_data.individual.parents.length > 0) ? '<div class=\'starpedigree_parents_link\' style=\'top:' + soy.$$escapeHtml(1 * opt_data.options.cell_width) + 'px;left:' + soy.$$escapeHtml(0.5 * opt_data.options.cell_height) + 'px;width:' + soy.$$escapeHtml(1 * opt_data.options.cell_height) + 'px;height:' + soy.$$escapeHtml(opt_data.options.cell_height) + 'px\'><div class=\'starpedigree_parents_link_horizontal\'></div><div class=\'starpedigree_parents_link_vertical_2\'><div class=\'starpedigree_parents_link_vertical\'></div></div></div>' : '', '</span><div class=\'starpedigree_pa_informative_label_wrapper\'><div class=\'starpedigree_pa_informative_label\'>Informative:</div><div class=\'starpedigree_pa_informative_question\'>Does this individual represents the result of an informative meiosis?</div><div class=\'starpedigree_pa_informative_select\'><input type="radio" value="yes" kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id="starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_yes"><label for="starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_yes">Yes</label><input type="radio" value="no" kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id="starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_no"><label for="starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_no">No</label></div></div></div>');
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
  output.append('<select data-index="', soy.$$escapeHtml(opt_data.index), '" data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class="starpedigree_genotype_dialog_select">');
  var markerList192 = opt_data.individual.markers;
  var markerListLen192 = markerList192.length;
  for (var markerIndex192 = 0; markerIndex192 < markerListLen192; markerIndex192++) {
    var markerData192 = markerList192[markerIndex192];
    output.append('<option value="', soy.$$escapeHtml(markerData192.id), '" ', (opt_data.individual.genotype[opt_data.index] == markerData192.id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(markerData192.id), '</option>');
  }
  output.append('<select>');
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
  output.append('<div class=\'starpedigree_genotype_dialog_rhs\'><table><tr><td>Individual</td><td>', soy.$$escapeHtml(opt_data.individual.name), '</td></tr><tr><td>Marker</td><td>', soy.$$escapeHtml(opt_data.options.selected_marker_name), '</td></tr></table><table><tr><th>Genotype</th><th>Marker</th><th>Disease</th><tr><td>Allele 1</td><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 0}, output);
  output.append('</td><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 1}, output);
  output.append('</td></tr><tr><td>Alleles 2</td><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 2}, output);
  output.append('</td><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 3}, output);
  output.append('</td></tr></table><div class=\'starpedigree_genotype_phase_select_label\'>Phase</div><span class="starpedigree_genotype_phase_select_label_info">Arrangement of alleles on chromosome</span><br><span class=\'starpedigree_genotype_phase_select\'><input type=\'radio\' value=\'known\' kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_known\'><label for=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_known\'>Known</label></input><input type=\'radio\' value=\'unknown\' kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_unknown\'><label for=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_unknown\'>Unknown</label></input></span><div class=\'starpedigree_genotype_phase_options_label\'>Possible Phases</div><div class=\'starpedigree_genotype_phase_options_label\'>Phase 1 or Phase 2 HERE GOES VISUAL</div><br>');
  widget_template.render_genotype(opt_data, output);
  output.append('<button data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class=\'starpedigree_genotype_dialog_check_genotype_and_phase\' data-text="Check phase">Check & Save</button><button data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class=\'starpedigree_genotype_dialog_close\' data-text="Close">Close</button></div>');
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
widget_template.genotype_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_genotype_dialog\' title=\'Genotype editor for ', soy.$$escapeHtml(opt_data.individual.id), '\'><span class=\'starpedigree_genotype_dialog_title\'>Pedigree annotator</span>');
  widget_template.genotype_dialog_lhs(opt_data, output);
  widget_template.genotype_dialog_rhs(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};
for(var i in widget_template) { exports[i] = widget_template[i] };
});
