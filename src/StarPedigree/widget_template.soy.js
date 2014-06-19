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
widget_template.render_individuals = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var individualList15 = opt_data.individuals;
  var individualListLen15 = individualList15.length;
  for (var individualIndex15 = 0; individualIndex15 < individualListLen15; individualIndex15++) {
    var individualData15 = individualList15[individualIndex15];
    output.append('<div class=\'starpedigree_individual starpedigree_sexsymbol_', soy.$$escapeHtml(individualData15.sex.kind), ' ', (individualData15.affected) ? 'starpedigree_individual_label_affected_1' : 'starpedigree_individual_label_unaffected_1', '\' style=\'left:', soy.$$escapeHtml(opt_data.options.cell_width * individualData15.location.column), 'px;top:', soy.$$escapeHtml(opt_data.options.cell_height * individualData15.location.row), 'px\'><span class=\'starpedigree_individual_label\' >', soy.$$escapeHtml(individualData15.id), '</span><span class=\'starpedigree_individual_markers\'>');
    var markerList31 = individualData15.markers;
    var markerListLen31 = markerList31.length;
    for (var markerIndex31 = 0; markerIndex31 < markerListLen31; markerIndex31++) {
      var markerData31 = markerList31[markerIndex31];
      output.append(soy.$$escapeHtml(markerData31.id));
    }
    output.append('</span></div>');
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
  var relationshipList37 = opt_data.relationships;
  var relationshipListLen37 = relationshipList37.length;
  for (var relationshipIndex37 = 0; relationshipIndex37 < relationshipListLen37; relationshipIndex37++) {
    var relationshipData37 = relationshipList37[relationshipIndex37];
    widget_template.render_relationship({relationship: relationshipData37, options: opt_data.options, options: opt_data.options}, output);
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
  var childList73 = opt_data.children;
  var childListLen73 = childList73.length;
  for (var childIndex73 = 0; childIndex73 < childListLen73; childIndex73++) {
    var childData73 = childList73[childIndex73];
    output.append('<div class=\'starpedigree_children_link\' style=\'top:', soy.$$escapeHtml(childData73.location.row * opt_data.options.cell_width), 'px;left:', soy.$$escapeHtml(childData73.location.column * opt_data.options.cell_height), 'px;width:', soy.$$escapeHtml(opt_data.options.cell_width), 'px;height:', soy.$$escapeHtml(opt_data.options.cell_height), 'px\'><div class=\'starpedigree_children_link_vertical\'></div></div>');
  }
  return opt_sb ? '' : output.toString();
};
for(var i in widget_template) { exports[i] = widget_template[i] };
});
