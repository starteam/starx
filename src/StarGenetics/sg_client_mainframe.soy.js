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
  sg_client_mainframe.strains({strains: opt_data.model.ui.strains}, output);
  sg_client_mainframe.new_experiment({experiment: opt_data.model.ui.new_experiment}, output);
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
  output.append((opt_data.count != 0) ? '<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'' + soy.$$escapeHtml(opt_data.kind) + '\' data-id="' + soy.$$escapeHtml(opt_data.strain['id']) + '"><div class=\'sg_strain_title\'>' + soy.$$escapeHtml(opt_data.strain['name']) + '</div>' + ((opt_data.visuals) ? '<div class=\'sg_strain_visual\'><canvas data-kind=\'' + soy.$$escapeHtml(opt_data.kind) + '\' data-id=\'' + soy.$$escapeHtml(opt_data.strain['id']) + '\'></canvas></div>' : '') + '</div>' : '<div class=\'sg_strain_box\'></div>');
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
  output.append('<div class=\'sg_add_strain_box sg_s_strain_box\' data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' ><div class=\'sg_strain_title\'>Add strain</div>', (opt_data.visuals) ? '<div class=\'sg_strain_visual\'>Drop your strain here...</div>' : '', '</div>');
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
  output.append('<div class=\'sg_strains_box\'><div class=\'sg_title_box\'>Strains', (opt_data.strains.expanded) ? '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.strains.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'true\'>Expand</button>', '</div>');
  if (opt_data.strains.expanded) {
    output.append('<table>');
    if (opt_data.strains.visualsVisible) {
      output.append('<tr><td class=\'sg_s_col_head\'>Strain</td>');
      var strainList80 = opt_data.strains.list;
      var strainListLen80 = strainList80.length;
      for (var strainIndex80 = 0; strainIndex80 < strainListLen80; strainIndex80++) {
        var strainData80 = strainList80[strainIndex80];
        output.append('<td class=\'sg_strain_box\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData80['id']), '">');
        sg_client_mainframe.strain({strain: strainData80, visuals: true, kind: 'strains'}, output);
        output.append('</td>');
      }
      output.append('<td class=\'sg_place_holder\'>');
      sg_client_mainframe.strain_place_holder({kind: 'strains', visuals: opt_data.strains.visualsVisible}, output);
      output.append('</td></tr><tr><td  class=\'sg_s_col_head\'>Sex</td>');
      var strainList95 = opt_data.strains.list;
      var strainListLen95 = strainList95.length;
      for (var strainIndex95 = 0; strainIndex95 < strainListLen95; strainIndex95++) {
        var strainData95 = strainList95[strainIndex95];
        output.append('<td class=\'sg_strain_box\'>');
        sg_client_mainframe.sex_icon({sex: strainData95['sex']}, output);
        output.append('</td>');
      }
      output.append('</tr>');
    }
    if (opt_data.strains.propertiesVisible) {
      var propertyList104 = opt_data.strains.propertiesList;
      var propertyListLen104 = propertyList104.length;
      for (var propertyIndex104 = 0; propertyIndex104 < propertyListLen104; propertyIndex104++) {
        var propertyData104 = propertyList104[propertyIndex104];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData104), '</td>');
        var strainList108 = opt_data.strains.list;
        var strainListLen108 = strainList108.length;
        for (var strainIndex108 = 0; strainIndex108 < strainListLen108; strainIndex108++) {
          var strainData108 = strainList108[strainIndex108];
          output.append('<td data-id="', soy.$$escapeHtml(strainData108.id), '">', soy.$$escapeHtml(strainData108.properties[propertyData104].text), '</td>');
        }
        output.append('</tr>');
      }
    }
    output.append('</table>');
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
  output.append('<div class=\'sg_new_experiment_box\'><div class=\'sg_title_box\'>', (opt_data.experiment.expanded) ? 'Experiment setup<button class=\'sg_expand\' data-kind=\'new_experiment\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.experiment.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'new_experiment\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'new_experiment\' data-expanded-properties=\'true\'>Show Properties</button>') : 'Add another experiment?<button class=\'sg_expand\' data-kind=\'new_experiment\'  data-expanded=\'true\'>Click here to start new mating experiment.</button>', '&nbsp;', (opt_data.experiment.canclearparents) ? '<button class=\'sg_clear_parents sg_s_clear_parents\' data-kind="new_experiment">Clear</button>' : '', (opt_data.experiment.canmate) ? '<button class=\'sg_new_experiment_mate sg_s_new_experiment_mate\' data-kind=\'new_experiment\'>Mate</button>' : '', '</div>');
  if (opt_data.experiment.expanded) {
    output.append('<div class=\'sg_experiment_parents\'>');
    if (opt_data.experiment.parents.length < 1) {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\'>Drop strain here</div>');
    } else {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[0].id), '\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parents[0], visuals: opt_data.experiment.visualsVisible, kind: 'new_experiment'}, output);
      output.append('</div>');
    }
    if (opt_data.experiment.parents.length < 2) {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\'>Drop strain here</div>');
    } else {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[1].id), '\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parents[1], visuals: opt_data.experiment.visualsVisible, kind: 'new_experiment'}, output);
      output.append('</div>');
    }
    output.append('</div>');
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
sg_client_mainframe.all_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var experimentList169 = opt_data.experiments.list;
  var experimentListLen169 = experimentList169.length;
  for (var experimentIndex169 = 0; experimentIndex169 < experimentListLen169; experimentIndex169++) {
    var experimentData169 = experimentList169[experimentIndex169];
    if (experimentData169.id == opt_data.experiments.show_experiment) {
      sg_client_mainframe.one_experiment({experiment: experimentData169, index: experimentIndex169, compact_view: false, css_class: ''}, output);
    }
  }
  output.append('<div class=\'sg_experiment_history\'><div class=\'sg_title_box\'>Experiment Selector</div><div data-kind="history" data-widget="slider-table" class=\'sg_experiment_holder\'>');
  var experimentList179 = opt_data.experiments.list;
  var experimentListLen179 = experimentList179.length;
  for (var experimentIndex179 = 0; experimentIndex179 < experimentListLen179; experimentIndex179++) {
    var experimentData179 = experimentList179[experimentIndex179];
    sg_client_mainframe.one_experiment({experiment: experimentData179, index: experimentIndex179, compact_view: true, css_class: 'sg_mini_experiment_box ', selected: opt_data.experiments.show_experiment == experimentData179.id}, output);
  }
  output.append('</div><div data-kind="history" data-widget="slider" class=\'sg_slider\'><div data-kind="history" data-widget="slider-thumb" class=\'sg_slider_thumb\'>||</div></div></div><br>', (opt_data.experiments.list.length > opt_data.experiments.show_experiments) ? '<button class=\'sg_show_more\' data-increment=\'+\'>Show More?</button>' : '', (opt_data.experiments.show_experiments > 1) ? '<button class=\'sg_show_more\' data-increment=\'-\'>Show Less?</button>' : '');
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
  output.append('<div class=\'sg_experiment_box ', soy.$$escapeHtml(opt_data.css_class), ' ', (opt_data.selected) ? 'sg_experiment_selected' : '', '\'>', (opt_data.compact_view) ? '<div data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' class=\'sg_experiment_box_floaty\'></div>' : '', '<!-- header --><div class=\'sg_title_box\'>', soy.$$escapeHtml(opt_data.experiment.name), (opt_data.compact_view) ? '' : ((opt_data.experiment.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.experiment.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'  data-expanded=\'true\'>Expand</button>') + '&nbsp;' + ((opt_data.experiment.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">Rename</button>' : '') + ((opt_data.experiment.canmate) ? '<button class=\'sg_experiment_mate\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">Add progenies</button>' : ''), '</div>');
  if (opt_data.experiment.expanded) {
    output.append('<!-- expanded body --><table data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-widget="slider-table" class=\'sg_slider_table\'><tr><th class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Name</th><th class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Parent F</th><th class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Parent M</th>');
    var phenotypeList247 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
    var phenotypeListLen247 = phenotypeList247.length;
    for (var phenotypeIndex247 = 0; phenotypeIndex247 < phenotypeListLen247; phenotypeIndex247++) {
      var phenotypeData247 = phenotypeList247[phenotypeIndex247];
      output.append('<th colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'><!-- ', soy.$$escapeHtml(phenotypeData247.short_description), ' --> Class ', soy.$$escapeHtml(phenotypeIndex247 + 1), '</th>');
    }
    output.append('</tr>');
    if (opt_data.experiment.visualsVisible) {
      output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Visual</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td>');
      var phenotypeList268 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen268 = phenotypeList268.length;
      for (var phenotypeIndex268 = 0; phenotypeIndex268 < phenotypeListLen268; phenotypeIndex268++) {
        var phenotypeData268 = phenotypeList268[phenotypeIndex268];
        output.append('<td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData268].top_male, count: opt_data.experiment.phenotypes[phenotypeData268].males, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData268].top_female, count: opt_data.experiment.phenotypes[phenotypeData268].females, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td>');
      }
      output.append('</tr><tr><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Sex (M/F)</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.female_icon(null, output);
      output.append('</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.male_icon(null, output);
      output.append('</td>');
      var phenotypeList288 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen288 = phenotypeList288.length;
      for (var phenotypeIndex288 = 0; phenotypeIndex288 < phenotypeListLen288; phenotypeIndex288++) {
        var phenotypeData288 = phenotypeList288[phenotypeIndex288];
        output.append('<td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_left\'>    ');
        sg_client_mainframe.male_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData288].males), '</td><td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.female_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData288].females), '</td>');
      }
      output.append('</tr>');
      if (opt_data.experiment.propertiesVisible && ! opt_data.compact_view) {
        output.append('<tr>');
        var phenotypeList303 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen303 = phenotypeList303.length;
        for (var phenotypeIndex303 = 0; phenotypeIndex303 < phenotypeListLen303; phenotypeIndex303++) {
          var phenotypeData303 = phenotypeList303[phenotypeIndex303];
          output.append('<td class=\'sg_experiment_phenotype_detail_left\'>');
          if (opt_data.experiment.phenotypes[phenotypeData303].show_more_males) {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData303), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData303].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData303) + '" data-state="-">Previous?</button>' : '');
            var strainList319 = opt_data.experiment.phenotypes[phenotypeData303].males_list;
            var strainListLen319 = strainList319.length;
            for (var strainIndex319 = 0; strainIndex319 < strainListLen319; strainIndex319++) {
              var strainData319 = strainList319[strainIndex319];
              if (strainIndex319 > opt_data.experiment.phenotypes[phenotypeData303].start_index_male && strainIndex319 <= opt_data.experiment.phenotypes[phenotypeData303].start_index_male + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData319, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData303].males_list.length - opt_data.experiment.phenotypes[phenotypeData303].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData303) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData303), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td><td class=\'sg_experiment_phenotype_detail_right\'>');
          if (opt_data.experiment.phenotypes[phenotypeData303].show_more_females) {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData303), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData303].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData303) + '" data-state="-">Previous?</button>' : '');
            var strainList355 = opt_data.experiment.phenotypes[phenotypeData303].females_list;
            var strainListLen355 = strainList355.length;
            for (var strainIndex355 = 0; strainIndex355 < strainListLen355; strainIndex355++) {
              var strainData355 = strainList355[strainIndex355];
              if (strainIndex355 > opt_data.experiment.phenotypes[phenotypeData303].start_index_female && strainIndex355 <= opt_data.experiment.phenotypes[phenotypeData303].start_index_female + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData355, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData303].females_list.length - opt_data.experiment.phenotypes[phenotypeData303].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData303) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData303), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td>');
        }
        output.append('</tr>');
        var propertyList379 = opt_data.experiment.propertiesList;
        var propertyListLen379 = propertyList379.length;
        for (var propertyIndex379 = 0; propertyIndex379 < propertyListLen379; propertyIndex379++) {
          var propertyData379 = propertyList379[propertyIndex379];
          output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(propertyData379), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.female.properties[propertyData379].text), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.male.properties[propertyData379].text), '</td>');
          var phenotypeList387 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen387 = phenotypeList387.length;
          for (var phenotypeIndex387 = 0; phenotypeIndex387 < phenotypeListLen387; phenotypeIndex387++) {
            var phenotypeData387 = phenotypeList387[phenotypeIndex387];
            output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData387].properties[propertyData379].text), '</td>');
          }
          output.append('</tr>');
        }
      }
    }
    output.append('</table>', (! opt_data.compact_view) ? '<div data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-widget="slider" class=\'sg_slider\'><div data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-widget="slider-thumb" class=\'sg_slider_thumb\'>||</div></div>' : '');
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
  output.append('<img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDklEQVR42mNkIB40AbEqEp8FiM8ykmAAMpAF4nlA/IEcA2Cak4C4i1QDkDU/BuLl6AbYAnECEPMD8X8g/gXEq4F4AxbNDMgGMAPxRCD+AsR9QPwKKs4LxClAbAPEfGiawQELM6AXiI8B8VocTjcB4kogDkaXABmgCcT5QJxBwP+FQHwf6h0UA0Dxuw6ILxAwAOSdGUAcjW7ACqjgXyJiARSgoegGLIOG/C8iDFgDxCHoBpRDA/AwAc1iQNwOxMnoBkgzQKIunIABHUC8Fd0iWDSCYoELagM2AIo+RyDOQZdATokgQ6yAeAoQn4QGqi4DJHq/AnEZtoBGT8og78QAsT4QMwHxLSBeDsTXcfkLAHmSM6tHQ6tHAAAAAElFTkSuQmCC\'>');
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
  output.append('<img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHElEQVR42mNkIB5EAvFyJL4sEMszkmBAKhDrAHE+VPM8IE4ixQCYIWZArADSDMSPSTUAZPNmID4NNYwB3QBbIE4AYn4g/g/Ev4B4NRBvQHY2EHvAvAMzgBmIJwLxFyDuA+JXUHFeIE4BYhsg5oM5G8k7X2AG9ALxMSBei8PpJkBcCcTB6BIgAzShIZtBwP+FQHwf6h0UA5qAeB0QXyBgAMg7M4A4Gt2AFVDBv0TEAihAQ9ENWAYN+V9EGLAGiEPQDSiHBuBhAprFgLgdiJPRDZBmgERdOAEDOoB4K7pFsGgExQIX1AZsABR9jkCcgy6BnBJBhlgB8RQgPgkNVF0GSPR+BeIybAGNnpRB3okBYn0gZgLiWwyQLHwdl78Auzgzw8mO3K0AAAAASUVORK5CYII=\'>');
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
