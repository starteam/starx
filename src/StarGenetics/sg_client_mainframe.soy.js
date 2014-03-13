// This file was automatically generated from sg_client_mainframe.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var sg_client_mainframe= sg_client_mainframe ? sg_client_mainframe : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.gwt_content = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<html><script src=\'', (opt_data.url) ? soy.$$escapeHtml(opt_data.url) : '/StarGeneticsGWT/stargenetics_gwt_java.nocache.js', '\'><\/script><body>StarGenetics GWT Frame</body></html>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<!--<div class=\'sg_main\'><button class=\'sg_open_ps\'>Open</button></div><div class=\'sg_main\'><button class=\'sg_open_ps\'>Close</button></div>--><div class=\'sg_workspace\' id=\'', soy.$$escapeHtml(opt_data.config.element_id + '_workspace'), '\'>Workspace</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.workspace = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_workspace\'><div class=\'sg_workspace_title\'>StarGenetics Title</div>');
  sg_client_mainframe.strains({strains: opt_data.model.ui.strains, add_strain: opt_data.model.ui.experiments.list.length != 0}, output);
  sg_client_mainframe.new_experiment({experiment: opt_data.model.ui.new_experiment, progenies_count: opt_data.model.backend.genetics.engine.avg_offspring_count}, output);
  sg_client_mainframe.all_experiments({experiments: opt_data.model.ui.experiments}, output);
  output.append('<br><button class=\'sg_workspace_save\'>Save</button><button class=\'sg_workspace_load\'>Load</button></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.io = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<button class=\'sg_workspace_save\'>Save</button><button class=\'sg_workspace_load\'>Load</button>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.strain = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.count != 0) {
    output.append('<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id="', soy.$$escapeHtml(opt_data.strain['id']), '">');
    if (opt_data.visuals) {
      output.append('<div class=\'sg_strain_visual\' title=\'Sex:', soy.$$escapeHtml(opt_data.strain['sex']), '\n');
      var propertyList42 = soy.$$getMapKeys(opt_data.strain.capitalized_properties);
      var propertyListLen42 = propertyList42.length;
      for (var propertyIndex42 = 0; propertyIndex42 < propertyListLen42; propertyIndex42++) {
        var propertyData42 = propertyList42[propertyIndex42];
        output.append(soy.$$escapeHtml(propertyData42), ':', soy.$$escapeHtml(opt_data.strain.capitalized_properties[propertyData42].text), '\n');
      }
      output.append('\'><canvas data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id=\'', soy.$$escapeHtml(opt_data.strain['id']), '\' class=\'sg_strain_visual_canvas\'></canvas><div class=\'sg_strain_visual_canvas_sex\'>');
      if (opt_data.strain['sex'] == 'FEMALE') {
        sg_client_mainframe.female_icon(null, output);
      } else {
        sg_client_mainframe.male_icon(null, output);
      }
      output.append('</div></div>');
    }
    output.append('</div><div class=\'sg_strain_title\'>', soy.$$escapeHtml(opt_data.strain['name']), '</div>');
  } else {
    output.append('<div class=\'sg_strain_box\'></div>');
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.strain_short = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id="', soy.$$escapeHtml(opt_data.strain['id']), '"><div class=\'sg_strain_title\'>', soy.$$escapeHtml(opt_data.strain['name']), ' ');
  if (opt_data.strain['sex'] == 'FEMALE') {
    sg_client_mainframe.female_icon(null, output);
  } else {
    sg_client_mainframe.male_icon(null, output);
  }
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.strain_place_holder = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_add_strain_box sg_s_strain_box\' data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' ><div class=\'sg_strain_add_strain sg_strain_visual\'>+</div></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.strains = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_strains_box\'><div class=\'sg_title_box\'>Strains', (opt_data.strains.expanded) ? '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'false\'>Collapse</button>' : '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'true\'>Expand</button>', '</div>');
  if (opt_data.strains.expanded) {
    output.append('<div class=\'sg_slider_widget_wrapper\'><table data-kind=\'strains\' data-widget="slider-table" class=\'sg_slider_table\'>');
    if (opt_data.strains.visualsVisible) {
      output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>Strain</td>');
      var strainList96 = opt_data.strains.list;
      var strainListLen96 = strainList96.length;
      for (var strainIndex96 = 0; strainIndex96 < strainListLen96; strainIndex96++) {
        var strainData96 = strainList96[strainIndex96];
        output.append('<td class=\'sg_strain_box sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData96['id']), '">');
        sg_client_mainframe.strain({strain: strainData96, visuals: true, kind: 'strains'}, output);
        output.append('</td>');
      }
      if (opt_data.add_strain) {
        output.append('<td rowspan=\'', soy.$$escapeHtml(2 + (opt_data.strains.propertiesVisible ? opt_data.strains.propertiesList.length : 0)), '\' class=\'sg_place_holder sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.strain_place_holder({kind: 'strains', visuals: opt_data.strains.visualsVisible}, output);
        output.append('</td>');
      }
      output.append('</tr>');
    }
    if (opt_data.strains.propertiesVisible) {
      output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\' ><b>Phenotypes</b></td><td colspan=\'', soy.$$escapeHtml(opt_data.strains.list.length - 1), '\'><button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'false\'>Hide</button></td></tr>');
      var propertyList121 = opt_data.strains.propertiesList;
      var propertyListLen121 = propertyList121.length;
      for (var propertyIndex121 = 0; propertyIndex121 < propertyListLen121; propertyIndex121++) {
        var propertyData121 = propertyList121[propertyIndex121];
        output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>', soy.$$escapeHtml(propertyData121), '</td>');
        var strainList125 = opt_data.strains.list;
        var strainListLen125 = strainList125.length;
        for (var strainIndex125 = 0; strainIndex125 < strainListLen125; strainIndex125++) {
          var strainData125 = strainList125[strainIndex125];
          output.append('<td data-id="', soy.$$escapeHtml(strainData125.id), '" class=\'sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>', soy.$$escapeHtml(strainData125.properties[propertyData121].text), '</td>');
        }
        output.append('</tr>');
      }
    } else {
      output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'><b>Phenotypes</b></td><td colspan=\'', soy.$$escapeHtml(opt_data.strains.list.length - 1), '\'><button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'true\'>Show</button></td></tr>');
    }
    output.append('</table></div>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.new_experiment_expanded = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_new_experiment_box\'><div class=\'sg_title_box\'>Experiment setup &nbsp;', (opt_data.experiment.canclearparents) ? '<button class=\'sg_clear_parents sg_s_clear_parents\' data-kind="new_experiment">Clear</button>' : '', (opt_data.experiment.canmate) ? '<button class=\'sg_new_experiment_mate sg_s_new_experiment_mate\' data-kind=\'new_experiment\'>Mate</button>' : '', '</div>');
  if (opt_data.experiment.expanded) {
    output.append('<div class=\'sg_experiment_parents\'>');
    if (opt_data.experiment.parents.length < 1) {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\'>Drop strain here</div>');
    } else {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[0].id), '\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parents[0], visuals: opt_data.experiment.visualsVisible, kind: 'new_experiment'}, output);
      output.append('<button class=\'sg_experiment_parent_remove\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[0].id), '\' data-kind=\'new_experiment\' title="Remove Parent">x</button></div>');
    }
    output.append('<div class=\'sg_experiment_parent_x\'>X</div>');
    if (opt_data.experiment.parents.length < 2) {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\'>Drop strain here</div>');
    } else {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[1].id), '\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parents[1], visuals: opt_data.experiment.visualsVisible, kind: 'new_experiment'}, output);
      output.append('<button class=\'sg_experiment_parent_remove\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[1].id), '\' data-kind=\'new_experiment\' title="Remove Parent">x</button></div>');
    }
    output.append((opt_data.experiment.canmate) ? '<div>Number of progenies:<input type=\'text\' class=\'sg_new_experiment_mate_count\' value=\'' + ((opt_data.prg_count) ? soy.$$escapeHtml(opt_data.prg_count) : '50') + '\'><button class=\'sg_new_experiment_mate sg_s_new_experiment_mate_large\' data-kind=\'new_experiment\'>Mate</button></div>' : '', '</div>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.new_experiment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.experiment.expanded) {
    sg_client_mainframe.new_experiment_expanded(opt_data, output);
  } else {
    output.append('<div class=\'sg_new_experiment_box\'><div class=\'sg_title_box\'>Add another experiment?<button class=\'sg_expand\' data-kind=\'new_experiment\'  data-expanded=\'true\'>Click here to start new mating experiment.</button></div></div>');
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.all_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var experimentList201 = opt_data.experiments.list;
  var experimentListLen201 = experimentList201.length;
  for (var experimentIndex201 = 0; experimentIndex201 < experimentListLen201; experimentIndex201++) {
    var experimentData201 = experimentList201[experimentIndex201];
    if (experimentData201.id == opt_data.experiments.show_experiment) {
      sg_client_mainframe.one_experiment({experiment: experimentData201, index: experimentIndex201, compact_view: false, css_class: ''}, output);
    }
  }
  if (opt_data.experiments.list.length != 0) {
    output.append('<div class=\'sg_experiment_history\'><div class=\'sg_title_box\'>Experiment Selector</div><div class=\'sg_slider_widget_wrapper\'><div data-kind="history" data-widget="slider-table" class=\'sg_experiment_holder\'>');
    var experimentList213 = opt_data.experiments.list;
    var experimentListLen213 = experimentList213.length;
    for (var experimentIndex213 = 0; experimentIndex213 < experimentListLen213; experimentIndex213++) {
      var experimentData213 = experimentList213[experimentIndex213];
      if (! experimentData213.discarded) {
        sg_client_mainframe.one_experiment({experiment: experimentData213, index: experimentIndex213, compact_view: true, css_class: 'sg_mini_experiment_box ', selected: opt_data.experiments.show_experiment == experimentData213.id}, output);
      }
    }
    output.append('</div></div></div></div>');
  }
  output.append('<br>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.one_experiment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_experiment_box ', soy.$$escapeHtml(opt_data.css_class), ' ', (opt_data.selected) ? 'sg_experiment_selected' : '', '\'>', (opt_data.compact_view) ? '<div data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' class=\'sg_experiment_box_floaty\'></div>' : '', '<!-- header --><div class=\'sg_title_box\'>', soy.$$escapeHtml(opt_data.experiment.name), (opt_data.compact_view) ? '' : ((opt_data.experiment.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded=\'false\'>Collapse</button>' + ((opt_data.experiment.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'  data-expanded=\'true\'>Expand</button>') + '&nbsp;' + ((opt_data.experiment.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">Rename</button><button class=\'sg_discard\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">Discard</button>' : '') + ((opt_data.experiment.canmate) ? '<button class=\'sg_experiment_mate\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">Add progenies</button>' : ''), '</div>');
  if (opt_data.experiment.expanded) {
    output.append('<!-- expanded body -->', (! opt_data.compact_view) ? '<div class=\'sg_slider_widget_wrapper\'>' : '', '<table data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-widget="slider-table" class=\'sg_slider_table\'><tr><th class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Name</th><th class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Parent F</th><th class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Parent M</th>');
    var phenotypeList284 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
    var phenotypeListLen284 = phenotypeList284.length;
    for (var phenotypeIndex284 = 0; phenotypeIndex284 < phenotypeListLen284; phenotypeIndex284++) {
      var phenotypeData284 = phenotypeList284[phenotypeIndex284];
      output.append('<th colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'><!-- ', soy.$$escapeHtml(phenotypeData284.short_description), ' --> Class ', soy.$$escapeHtml(phenotypeIndex284 + 1), '</th>');
    }
    output.append('</tr>');
    if (opt_data.experiment.visualsVisible) {
      output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Visual</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td>');
      var phenotypeList305 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen305 = phenotypeList305.length;
      for (var phenotypeIndex305 = 0; phenotypeIndex305 < phenotypeListLen305; phenotypeIndex305++) {
        var phenotypeData305 = phenotypeList305[phenotypeIndex305];
        output.append('<td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData305].top_female, count: opt_data.experiment.phenotypes[phenotypeData305].females, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData305].top_male, count: opt_data.experiment.phenotypes[phenotypeData305].males, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td>');
      }
      output.append('</tr><tr><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Sex (M/F)</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.female_icon(null, output);
      output.append('</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.male_icon(null, output);
      output.append('</td>');
      var phenotypeList325 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen325 = phenotypeList325.length;
      for (var phenotypeIndex325 = 0; phenotypeIndex325 < phenotypeListLen325; phenotypeIndex325++) {
        var phenotypeData325 = phenotypeList325[phenotypeIndex325];
        output.append('<td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.female_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData325].females), '</td><td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_right\'>    ');
        sg_client_mainframe.male_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData325].males), '</td>');
      }
      output.append('</tr>');
      if (opt_data.experiment.propertiesVisible && ! opt_data.compact_view) {
        output.append('<tr>');
        var phenotypeList340 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen340 = phenotypeList340.length;
        for (var phenotypeIndex340 = 0; phenotypeIndex340 < phenotypeListLen340; phenotypeIndex340++) {
          var phenotypeData340 = phenotypeList340[phenotypeIndex340];
          output.append('<td class=\'sg_experiment_phenotype_detail_left\'>');
          if (opt_data.experiment.phenotypes[phenotypeData340].show_more_females) {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData340), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData340].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData340) + '" data-state="-">Previous?</button>' : '');
            var strainList356 = opt_data.experiment.phenotypes[phenotypeData340].females_list;
            var strainListLen356 = strainList356.length;
            for (var strainIndex356 = 0; strainIndex356 < strainListLen356; strainIndex356++) {
              var strainData356 = strainList356[strainIndex356];
              if (strainIndex356 > opt_data.experiment.phenotypes[phenotypeData340].start_index_female && strainIndex356 <= opt_data.experiment.phenotypes[phenotypeData340].start_index_female + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData356, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData340].females_list.length - opt_data.experiment.phenotypes[phenotypeData340].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData340) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData340), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td><td class=\'sg_experiment_phenotype_detail_right\'>');
          if (opt_data.experiment.phenotypes[phenotypeData340].show_more_males) {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData340), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData340].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData340) + '" data-state="-">Previous?</button>' : '');
            var strainList392 = opt_data.experiment.phenotypes[phenotypeData340].males_list;
            var strainListLen392 = strainList392.length;
            for (var strainIndex392 = 0; strainIndex392 < strainListLen392; strainIndex392++) {
              var strainData392 = strainList392[strainIndex392];
              if (strainIndex392 > opt_data.experiment.phenotypes[phenotypeData340].start_index_male && strainIndex392 <= opt_data.experiment.phenotypes[phenotypeData340].start_index_male + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData392, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData340].males_list.length - opt_data.experiment.phenotypes[phenotypeData340].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData340) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData340), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td>');
        }
        output.append('</tr>');
        var propertyList416 = opt_data.experiment.propertiesList;
        var propertyListLen416 = propertyList416.length;
        for (var propertyIndex416 = 0; propertyIndex416 < propertyListLen416; propertyIndex416++) {
          var propertyData416 = propertyList416[propertyIndex416];
          output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(propertyData416), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.female.properties[propertyData416].text), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.male.properties[propertyData416].text), '</td>');
          var phenotypeList424 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen424 = phenotypeList424.length;
          for (var phenotypeIndex424 = 0; phenotypeIndex424 < phenotypeListLen424; phenotypeIndex424++) {
            var phenotypeData424 = phenotypeList424[phenotypeIndex424];
            output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData424].properties[propertyData416].text), '</td>');
          }
          output.append('</tr>');
        }
      }
    }
    output.append('</table>', (! opt_data.compact_view) ? '</div>' : '');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.sex_icon = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.sex == 'MALE') {
    sg_client_mainframe.male_icon(null, output);
  } else {
    sg_client_mainframe.female_icon(null, output);
  }
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.male_icon = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB0klEQVRYhe3WP2sUURQF8J9Ro6AmBoxaWFgIFiaiKMRAQAyCWGhvoR/AjyDYiaWllXZaiOIHSMDKIkVEMSgKgiL4L8G/EUVNWIu5y6zjmt03k0WRPTC8x+w995x9c+feoYsu/jJWdChvP3qa3K/hQ4c0f8GzECte74qBzVz+F+jHAMbw3hIn0EkM4U0Iv15OA1tl/+ww9mFNk5hhzIbofRyqamA1TkeyYmF9x02MR+zugvhgGCptYAfuFURf4I7slWq8fxVzsZ8J8XqOadxKFd8ZYjVZMZ3BtkLMMC5hscHIDDanihWxDg8i4cMmwkUcwZeIv1hVHM7KK3hLm5zjwVnESBXxXvmzPJnIvRa8K1UMjEWSt1iVyD0o7/ktZ82fWvHeWKewkGhgCj9k3XB7WQMbY51LFIdvmI/9hrIGPsY6UMJAL9bH/msJPjgqe46vpE/MA8H9jJVlDazFp0h0LJF7OXg3yorXcSESPUZfm5xReUccbxHbEoN4GckmZFW9FIbkY/d6VfE6RuXt9SlO+H38bsI5WcHVcFf7J9YW9uO5fNDM4zYmZVNyoeG3iTC07OjDefkRF69HOKXEN2bqZ3kP9mCX7E2ZlU3MJ6nCXfwz+Am4doaE9WjC2gAAAABJRU5ErkJggg==\'>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.female_icon = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABuUlEQVRYhe3WzYtOYRgG8N8rGimaMYpeSVlgIR+RZrDyB0iThQWRjT9DWVB28jdY+EgRssFaFlYkiwkzQxYkHyP5OBbP/ebtNLznPOd9ieaqp/s5dd/XdfV83Yd5/IMYw1k8xGu8wSOcw+5BCq/CVRQ9xk2s67f4ZkyFwDdcwhGMSytyGBfwNXJeYXu/xNuYDuLH2NrD6JPIfYk1/TBwPggnMVohf7TLxOWm4hulJS+wp0bdTnyPsaWJgRMhfjej9lbUnv5d0oIeJGMRb2QYuB5xvImBdsSnGQYmI65uYuBLxIUZBhaVOLIMzERcn2FgQ8TnTQzcjjiBVk0DB0ocWWjjk3SaD9aom4iaz1jbxACcCbK32FYhf5PUoAqpaTXGEO4F4TupB8y1dS0cCqMFHmBJL/Kq+7oSV7ArvqdwTeoNhXTg9vm53PexHy8q8lfCEE7ig1+34lmcwuJ+CpexHEel9tsRvohjWDFI4TJGugyM5JL0egcGjr9uoO7rthTPumqHY965eqSb8L4qYd0m0zL3fg+XciqjroGP2BHzZbgT873SI9XJ+SP4P25Bzo9GB7M43jWfRxZ+APNIaWijaXbOAAAAAElFTkSuQmCC\'>');
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
