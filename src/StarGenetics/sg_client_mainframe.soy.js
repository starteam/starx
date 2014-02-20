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
    output.append('<table data-kind=\'strains\' data-widget="slider-table" class=\'sg_slider_table\'>');
    if (opt_data.strains.visualsVisible) {
      output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>Strain</td>');
      var strainList80 = opt_data.strains.list;
      var strainListLen80 = strainList80.length;
      for (var strainIndex80 = 0; strainIndex80 < strainListLen80; strainIndex80++) {
        var strainData80 = strainList80[strainIndex80];
        output.append('<td class=\'sg_strain_box sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData80['id']), '">');
        sg_client_mainframe.strain({strain: strainData80, visuals: true, kind: 'strains'}, output);
        output.append('</td>');
      }
      output.append('<td rowspan=\'', soy.$$escapeHtml(2 + (opt_data.strains.propertiesVisible ? opt_data.strains.propertiesList.length : 0)), '\' class=\'sg_place_holder sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
      sg_client_mainframe.strain_place_holder({kind: 'strains', visuals: opt_data.strains.visualsVisible}, output);
      output.append('</td></tr><tr><td  class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>Sex</td>');
      var strainList97 = opt_data.strains.list;
      var strainListLen97 = strainList97.length;
      for (var strainIndex97 = 0; strainIndex97 < strainListLen97; strainIndex97++) {
        var strainData97 = strainList97[strainIndex97];
        output.append('<td class=\'sg_strain_box sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.sex_icon({sex: strainData97['sex']}, output);
        output.append('</td>');
      }
      output.append('</tr>');
    }
    if (opt_data.strains.propertiesVisible) {
      var propertyList106 = opt_data.strains.propertiesList;
      var propertyListLen106 = propertyList106.length;
      for (var propertyIndex106 = 0; propertyIndex106 < propertyListLen106; propertyIndex106++) {
        var propertyData106 = propertyList106[propertyIndex106];
        output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>', soy.$$escapeHtml(propertyData106), '</td>');
        var strainList110 = opt_data.strains.list;
        var strainListLen110 = strainList110.length;
        for (var strainIndex110 = 0; strainIndex110 < strainListLen110; strainIndex110++) {
          var strainData110 = strainList110[strainIndex110];
          output.append('<td data-id="', soy.$$escapeHtml(strainData110.id), '" class=\'sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>', soy.$$escapeHtml(strainData110.properties[propertyData106].text), '</td>');
        }
        output.append('</tr>');
      }
    }
    output.append('</table><div data-kind="strains" data-widget="slider" class=\'sg_slider\'><div data-kind="strains" data-widget="slider-thumb" class=\'sg_slider_thumb\'>||</div></div>');
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
  output.append('<div class=\'sg_new_experiment_box\'><div class=\'sg_title_box\'>', (opt_data.experiment.expanded) ? 'Experiment setup' : 'Add another experiment?<button class=\'sg_expand\' data-kind=\'new_experiment\'  data-expanded=\'true\'>Click here to start new mating experiment.</button>', '&nbsp;', (opt_data.experiment.canclearparents) ? '<button class=\'sg_clear_parents sg_s_clear_parents\' data-kind="new_experiment">Clear</button>' : '', (opt_data.experiment.canmate) ? '<button class=\'sg_new_experiment_mate sg_s_new_experiment_mate\' data-kind=\'new_experiment\'>Mate</button>' : '', '</div>');
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
  var experimentList166 = opt_data.experiments.list;
  var experimentListLen166 = experimentList166.length;
  for (var experimentIndex166 = 0; experimentIndex166 < experimentListLen166; experimentIndex166++) {
    var experimentData166 = experimentList166[experimentIndex166];
    if (experimentData166.id == opt_data.experiments.show_experiment) {
      sg_client_mainframe.one_experiment({experiment: experimentData166, index: experimentIndex166, compact_view: false, css_class: ''}, output);
    }
  }
  output.append('<div class=\'sg_experiment_history\'><div class=\'sg_title_box\'>Experiment Selector</div><div data-kind="history" data-widget="slider-table" class=\'sg_experiment_holder\'>');
  var experimentList176 = opt_data.experiments.list;
  var experimentListLen176 = experimentList176.length;
  for (var experimentIndex176 = 0; experimentIndex176 < experimentListLen176; experimentIndex176++) {
    var experimentData176 = experimentList176[experimentIndex176];
    sg_client_mainframe.one_experiment({experiment: experimentData176, index: experimentIndex176, compact_view: true, css_class: 'sg_mini_experiment_box ', selected: opt_data.experiments.show_experiment == experimentData176.id}, output);
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
    var phenotypeList244 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
    var phenotypeListLen244 = phenotypeList244.length;
    for (var phenotypeIndex244 = 0; phenotypeIndex244 < phenotypeListLen244; phenotypeIndex244++) {
      var phenotypeData244 = phenotypeList244[phenotypeIndex244];
      output.append('<th colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'><!-- ', soy.$$escapeHtml(phenotypeData244.short_description), ' --> Class ', soy.$$escapeHtml(phenotypeIndex244 + 1), '</th>');
    }
    output.append('</tr>');
    if (opt_data.experiment.visualsVisible) {
      output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Visual</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td>');
      var phenotypeList265 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen265 = phenotypeList265.length;
      for (var phenotypeIndex265 = 0; phenotypeIndex265 < phenotypeListLen265; phenotypeIndex265++) {
        var phenotypeData265 = phenotypeList265[phenotypeIndex265];
        output.append('<td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData265].top_male, count: opt_data.experiment.phenotypes[phenotypeData265].males, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData265].top_female, count: opt_data.experiment.phenotypes[phenotypeData265].females, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td>');
      }
      output.append('</tr><tr><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Sex (M/F)</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.female_icon(null, output);
      output.append('</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.male_icon(null, output);
      output.append('</td>');
      var phenotypeList285 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen285 = phenotypeList285.length;
      for (var phenotypeIndex285 = 0; phenotypeIndex285 < phenotypeListLen285; phenotypeIndex285++) {
        var phenotypeData285 = phenotypeList285[phenotypeIndex285];
        output.append('<td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_left\'>    ');
        sg_client_mainframe.male_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData285].males), '</td><td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.female_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData285].females), '</td>');
      }
      output.append('</tr>');
      if (opt_data.experiment.propertiesVisible && ! opt_data.compact_view) {
        output.append('<tr>');
        var phenotypeList300 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen300 = phenotypeList300.length;
        for (var phenotypeIndex300 = 0; phenotypeIndex300 < phenotypeListLen300; phenotypeIndex300++) {
          var phenotypeData300 = phenotypeList300[phenotypeIndex300];
          output.append('<td class=\'sg_experiment_phenotype_detail_left\'>');
          if (opt_data.experiment.phenotypes[phenotypeData300].show_more_females) {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData300), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData300].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData300) + '" data-state="-">Previous?</button>' : '');
            var strainList316 = opt_data.experiment.phenotypes[phenotypeData300].females_list;
            var strainListLen316 = strainList316.length;
            for (var strainIndex316 = 0; strainIndex316 < strainListLen316; strainIndex316++) {
              var strainData316 = strainList316[strainIndex316];
              if (strainIndex316 > opt_data.experiment.phenotypes[phenotypeData300].start_index_female && strainIndex316 <= opt_data.experiment.phenotypes[phenotypeData300].start_index_female + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData316, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData300].females_list.length - opt_data.experiment.phenotypes[phenotypeData300].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData300) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData300), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td><td class=\'sg_experiment_phenotype_detail_right\'>');
          if (opt_data.experiment.phenotypes[phenotypeData300].show_more_males) {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData300), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData300].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData300) + '" data-state="-">Previous?</button>' : '');
            var strainList352 = opt_data.experiment.phenotypes[phenotypeData300].males_list;
            var strainListLen352 = strainList352.length;
            for (var strainIndex352 = 0; strainIndex352 < strainListLen352; strainIndex352++) {
              var strainData352 = strainList352[strainIndex352];
              if (strainIndex352 > opt_data.experiment.phenotypes[phenotypeData300].start_index_male && strainIndex352 <= opt_data.experiment.phenotypes[phenotypeData300].start_index_male + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData352, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData300].males_list.length - opt_data.experiment.phenotypes[phenotypeData300].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData300) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData300), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td>');
        }
        output.append('</tr>');
        var propertyList376 = opt_data.experiment.propertiesList;
        var propertyListLen376 = propertyList376.length;
        for (var propertyIndex376 = 0; propertyIndex376 < propertyListLen376; propertyIndex376++) {
          var propertyData376 = propertyList376[propertyIndex376];
          output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(propertyData376), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.female.properties[propertyData376].text), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.male.properties[propertyData376].text), '</td>');
          var phenotypeList384 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen384 = phenotypeList384.length;
          for (var phenotypeIndex384 = 0; phenotypeIndex384 < phenotypeListLen384; phenotypeIndex384++) {
            var phenotypeData384 = phenotypeList384[phenotypeIndex384];
            output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData384].properties[propertyData376].text), '</td>');
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
