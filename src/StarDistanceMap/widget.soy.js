// This file was automatically generated from widget.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var widget= widget ? widget : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget.widget = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'swg_widget\' style=\'position: relative;left:0px;top:0px;border-radius:8px;width:820px; height:', soy.$$escapeHtml(opt_data.state.height), 'px;background-color:white\'>');
  widget.gene_groups({gene_groups: opt_data.state.gene_groups}, output);
  widget.genes({genes: opt_data.state.genes}, output);
  widget.chromosomes({chromosomes: opt_data.state.chromosomes, state: opt_data.state}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget.gene_groups = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var groupList15 = opt_data.gene_groups;
  var groupListLen15 = groupList15.length;
  for (var groupIndex15 = 0; groupIndex15 < groupListLen15; groupIndex15++) {
    var groupData15 = groupList15[groupIndex15];
    output.append('<div class="sgw_group_title" style=\'top:', soy.$$escapeHtml(groupData15.top), 'px;left:', soy.$$escapeHtml(groupData15.left), 'px\'>', soy.$$escapeHtml(groupData15.title), '</div>');
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget.genes = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sgw_help_genes sgw_help">Genes</div><div class="sgw_help_text sgw_help">&#8659; Drag genes down &#8659;</div>');
  var geneList26 = opt_data.genes;
  var geneListLen26 = geneList26.length;
  for (var geneIndex26 = 0; geneIndex26 < geneListLen26; geneIndex26++) {
    var geneData26 = geneList26[geneIndex26];
    widget.gene({gene: geneData26}, output);
    widget.gene_dropper({gene: geneData26}, output);
    widget.gene_distance_dropper({gene: geneData26}, output);
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget.gene = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sgw_gene\' data-id=\'', soy.$$escapeHtml(opt_data.gene.id), '\' style=\'top:', soy.$$escapeHtml(opt_data.gene.top), 'px; left:', soy.$$escapeHtml(opt_data.gene.left), 'px;border-color:', soy.$$escapeHtml(opt_data.gene.color), '\'>', soy.$$escapeHtml(opt_data.gene.name), '</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget.gene_dropper = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sgw_dropper\' data-id=\'', soy.$$escapeHtml(opt_data.gene.id), '\' style=\'top:', soy.$$escapeHtml(opt_data.gene.dropper_top), 'px;left:', soy.$$escapeHtml(opt_data.gene.dropper_left), 'px;height:', soy.$$escapeHtml(opt_data.gene.dropper_height), 'px; background-color:', soy.$$escapeHtml(opt_data.gene.color), ';\'>&nbsp;</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget.gene_distance_dropper = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sgw_distance_dropper\' data-id=\'', soy.$$escapeHtml(opt_data.gene.id), '\' style=\'top:', soy.$$escapeHtml(opt_data.gene.distance_dropper_top), 'px;left:', soy.$$escapeHtml(opt_data.gene.distance_dropper_left), 'px; background-color:', soy.$$escapeHtml(opt_data.gene.color), ';\'>&nbsp;</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget.chromosomes = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.chromosomes.length > 0) ? (opt_data.state.sex_linked_show) ? '<span class=\'swg_sex_linked_label\'>X-Chromosome?</span>' : (opt_data.state.chromosomes_sex_linked) ? '<span class=\'swg_sex_linked_label\'>X-Chromosome?</span>' : '' : '');
  var chromosomeList78 = opt_data.chromosomes;
  var chromosomeListLen78 = chromosomeList78.length;
  for (var chromosomeIndex78 = 0; chromosomeIndex78 < chromosomeListLen78; chromosomeIndex78++) {
    var chromosomeData78 = chromosomeList78[chromosomeIndex78];
    widget.chromosome({chromosome: chromosomeData78, state: opt_data.state}, output);
  }
  output.append((opt_data.state.edit_chromosome_count) ? '<button class=\'sgw_add_chromosome\'>Add Chromosome</button>' : '', '<div class=\'sgw_distance_measurement\'>Distances are expressed in centimorgans (cM)</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget.chromosome = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sgw_help_chromosome sgw_help" style="top:', soy.$$escapeHtml(opt_data.chromosome.top), 'px"><br>Chromosome ', (opt_data.chromosome.sex_linked) ? '(Sex-Linked)' : '', '</div><div class=\'sgw_chromosome\' data-id=\'', soy.$$escapeHtml(opt_data.chromosome.id), '\' style=\'top:', soy.$$escapeHtml(opt_data.chromosome.top), 'px; left:', soy.$$escapeHtml(opt_data.chromosome.left), 'px;border-color:', soy.$$escapeHtml(opt_data.chromosome.color), '\'>', (opt_data.state.sex_linked_show) ? '<input class=\'sgw_sexlinked_checkbox\' type=\'checkbox\' data-id=\'' + soy.$$escapeHtml(opt_data.chromosome.id) + '\' ' + ((opt_data.chromosome.sex_linked) ? 'checked=\'checked\'' : '') + ' data-action=\'sexlinked\'>' : (opt_data.chromosome.sex_linked) ? '<input class=\'sgw_sexlinked_checkbox\' type=\'checkbox\' data-id=\'' + soy.$$escapeHtml(opt_data.chromosome.id) + '\' ' + ((opt_data.chromosome.sex_linked) ? 'checked=\'checked\'' : '') + ' data-action=\'sexlinked\' disabled=\'disabled\'>' : '', '<div class=\'sgw_axis\' ></div>', (opt_data.state.edit_chromosome_count) ? '<span class="sgw_trash sgw_delete_chromosome" data-id=\'' + soy.$$escapeHtml(opt_data.chromosome.id) + '\' data-action=\'delete\'></span><!--<input class=\'sgw_delete_chromosome\' type=\'button\' data-id=\'' + soy.$$escapeHtml(opt_data.chromosome.id) + '\' data-action=\'delete\' value=\'Delete\'>-->' : '', '</div><div class=\'sgw_distance_holder\' data-id=\'', soy.$$escapeHtml(opt_data.chromosome.id), '\'></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
widget.gene_distance = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sgw_distance_element sgw_line_down\' data-id=\'', soy.$$escapeHtml(opt_data.left_down_line.gene_id), '\' style=\'position:absolute;top:', soy.$$escapeHtml(opt_data.left_down_line.top), 'px;left:', soy.$$escapeHtml(opt_data.left_down_line.left), 'px;width:1px;height:', soy.$$escapeHtml(opt_data.left_down_line.height), 'px;\'> </div><div class=\'sgw_distance_element sgw_line_down\' data-id=\'', soy.$$escapeHtml(opt_data.right_down_line.gene_id), '\' style=\'position:absolute;top:', soy.$$escapeHtml(opt_data.right_down_line.top), 'px;left:', soy.$$escapeHtml(opt_data.right_down_line.left), 'px;width:1px;height:', soy.$$escapeHtml(opt_data.right_down_line.height), 'px;\'> </div><div class=\'sgw_distance_element sgw_line_across\' data-id=\'', soy.$$escapeHtml(opt_data.across_line.line_id), '\' style=\'position:absolute;top:', soy.$$escapeHtml(opt_data.across_line.top), 'px;left:', soy.$$escapeHtml(opt_data.across_line.left), 'px;width:', soy.$$escapeHtml(opt_data.across_line.width), 'px;height:20px;\'>', (opt_data.distance_input.input_down_steps == 0) ? '<div class=\'sgw_line_across_arrow\' style=\'float:left\'>&#8592;</div><div class=\'sgw_line_across_arrow\' style=\'float:right\'>&#8594;</div>' : '<div class=\'sgw_line_across_internal_solid\'></div>', '<div class=\'sgw_line_across_internal\'></div></div><div class=\'sgw_distance_element sgw_distance_input\' data-id=\'', soy.$$escapeHtml(opt_data.distance_input.line_id), '\' style=\'position:absolute;top:', soy.$$escapeHtml(opt_data.distance_input.top), 'px;left:', soy.$$escapeHtml(opt_data.distance_input.left), 'px;width:', soy.$$escapeHtml(opt_data.distance_input.width), 'px;height:30px;\'><input class=\'sgw_cm_input\' type=\'text\' data-id=\'', soy.$$escapeHtml(opt_data.distance_input.input_id), '\' data-id-1=\'', soy.$$escapeHtml(opt_data.distance_input.gene_1.id), '\'  data-id-2=\'', soy.$$escapeHtml(opt_data.distance_input.gene_2.id), '\' data-chromosome-id=\'', soy.$$escapeHtml(opt_data.distance_input.chromosome_id), '\' size=6 value=\'', soy.$$escapeHtml(opt_data.distance_input.distance), '\'/><!-- <span class=\'sgw_cm_unit\'>', soy.$$escapeHtml(opt_data.distance_input.unit), '</span> --></div>');
  return opt_sb ? '' : output.toString();
};
for(var i in widget) { exports[i] = widget[i] };
});
