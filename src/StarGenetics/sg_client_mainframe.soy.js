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
    output.append('<div class=\'sg_slider_widget_wrapper\'><table data-kind=\'strains\' data-widget="slider-table" class=\'sg_slider_table\'>');
    if (opt_data.strains.visualsVisible) {
      output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>Strain</td>');
      var strainList88 = opt_data.strains.list;
      var strainListLen88 = strainList88.length;
      for (var strainIndex88 = 0; strainIndex88 < strainListLen88; strainIndex88++) {
        var strainData88 = strainList88[strainIndex88];
        output.append('<td class=\'sg_strain_box sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData88['id']), '">');
        sg_client_mainframe.strain({strain: strainData88, visuals: true, kind: 'strains'}, output);
        output.append('</td>');
      }
      output.append('<td rowspan=\'', soy.$$escapeHtml(2 + (opt_data.strains.propertiesVisible ? opt_data.strains.propertiesList.length : 0)), '\' class=\'sg_place_holder sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
      sg_client_mainframe.strain_place_holder({kind: 'strains', visuals: opt_data.strains.visualsVisible}, output);
      output.append('</td></tr><tr><td  class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>Sex</td>');
      var strainList105 = opt_data.strains.list;
      var strainListLen105 = strainList105.length;
      for (var strainIndex105 = 0; strainIndex105 < strainListLen105; strainIndex105++) {
        var strainData105 = strainList105[strainIndex105];
        output.append('<td class=\'sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.sex_icon({sex: strainData105['sex']}, output);
        output.append('</td>');
      }
      output.append('</tr>');
    }
    if (opt_data.strains.propertiesVisible) {
      var propertyList114 = opt_data.strains.propertiesList;
      var propertyListLen114 = propertyList114.length;
      for (var propertyIndex114 = 0; propertyIndex114 < propertyListLen114; propertyIndex114++) {
        var propertyData114 = propertyList114[propertyIndex114];
        output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>', soy.$$escapeHtml(propertyData114), '</td>');
        var strainList118 = opt_data.strains.list;
        var strainListLen118 = strainList118.length;
        for (var strainIndex118 = 0; strainIndex118 < strainListLen118; strainIndex118++) {
          var strainData118 = strainList118[strainIndex118];
          output.append('<td data-id="', soy.$$escapeHtml(strainData118.id), '" class=\'sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>', soy.$$escapeHtml(strainData118.properties[propertyData114].text), '</td>');
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
  var experimentList174 = opt_data.experiments.list;
  var experimentListLen174 = experimentList174.length;
  for (var experimentIndex174 = 0; experimentIndex174 < experimentListLen174; experimentIndex174++) {
    var experimentData174 = experimentList174[experimentIndex174];
    if (experimentData174.id == opt_data.experiments.show_experiment) {
      sg_client_mainframe.one_experiment({experiment: experimentData174, index: experimentIndex174, compact_view: false, css_class: ''}, output);
    }
  }
  output.append('<div class=\'sg_experiment_history\'><div class=\'sg_title_box\'>Experiment Selector</div><div data-kind="history" data-widget="slider-table" class=\'sg_experiment_holder\'>');
  var experimentList184 = opt_data.experiments.list;
  var experimentListLen184 = experimentList184.length;
  for (var experimentIndex184 = 0; experimentIndex184 < experimentListLen184; experimentIndex184++) {
    var experimentData184 = experimentList184[experimentIndex184];
    sg_client_mainframe.one_experiment({experiment: experimentData184, index: experimentIndex184, compact_view: true, css_class: 'sg_mini_experiment_box ', selected: opt_data.experiments.show_experiment == experimentData184.id}, output);
  }
  output.append('</div><div data-kind="history" data-widget="slider" class=\'sg_slider\'><div data-kind="history" data-widget="slider-thumb" class=\'sg_slider_thumb\'>||</div></div></div><br>');
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
    output.append('<!-- expanded body --><div class=\'sg_slider_widget_wrapper\'><table data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-widget="slider-table" class=\'sg_slider_table\'><tr><th class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Name</th><th class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Parent F</th><th class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Parent M</th>');
    var phenotypeList246 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
    var phenotypeListLen246 = phenotypeList246.length;
    for (var phenotypeIndex246 = 0; phenotypeIndex246 < phenotypeListLen246; phenotypeIndex246++) {
      var phenotypeData246 = phenotypeList246[phenotypeIndex246];
      output.append('<th colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'><!-- ', soy.$$escapeHtml(phenotypeData246.short_description), ' --> Class ', soy.$$escapeHtml(phenotypeIndex246 + 1), '</th>');
    }
    output.append('</tr>');
    if (opt_data.experiment.visualsVisible) {
      output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Visual</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td>');
      var phenotypeList267 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen267 = phenotypeList267.length;
      for (var phenotypeIndex267 = 0; phenotypeIndex267 < phenotypeListLen267; phenotypeIndex267++) {
        var phenotypeData267 = phenotypeList267[phenotypeIndex267];
        output.append('<td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData267].top_female, count: opt_data.experiment.phenotypes[phenotypeData267].females, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData267].top_male, count: opt_data.experiment.phenotypes[phenotypeData267].males, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td>');
      }
      output.append('</tr><tr><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>Sex (M/F)</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.female_icon(null, output);
      output.append('</td><td rowspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>');
      sg_client_mainframe.male_icon(null, output);
      output.append('</td>');
      var phenotypeList287 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen287 = phenotypeList287.length;
      for (var phenotypeIndex287 = 0; phenotypeIndex287 < phenotypeListLen287; phenotypeIndex287++) {
        var phenotypeData287 = phenotypeList287[phenotypeIndex287];
        output.append('<td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.female_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData287].females), '</td><td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_right\'>    ');
        sg_client_mainframe.male_icon(null, output);
        output.append(' ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData287].males), '</td>');
      }
      output.append('</tr>');
      if (opt_data.experiment.propertiesVisible && ! opt_data.compact_view) {
        output.append('<tr>');
        var phenotypeList302 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen302 = phenotypeList302.length;
        for (var phenotypeIndex302 = 0; phenotypeIndex302 < phenotypeListLen302; phenotypeIndex302++) {
          var phenotypeData302 = phenotypeList302[phenotypeIndex302];
          output.append('<td class=\'sg_experiment_phenotype_detail_left\'>');
          if (opt_data.experiment.phenotypes[phenotypeData302].show_more_females) {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData302), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData302].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData302) + '" data-state="-">Previous?</button>' : '');
            var strainList318 = opt_data.experiment.phenotypes[phenotypeData302].females_list;
            var strainListLen318 = strainList318.length;
            for (var strainIndex318 = 0; strainIndex318 < strainListLen318; strainIndex318++) {
              var strainData318 = strainList318[strainIndex318];
              if (strainIndex318 > opt_data.experiment.phenotypes[phenotypeData302].start_index_female && strainIndex318 <= opt_data.experiment.phenotypes[phenotypeData302].start_index_female + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData318, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData302].females_list.length - opt_data.experiment.phenotypes[phenotypeData302].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData302) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData302), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td><td class=\'sg_experiment_phenotype_detail_right\'>');
          if (opt_data.experiment.phenotypes[phenotypeData302].show_more_males) {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData302), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData302].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData302) + '" data-state="-">Previous?</button>' : '');
            var strainList354 = opt_data.experiment.phenotypes[phenotypeData302].males_list;
            var strainListLen354 = strainList354.length;
            for (var strainIndex354 = 0; strainIndex354 < strainListLen354; strainIndex354++) {
              var strainData354 = strainList354[strainIndex354];
              if (strainIndex354 > opt_data.experiment.phenotypes[phenotypeData302].start_index_male && strainIndex354 <= opt_data.experiment.phenotypes[phenotypeData302].start_index_male + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData354, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData302].males_list.length - opt_data.experiment.phenotypes[phenotypeData302].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData302) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData302), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td>');
        }
        output.append('</tr>');
        var propertyList378 = opt_data.experiment.propertiesList;
        var propertyListLen378 = propertyList378.length;
        for (var propertyIndex378 = 0; propertyIndex378 < propertyListLen378; propertyIndex378++) {
          var propertyData378 = propertyList378[propertyIndex378];
          output.append('<tr><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(propertyData378), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.female.properties[propertyData378].text), '</td><td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.parent.male.properties[propertyData378].text), '</td>');
          var phenotypeList386 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen386 = phenotypeList386.length;
          for (var phenotypeIndex386 = 0; phenotypeIndex386 < phenotypeListLen386; phenotypeIndex386++) {
            var phenotypeData386 = phenotypeList386[phenotypeIndex386];
            output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData386].properties[propertyData378].text), '</td>');
          }
          output.append('</tr>');
        }
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
