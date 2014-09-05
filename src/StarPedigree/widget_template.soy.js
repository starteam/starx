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
widget_template.render_individual = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'starpedigree_individual starpedigree_sexsymbol_', soy.$$escapeHtml(opt_data.individual.sex.kind), ' ', (opt_data.individual.affected) ? 'starpedigree_individual_label_affected_1' : 'starpedigree_individual_label_unaffected_1', '\' style=\'left:', soy.$$escapeHtml(opt_data.options.cell_width * opt_data.individual.location.column), 'px;top:', soy.$$escapeHtml(opt_data.options.cell_height * opt_data.individual.location.row), 'px\' data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\' data-kind=\'starpedigree_individual\' ><span class=\'starpedigree_individual_label\' >', soy.$$escapeHtml(opt_data.individual.id), '</span><span class=\'starpedigree_individual_markers\'>');
  var markerList32 = opt_data.individual.markers;
  var markerListLen32 = markerList32.length;
  for (var markerIndex32 = 0; markerIndex32 < markerListLen32; markerIndex32++) {
    var markerData32 = markerList32[markerIndex32];
    output.append(soy.$$escapeHtml(markerData32.id));
  }
  output.append('</span><span class=\'starpedigree_individual_genotype\'>', soy.$$escapeHtml(opt_data.individual.id), '<br>');
  var markerList38 = opt_data.individual.markers;
  var markerListLen38 = markerList38.length;
  for (var markerIndex38 = 0; markerIndex38 < markerListLen38; markerIndex38++) {
    var markerData38 = markerList38[markerIndex38];
    output.append(soy.$$escapeHtml(markerData38.id));
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
widget_template.render_individuals = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var individualList43 = opt_data.individuals;
  var individualListLen43 = individualList43.length;
  for (var individualIndex43 = 0; individualIndex43 < individualListLen43; individualIndex43++) {
    var individualData43 = individualList43[individualIndex43];
    widget_template.render_individual({individual: individualData43, options: opt_data.options}, output);
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
  var relationshipList49 = opt_data.relationships;
  var relationshipListLen49 = relationshipList49.length;
  for (var relationshipIndex49 = 0; relationshipIndex49 < relationshipListLen49; relationshipIndex49++) {
    var relationshipData49 = relationshipList49[relationshipIndex49];
    widget_template.render_relationship({relationship: relationshipData49, options: opt_data.options, options: opt_data.options}, output);
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
  var childList85 = opt_data.children;
  var childListLen85 = childList85.length;
  for (var childIndex85 = 0; childIndex85 < childListLen85; childIndex85++) {
    var childData85 = childList85[childIndex85];
    output.append('<div class=\'starpedigree_children_link\' style=\'top:', soy.$$escapeHtml(childData85.location.row * opt_data.options.cell_width), 'px;left:', soy.$$escapeHtml(childData85.location.column * opt_data.options.cell_height), 'px;width:', soy.$$escapeHtml(opt_data.options.cell_width), 'px;height:', soy.$$escapeHtml(opt_data.options.cell_height), 'px\'><div class=\'starpedigree_children_link_vertical\'></div></div>');
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
  var markerList118 = opt_data.individual.markers;
  var markerListLen118 = markerList118.length;
  for (var markerIndex118 = 0; markerIndex118 < markerListLen118; markerIndex118++) {
    var markerData118 = markerList118[markerIndex118];
    output.append(soy.$$escapeHtml(markerData118.id));
  }
  output.append('</span><span class=\'starpedigree_individual_genotype\' data-id=\'', soy.$$escapeHtml(opt_data.individual.id), '\'>', soy.$$escapeHtml(opt_data.individual.id), '<br>');
  var markerList126 = opt_data.individual.markers;
  var markerListLen126 = markerList126.length;
  for (var markerIndex126 = 0; markerIndex126 < markerListLen126; markerIndex126++) {
    var markerData126 = markerList126[markerIndex126];
    output.append(soy.$$escapeHtml(markerData126.id));
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
  output.append('<div class=\'starpedigree_genotype_dialog_lhs\'>');
  widget_template.render_individual_in_dialog({individual: opt_data.individual, options: opt_data.options, column: 1, row: 1.75}, output);
  var parentList137 = opt_data.individual.parents;
  var parentListLen137 = parentList137.length;
  for (var parentIndex137 = 0; parentIndex137 < parentListLen137; parentIndex137++) {
    var parentData137 = parentList137[parentIndex137];
    widget_template.render_individual_in_dialog({individual: parentData137, options: opt_data.options, column: 0.5 + parentIndex137, row: 1}, output);
  }
  output.append((opt_data.individual.parents.length > 0) ? '<div class=\'starpedigree_parents_link\' style=\'top:' + soy.$$escapeHtml(1 * opt_data.options.cell_width) + 'px;left:' + soy.$$escapeHtml(0.5 * opt_data.options.cell_height) + 'px;width:' + soy.$$escapeHtml(1 * opt_data.options.cell_height) + 'px;height:' + soy.$$escapeHtml(opt_data.options.cell_height) + 'px\'><div class=\'starpedigree_parents_link_horizontal\'></div><div class=\'starpedigree_parents_link_vertical_2\'><div class=\'starpedigree_parents_link_vertical\'></div></div></div>' : '', '</div>');
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
  var markerList162 = opt_data.individual.markers;
  var markerListLen162 = markerList162.length;
  for (var markerIndex162 = 0; markerIndex162 < markerListLen162; markerIndex162++) {
    var markerData162 = markerList162[markerIndex162];
    output.append('<option value="', soy.$$escapeHtml(markerData162.id), '" ', (opt_data.individual.genotype[opt_data.index] == markerData162.id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(markerData162.id), '</option>');
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
  output.append('<div class=\'starpedigree_genotype_dialog_rhs\'><table><tr><th>Gene 1</th><th>Gene 2</th><tr><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 0}, output);
  output.append('</td><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 1}, output);
  output.append('</td></tr><tr><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 2}, output);
  output.append('</td><td>');
  widget_template.genotype_dialog_select({individual: opt_data.individual, index: 3}, output);
  output.append('</td></tr></table><br><span class=\'starpedigree_genotype_phase_select\'><input type=\'radio\' value=\'unknown\' kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_unknown\'><label for=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_unknown\'>Unknown</label></input><input type=\'radio\' value=\'inphase\' kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_inphase\'><label for=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_inphase\'>In phase</label></input><input type=\'radio\' value=\'outofphase\' kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_outofphase\'><label for=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_outofphase\'>Out of phase</label></input><input type=\'radio\' value=\'unlinked\' kind-id="', soy.$$escapeHtml(opt_data.individual.id), '" name="radio_starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '" id=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_unlinked\'><label for=\'starpedigree_genotype_phase_select_', soy.$$escapeHtml(opt_data.individual.id), '_unlinked\'>Unlinked</label></input></span><br>');
  widget_template.render_genotype(opt_data, output);
  output.append(soy.$$escapeHtml(opt_data.options), '<button data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class=\'starpedigree_genotype_dialog_check_genotype_and_phase\' data-text="Check phase">Check & Save</button><button data-id="', soy.$$escapeHtml(opt_data.individual.id), '" class=\'starpedigree_genotype_dialog_close\' data-text="Close">Close</button></div>');
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
  output.append('<div class=\'starpedigree_genotype_dialog\' title=\'Genotype editor for ', soy.$$escapeHtml(opt_data.individual.id), '\'>');
  widget_template.genotype_dialog_lhs(opt_data, output);
  widget_template.genotype_dialog_rhs(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};
for(var i in widget_template) { exports[i] = widget_template[i] };
});
