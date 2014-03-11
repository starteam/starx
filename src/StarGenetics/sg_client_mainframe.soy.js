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
  if (opt_data.count != 0) {
    output.append('<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id="', soy.$$escapeHtml(opt_data.strain['id']), '"><div class=\'sg_strain_title\'>', soy.$$escapeHtml(opt_data.strain['name']), '</div>');
    if (opt_data.visuals) {
      output.append('<div class=\'sg_strain_visual\' title=\'Sex:', soy.$$escapeHtml(opt_data.strain['sex']), '\n');
      var propertyList42 = soy.$$getMapKeys(opt_data.strain.capitalized_properties);
      var propertyListLen42 = propertyList42.length;
      for (var propertyIndex42 = 0; propertyIndex42 < propertyListLen42; propertyIndex42++) {
        var propertyData42 = propertyList42[propertyIndex42];
        output.append(soy.$$escapeHtml(propertyData42), ':', soy.$$escapeHtml(opt_data.strain.capitalized_properties[propertyData42].text), '\n');
      }
      output.append('\'><canvas data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id=\'', soy.$$escapeHtml(opt_data.strain['id']), '\'></canvas></div>');
    }
    output.append('</div>');
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
  output.append('<div class=\'sg_strains_box\'><div class=\'sg_title_box\'>Strains', (opt_data.strains.expanded) ? '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'false\'>Collapse</button>' + ((opt_data.strains.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'true\'>Expand</button>', '</div>');
  if (opt_data.strains.expanded) {
    output.append('<div class=\'sg_slider_widget_wrapper\'><table data-kind=\'strains\' data-widget="slider-table" class=\'sg_slider_table\'>');
    if (opt_data.strains.visualsVisible) {
      output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>Strain</td>');
      var strainList97 = opt_data.strains.list;
      var strainListLen97 = strainList97.length;
      for (var strainIndex97 = 0; strainIndex97 < strainListLen97; strainIndex97++) {
        var strainData97 = strainList97[strainIndex97];
        output.append('<td class=\'sg_strain_box sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData97['id']), '">');
        sg_client_mainframe.strain({strain: strainData97, visuals: true, kind: 'strains'}, output);
        output.append('</td>');
      }
      output.append('<td rowspan=\'', soy.$$escapeHtml(2 + (opt_data.strains.propertiesVisible ? opt_data.strains.propertiesList.length : 0)), '\' class=\'sg_place_holder sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
      sg_client_mainframe.strain_place_holder({kind: 'strains', visuals: opt_data.strains.visualsVisible}, output);
      output.append('</td></tr><tr><td  class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>Sex</td>');
      var strainList114 = opt_data.strains.list;
      var strainListLen114 = strainList114.length;
      for (var strainIndex114 = 0; strainIndex114 < strainListLen114; strainIndex114++) {
        var strainData114 = strainList114[strainIndex114];
        output.append('<td class=\'sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.sex_icon({sex: strainData114['sex']}, output);
        output.append('</td>');
      }
      output.append('</tr>');
    }
    if (opt_data.strains.propertiesVisible) {
      var propertyList123 = opt_data.strains.propertiesList;
      var propertyListLen123 = propertyList123.length;
      for (var propertyIndex123 = 0; propertyIndex123 < propertyListLen123; propertyIndex123++) {
        var propertyData123 = propertyList123[propertyIndex123];
        output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>', soy.$$escapeHtml(propertyData123), '</td>');
        var strainList127 = opt_data.strains.list;
        var strainListLen127 = strainList127.length;
        for (var strainIndex127 = 0; strainIndex127 < strainListLen127; strainIndex127++) {
          var strainData127 = strainList127[strainIndex127];
          output.append('<td data-id="', soy.$$escapeHtml(strainData127.id), '" class=\'sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>', soy.$$escapeHtml(strainData127.properties[propertyData123].text), '</td>');
        }
        output.append('</tr>');
      }
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
  var experimentList183 = opt_data.experiments.list;
  var experimentListLen183 = experimentList183.length;
  for (var experimentIndex183 = 0; experimentIndex183 < experimentListLen183; experimentIndex183++) {
    var experimentData183 = experimentList183[experimentIndex183];
    if (experimentData183.id == opt_data.experiments.show_experiment) {
      sg_client_mainframe.one_experiment({experiment: experimentData183, index: experimentIndex183, compact_view: false, css_class: ''}, output);
    }
  }
  output.append('<div class=\'sg_experiment_history\'><div class=\'sg_title_box\'>Experiment Selector</div><div class=\'sg_slider_widget_wrapper\'><div data-kind="history" data-widget="slider-table" class=\'sg_experiment_holder\'>');
  var experimentList193 = opt_data.experiments.list;
  var experimentListLen193 = experimentList193.length;
  for (var experimentIndex193 = 0; experimentIndex193 < experimentListLen193; experimentIndex193++) {
    var experimentData193 = experimentList193[experimentIndex193];
    if (! experimentData193.discarded) {
      sg_client_mainframe.one_experiment({experiment: experimentData193, index: experimentIndex193, compact_view: true, css_class: 'sg_mini_experiment_box ', selected: opt_data.experiments.show_experiment == experimentData193.id}, output);
    }
  }
  output.append('</div></div></div></div><br>');
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
    var phenotypeList263 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
    var phenotypeListLen263 = phenotypeList263.length;
    for (var phenotypeIndex263 = 0; phenotypeIndex263 < phenotypeListLen263; phenotypeIndex263++) {
      var phenotypeData263 = phenotypeList263[phenotypeIndex263];
      output.append('<th colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'><!-- ', soy.$$escapeHtml(phenotypeData263.short_description), ' --> Class ', soy.$$escapeHtml(phenotypeIndex263 + 1), '</th>');
    }
    output.append('</tr>');
    if (opt_data.experiment.visualsVisible) {
      output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Visual</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td>');
      var phenotypeList284 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen284 = phenotypeList284.length;
      for (var phenotypeIndex284 = 0; phenotypeIndex284 < phenotypeListLen284; phenotypeIndex284++) {
        var phenotypeData284 = phenotypeList284[phenotypeIndex284];
        output.append('<td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData284].top_female, count: opt_data.experiment.phenotypes[phenotypeData284].females, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData284].top_male, count: opt_data.experiment.phenotypes[phenotypeData284].males, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td>');
      }
      output.append('</tr><tr><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Sex (M/F)</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.female_icon(null, output);
      output.append('</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.male_icon(null, output);
      output.append('</td>');
      var phenotypeList304 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen304 = phenotypeList304.length;
      for (var phenotypeIndex304 = 0; phenotypeIndex304 < phenotypeListLen304; phenotypeIndex304++) {
        var phenotypeData304 = phenotypeList304[phenotypeIndex304];
        output.append('<td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.female_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData304].females), '</td><td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_right\'>    ');
        sg_client_mainframe.male_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData304].males), '</td>');
      }
      output.append('</tr>');
      if (opt_data.experiment.propertiesVisible && ! opt_data.compact_view) {
        output.append('<tr>');
        var phenotypeList319 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen319 = phenotypeList319.length;
        for (var phenotypeIndex319 = 0; phenotypeIndex319 < phenotypeListLen319; phenotypeIndex319++) {
          var phenotypeData319 = phenotypeList319[phenotypeIndex319];
          output.append('<td class=\'sg_experiment_phenotype_detail_left\'>');
          if (opt_data.experiment.phenotypes[phenotypeData319].show_more_females) {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData319), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData319].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData319) + '" data-state="-">Previous?</button>' : '');
            var strainList335 = opt_data.experiment.phenotypes[phenotypeData319].females_list;
            var strainListLen335 = strainList335.length;
            for (var strainIndex335 = 0; strainIndex335 < strainListLen335; strainIndex335++) {
              var strainData335 = strainList335[strainIndex335];
              if (strainIndex335 > opt_data.experiment.phenotypes[phenotypeData319].start_index_female && strainIndex335 <= opt_data.experiment.phenotypes[phenotypeData319].start_index_female + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData335, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData319].females_list.length - opt_data.experiment.phenotypes[phenotypeData319].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData319) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData319), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td><td class=\'sg_experiment_phenotype_detail_right\'>');
          if (opt_data.experiment.phenotypes[phenotypeData319].show_more_males) {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData319), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData319].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData319) + '" data-state="-">Previous?</button>' : '');
            var strainList371 = opt_data.experiment.phenotypes[phenotypeData319].males_list;
            var strainListLen371 = strainList371.length;
            for (var strainIndex371 = 0; strainIndex371 < strainListLen371; strainIndex371++) {
              var strainData371 = strainList371[strainIndex371];
              if (strainIndex371 > opt_data.experiment.phenotypes[phenotypeData319].start_index_male && strainIndex371 <= opt_data.experiment.phenotypes[phenotypeData319].start_index_male + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData371, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData319].males_list.length - opt_data.experiment.phenotypes[phenotypeData319].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData319) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData319), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td>');
        }
        output.append('</tr>');
        var propertyList395 = opt_data.experiment.propertiesList;
        var propertyListLen395 = propertyList395.length;
        for (var propertyIndex395 = 0; propertyIndex395 < propertyListLen395; propertyIndex395++) {
          var propertyData395 = propertyList395[propertyIndex395];
          output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(propertyData395), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.female.properties[propertyData395].text), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.male.properties[propertyData395].text), '</td>');
          var phenotypeList403 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen403 = phenotypeList403.length;
          for (var phenotypeIndex403 = 0; phenotypeIndex403 < phenotypeListLen403; phenotypeIndex403++) {
            var phenotypeData403 = phenotypeList403[phenotypeIndex403];
            output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData403].properties[propertyData395].text), '</td>');
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
