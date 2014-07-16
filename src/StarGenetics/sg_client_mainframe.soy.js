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
  output.append('<div class=\'sg_workspace\'><span class=\'sg_exercise_title\'>');
  sg_client_mainframe.sg_logo(null, output);
  output.append(' ', (opt_data.model.backend.ui && opt_data.model.backend.ui.title) ? soy.$$escapeHtml(opt_data.model.backend.ui.title) : '', '</span>');
  sg_client_mainframe.strains({strains: opt_data.model.ui.strains, add_strain: opt_data.model.ui.experiments.list.length != 0}, output);
  sg_client_mainframe.new_experiment({experiment: opt_data.model.ui.new_experiment, progenies_count: opt_data.model.backend.genetics.engine.avg_offspring_count}, output);
  sg_client_mainframe.all_experiments({experiments: opt_data.model.ui.experiments, feature_flag: opt_data.model['_feature_flag_']}, output);
  output.append('<br><button class=\'sg_workapace_button sg_workspace_save\'>Save</button><button class=\'sg_workapace_button sg_workspace_load\'>Load</button><button class=\'sg_workapace_button  sg_workspace_reset\'>Reset</button></div>');
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
  output.append('<button class=\'sg_workapace_button sg_workspace_save\'>Save</button><button class=\'sg_workapace_button sg_workspace_load\'>Load</button><button class=\'sg_workapace_button  sg_workspace_reset\'>Reset</button>');
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
    output.append('<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id="', soy.$$escapeHtml(opt_data.strain['id']), '" data-name="', soy.$$escapeHtml(opt_data.strain['name']), '" ', (opt_data.testid) ? 'data-test-id="' + soy.$$escapeHtml(opt_data.testid) + '"' : '', '>');
    if (opt_data.visuals) {
      output.append('<div class=\'sg_strain_visual\' title=\'Sex:', soy.$$escapeHtml(opt_data.strain['sex']), '\n');
      var propertyList57 = soy.$$getMapKeys(opt_data.strain.capitalized_properties);
      var propertyListLen57 = propertyList57.length;
      for (var propertyIndex57 = 0; propertyIndex57 < propertyListLen57; propertyIndex57++) {
        var propertyData57 = propertyList57[propertyIndex57];
        output.append(soy.$$escapeHtml(propertyData57), ':', soy.$$escapeHtml(opt_data.strain.capitalized_properties[propertyData57].text), '\n');
      }
      output.append('\'><canvas data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id=\'', soy.$$escapeHtml(opt_data.strain['id']), '\' class=\'sg_strain_visual_canvas\'></canvas><div class=\'sg_strain_visual_canvas_sex\'>');
      if (opt_data.strain['sex'] == 'FEMALE') {
        sg_client_mainframe.female_icon(null, output);
      } else {
        sg_client_mainframe.male_icon(null, output);
      }
      output.append('</div></div>');
    }
    output.append('</div><div class=\'sg_strain_title\'>', (opt_data.name) ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.strain['name']), (opt_data.percentage) ? ' <small>(' + soy.$$escapeHtml(Math.round(opt_data.percentage * 100)) + '%)</small>' : '', '</div>');
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
  output.append('<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id="', soy.$$escapeHtml(opt_data.strain['id']), '"><div class=\'sg_strain_title\'>', soy.$$escapeHtml(opt_data.strain['name']), ' </div></div>');
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
  output.append('<div class=\'sg_strains_box\'><div class=\'sg_slider_widget_wrapper\'><table data-kind=\'strains\' data-widget="slider-table" class=\'sg_slider_table\'><tr><td class=\'sg_s_col_head\'><span class=\'sg_bold_heading\'>Strain Stocks</span></td>');
  var strainList102 = opt_data.strains.currpage;
  var strainListLen102 = strainList102.length;
  for (var strainIndex102 = 0; strainIndex102 < strainListLen102; strainIndex102++) {
    var strainData102 = strainList102[strainIndex102];
    output.append('<td class=\' ', (! (strainIndex102 == strainListLen102 - 1)) ? 'sg_experiment_phenotype_detail_right' : '', ' ', (! (strainIndex102 == 0)) ? 'sg_experiment_phenotype_detail_left' : '', '  sg_strains_p_visual \' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData102['id']), '">');
    sg_client_mainframe.strain({strain: strainData102, visuals: true, kind: 'strains'}, output);
    output.append('</td>');
  }
  if (opt_data.add_strain) {
    output.append('<td rowspan=\'1\' class=\'sg_place_holder\'>');
    sg_client_mainframe.strain_place_holder({kind: 'strains', visuals: opt_data.strains.visualsVisible}, output);
    output.append('</td>');
  }
  output.append('</tr><tr><td><!-- title --></td><td colspan=\'', soy.$$escapeHtml(opt_data.strains.page_size + 1), '\'><div class=\'sg_page_button_holder\'>');
  var pageList130 = opt_data.strains.pages;
  var pageListLen130 = pageList130.length;
  for (var pageIndex130 = 0; pageIndex130 < pageListLen130; pageIndex130++) {
    var pageData130 = pageList130[pageIndex130];
    output.append('<div class=\'sg_page_button ', (pageData130.selected) ? 'sg_page_button_selected' : '', '\' data-kind=\'strains\' data-from="', soy.$$escapeHtml(pageData130.index), '">', soy.$$escapeHtml(pageData130.page), '</div>');
  }
  output.append('</div></td></tr>');
  if (opt_data.strains.propertiesVisible) {
    output.append('<tr><td class=\'sg_s_col_head \' ><b>Phenotypes</b> &nbsp; <button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'false\'>Hide</button></td>');
    var strainList145 = opt_data.strains.list;
    var strainListLen145 = strainList145.length;
    for (var strainIndex145 = 0; strainIndex145 < strainListLen145; strainIndex145++) {
      var strainData145 = strainList145[strainIndex145];
      output.append('<td class=\'', (! (strainIndex145 == strainListLen145 - 1)) ? 'sg_experiment_phenotype_detail_right' : '', ' ', (! (strainIndex145 == 0)) ? 'sg_experiment_phenotype_detail_left' : '', '\'></td>');
    }
    output.append('</tr><tr><td class=\'sg_s_col_head \'>Sex</td>');
    var strainList157 = opt_data.strains.list;
    var strainListLen157 = strainList157.length;
    for (var strainIndex157 = 0; strainIndex157 < strainListLen157; strainIndex157++) {
      var strainData157 = strainList157[strainIndex157];
      output.append('<td data-id="', soy.$$escapeHtml(strainData157.id), '" class=\'', (! (strainIndex157 == strainListLen157 - 1)) ? 'sg_experiment_phenotype_detail_right' : '', ' ', (! (strainIndex157 == 0)) ? 'sg_experiment_phenotype_detail_left' : '', '\'>', (strainData157['sex'] == 'FEMALE') ? 'Female' : '', (strainData157['sex'] == 'MALE') ? 'Male' : '', '</td>');
    }
    output.append('</tr>');
    var propertyList178 = soy.$$getMapKeys(opt_data.strains.capitalized_properties);
    var propertyListLen178 = propertyList178.length;
    for (var propertyIndex178 = 0; propertyIndex178 < propertyListLen178; propertyIndex178++) {
      var propertyData178 = propertyList178[propertyIndex178];
      output.append('<tr><td class=\'sg_s_col_head \'>', soy.$$escapeHtml(opt_data.strains.capitalized_properties[propertyData178]), '</td>');
      var strainList182 = opt_data.strains.list;
      var strainListLen182 = strainList182.length;
      for (var strainIndex182 = 0; strainIndex182 < strainListLen182; strainIndex182++) {
        var strainData182 = strainList182[strainIndex182];
        output.append('<td data-id="', soy.$$escapeHtml(strainData182.id), '" class=\'', (! (strainIndex182 == strainListLen182 - 1)) ? 'sg_experiment_phenotype_detail_right' : '', ' ', (! (strainIndex182 == 0)) ? 'sg_experiment_phenotype_detail_left' : '', '\'>', soy.$$escapeHtml(strainData182.capitalized_properties[opt_data.strains.capitalized_properties[propertyData178]].text), '</td>');
      }
      output.append('</tr>');
    }
    output.append((opt_data.add_strain) ? '<td rowspan=\'1\' class=\'sg_place_holder sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_left\'></td>' : '');
  } else {
    output.append('<tr><td class=\'sg_s_col_head  \'><b>Phenotypes</b> &nbsp; <button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'true\'>Show</button></td><td class=\'\' colspan=\'', soy.$$escapeHtml(opt_data.strains.list.length), '\'></td></tr>');
  }
  output.append('<tr></table><div class=\'sg_bottom_border\'></div></div></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.new_experiment_parent_text = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'sg_experiment_parent_text\'>Drag & Drop a Specimen to create a pair to mate</span>');
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
  output.append('<div class=\'sg_new_experiment_box\'>');
  if (opt_data.experiment.expanded) {
    output.append('<div class=\'sg_left_heading sg_bold_heading\'>Mating Site</div><div class=\'sg_experiment_parents_wrapper\'><div class=\'sg_experiment_parents\'>');
    if (opt_data.experiment.parents.length < 1) {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-empty=\'true\' title="Drag a strain from the Strains box or from a previously performed experiment here"><span class=\'sg_experiment_parent_text\'>Drag & Drop a Specimen to create a pair to mate</span></div>');
    } else {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[0].id), '\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parents[0], visuals: opt_data.experiment.visualsVisible, kind: 'new_experiment'}, output);
      output.append('<button class=\'sg_experiment_parent_remove\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[0].id), '\' data-kind=\'new_experiment\' title="Remove Parent"><span class=\'sg_experiment_parent_remove_text\'>x</span></button></div>');
    }
    output.append('<div class=\'sg_experiment_parent_x\'>X</div>');
    if (opt_data.experiment.parents.length < 2) {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-empty=\'true\' title="Drag a strain from the Strains box or from a previously performed experiment here"><span class=\'sg_experiment_parent_text\'>Drag & Drop a Specimen to create a pair to mate</span></div>');
    } else {
      output.append('<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[1].id), '\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parents[1], visuals: opt_data.experiment.visualsVisible, kind: 'new_experiment'}, output);
      output.append('<button class=\'sg_experiment_parent_remove\' data-id=\'', soy.$$escapeHtml(opt_data.experiment.parents[1].id), '\' data-kind=\'new_experiment\' title="Remove Parent"><span class=\'sg_experiment_parent_remove_text\'>x</span></button></div>');
    }
    output.append('</div>', (opt_data.experiment.canmate) ? '<div class=\'sg_experiment_parents_can_mate\'><div class=\'sg_experiment_parents_can_mate_info\'>How many progeny would you like to produce? (Between 1 and 500)</div><div class=\'sg_experiment_parents_can_mate_input\'><input type=\'text\' class=\'sg_new_experiment_mate_count\' value=\'' + ((opt_data.prg_count) ? soy.$$escapeHtml(opt_data.prg_count) : '50') + '\'><button class=\'sg_new_experiment_mate sg_s_new_experiment_mate_large\' data-kind=\'new_experiment\'>Mate</button></div></div>' : '', '</div>');
  }
  output.append('</div><div class=\'sg_bottom_border\'></div>');
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
    output.append('<div class=\'sg_new_experiment_box\'><div class=\'sg_title_box\'>Mating Site</div><button class=\'sg_s_expand_mating_site sg_expand\' data-kind=\'new_experiment\'  data-expanded=\'true\'>Setup a new mating</button></div>');
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
  var experimentList268 = opt_data.experiments.list;
  var experimentListLen268 = experimentList268.length;
  for (var experimentIndex268 = 0; experimentIndex268 < experimentListLen268; experimentIndex268++) {
    var experimentData268 = experimentList268[experimentIndex268];
    if (experimentData268.id == opt_data.experiments.show_experiment) {
      if (opt_data.feature_flag && opt_data.feature_flag.layout == 'horizontal') {
        sg_client_mainframe.one_experiment_horizontal({experiment: experimentData268, index: experimentIndex268, compact_view: false, css_class: ''}, output);
      } else {
        sg_client_mainframe.one_experiment({experiment: experimentData268, index: experimentIndex268, compact_view: false, css_class: ''}, output);
      }
      output.append('<div class=\'sg_bottom_border\'></div>');
    }
  }
  if (opt_data.experiments.list.length != 0) {
    output.append('<div class=\'sg_experiment_history\'><div class=\'sg_title_box\'>All Experiments</div><div class=\'sg_slider_widget_wrapper\'><div data-kind="history" data-widget="slider-table" class=\'sg_experiment_holder\'>');
    var experimentList289 = opt_data.experiments.list;
    var experimentListLen289 = experimentList289.length;
    for (var experimentIndex289 = 0; experimentIndex289 < experimentListLen289; experimentIndex289++) {
      var experimentData289 = experimentList289[experimentIndex289];
      if (! experimentData289.discarded) {
        sg_client_mainframe.compact_experiment({experiment: experimentData289, index: experimentIndex289, compact_view: true, css_class: 'sg_mini_experiment_box ', selected: opt_data.experiments.show_experiment == experimentData289.id}, output);
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
sg_client_mainframe.compact_experiment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_experiment_box ', soy.$$escapeHtml(opt_data.css_class), ' ', (opt_data.selected) ? 'sg_experiment_selected' : '', '\'>', (opt_data.compact_view) ? '<div data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' class=\'sg_experiment_box_floaty\'></div>' : '', '<!-- header --><div class=\'sg_title_box\'>', (opt_data.compact_view) ? soy.$$escapeHtml(opt_data.experiment.name) : 'Current experiment: <em class=\'sg_rename sg_s_rename\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '"> ' + soy.$$escapeHtml(opt_data.experiment.name) + '</em>' + ((opt_data.experiment.canclearparents) ? '<button class=\'sg_discard sg_s_discard\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">X</button>' : '') + ((opt_data.experiment.canmate) ? '' : ''), '</div>');
  if (opt_data.experiment.expanded) {
    output.append('<!-- expanded body -->', (! opt_data.compact_view) ? '<div class=\'sg_slider_widget_wrapper\'>' : '', '<table data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-widget="slider-table" class=\'sg_slider_table\'>');
    if (! opt_data.compact_view) {
      output.append('<tr><th class=\'sg_experiment_phenotype_detail_header sg_experiment_phenotype_detail_right\'><!--Name--></th><th colspan=\'3\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_parent_f sg_experiment_phenotype_detail_align_top\'><button class=\'sg_experiment_mate sg_s_experiment_mate\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '">+ More progeny</button></th><th class=\'\'><!-- => --></th>');
      var phenotypeList346 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen346 = phenotypeList346.length;
      for (var phenotypeIndex346 = 0; phenotypeIndex346 < phenotypeListLen346; phenotypeIndex346++) {
        var phenotypeData346 = phenotypeList346[phenotypeIndex346];
        output.append('<th colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'><!-- ', soy.$$escapeHtml(phenotypeData346.short_description), ' --> Class ', soy.$$escapeHtml(phenotypeIndex346 + 1), '</th>');
      }
      output.append('</tr>');
    }
    if (opt_data.experiment.visualsVisible) {
      output.append('<tr><td class=\' sg_experiment_phenotype_detail_right\'></td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left sg_s_experiment_parent_table_1\'><div class=\'sg_s_experiment_parent_table\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</div></td><td class=\'sg_s_experiment_parent_table_x\'><div class=\'sg_experiment_parent_x\'>X</div></td><td class=\'sg_experiment_p_visual sg_s_experiment_parent_table_2\'><div class=\'sg_s_experiment_parent_table\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</div></td><td><div class=\'sg_s_experiment_parent_to_floaty\'>=></div></td>');
      var phenotypeList367 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen367 = phenotypeList367.length;
      for (var phenotypeIndex367 = 0; phenotypeIndex367 < phenotypeListLen367; phenotypeIndex367++) {
        var phenotypeData367 = phenotypeList367[phenotypeIndex367];
        output.append('<td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData367].top_female, count: opt_data.experiment.phenotypes[phenotypeData367].females, percentage: opt_data.experiment.phenotypes[phenotypeData367].females / opt_data.experiment.list.length, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id, name: opt_data.experiment.phenotypes[phenotypeData367].females}, output);
        output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData367].top_male, count: opt_data.experiment.phenotypes[phenotypeData367].males, percentage: opt_data.experiment.phenotypes[phenotypeData367].males / opt_data.experiment.list.length, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id, name: opt_data.experiment.phenotypes[phenotypeData367].males}, output);
        output.append('</td>');
      }
      output.append('</tr>');
      if (! opt_data.compact_view) {
        if (opt_data.experiment.propertiesVisible) {
          output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_align_top\' ><b>Phenotypes</b></td><td colspan=\'3\' class=\'sg_experiment_phenotype_detail_align_top\'>&nbsp; <button class=\'sg_strain_expand_properties\' data-kind=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' data-expanded-properties=\'false\'>Hide</button>&nbsp; &nbsp;</td><td><!-- => --></td>');
          var phenotypeList394 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen394 = phenotypeList394.length;
          for (var phenotypeIndex394 = 0; phenotypeIndex394 < phenotypeListLen394; phenotypeIndex394++) {
            var phenotypeData394 = phenotypeList394[phenotypeIndex394];
            output.append('<td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_align_top\'>');
            if (opt_data.experiment.phenotypes[phenotypeData394].show_more_females) {
              output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData394), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData394].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData394) + '" data-state="-">Previous</button>' : '');
              var strainList410 = opt_data.experiment.phenotypes[phenotypeData394].females_list;
              var strainListLen410 = strainList410.length;
              for (var strainIndex410 = 0; strainIndex410 < strainListLen410; strainIndex410++) {
                var strainData410 = strainList410[strainIndex410];
                if (strainIndex410 >= opt_data.experiment.phenotypes[phenotypeData394].start_index_female && strainIndex410 <= opt_data.experiment.phenotypes[phenotypeData394].start_index_female + 5) {
                  output.append('<br>');
                  sg_client_mainframe.strain_short({strain: strainData410, kind: opt_data.experiment.id}, output);
                }
              }
              output.append((opt_data.experiment.phenotypes[phenotypeData394].females_list.length - opt_data.experiment.phenotypes[phenotypeData394].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData394) + '" data-state="+">Next</button>' : '');
            } else {
              output.append((opt_data.experiment.phenotypes[phenotypeData394].females_list.length > 0) ? '<button class=\'sg_expand_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData394) + '" data-state="true">Show Individuals</button>' : '');
            }
            output.append('</td><td class=\'sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_align_top\'>');
            if (opt_data.experiment.phenotypes[phenotypeData394].show_more_males) {
              output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData394), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData394].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData394) + '" data-state="-">Previous</button>' : '');
              var strainList448 = opt_data.experiment.phenotypes[phenotypeData394].males_list;
              var strainListLen448 = strainList448.length;
              for (var strainIndex448 = 0; strainIndex448 < strainListLen448; strainIndex448++) {
                var strainData448 = strainList448[strainIndex448];
                if (strainIndex448 >= opt_data.experiment.phenotypes[phenotypeData394].start_index_male && strainIndex448 <= opt_data.experiment.phenotypes[phenotypeData394].start_index_male + 5) {
                  output.append('<br>');
                  sg_client_mainframe.strain_short({strain: strainData448, kind: opt_data.experiment.id}, output);
                }
              }
              output.append((opt_data.experiment.phenotypes[phenotypeData394].males_list.length - opt_data.experiment.phenotypes[phenotypeData394].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData394) + '" data-state="+">Next</button>' : '');
            } else {
              output.append((opt_data.experiment.phenotypes[phenotypeData394].males_list.length > 0) ? '<button class=\'sg_expand_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData394) + '" data-state="true">Show Individuals</button>&nbsp;' : '');
            }
            output.append('</td>');
          }
          output.append('</tr>');
        } else {
          output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right \'><b>Phenotypes</b></td><td colspan=\'3\'><button class=\'sg_strain_expand_properties\' data-kind=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' data-expanded-properties=\'true\'>Show</button>&nbsp; &nbsp;</td><td><!-- => --></td>');
          var phenotypeList478 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen478 = phenotypeList478.length;
          for (var phenotypeIndex478 = 0; phenotypeIndex478 < phenotypeListLen478; phenotypeIndex478++) {
            var phenotypeData478 = phenotypeList478[phenotypeIndex478];
            output.append('<td class=\'sg_experiment_phenotype_detail_left\'>');
            if (opt_data.experiment.phenotypes[phenotypeData478].show_more_females) {
              output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData478), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData478].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData478) + '" data-state="-">Previous?</button>' : '');
              var strainList494 = opt_data.experiment.phenotypes[phenotypeData478].females_list;
              var strainListLen494 = strainList494.length;
              for (var strainIndex494 = 0; strainIndex494 < strainListLen494; strainIndex494++) {
                var strainData494 = strainList494[strainIndex494];
                if (strainIndex494 >= opt_data.experiment.phenotypes[phenotypeData478].start_index_female && strainIndex494 <= opt_data.experiment.phenotypes[phenotypeData478].start_index_female + 5) {
                  output.append('<br>');
                  sg_client_mainframe.strain_short({strain: strainData494, kind: opt_data.experiment.id}, output);
                }
              }
              output.append((opt_data.experiment.phenotypes[phenotypeData478].females_list.length - opt_data.experiment.phenotypes[phenotypeData478].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData478) + '" data-state="+">Next?</button>' : '');
            } else {
              output.append((opt_data.experiment.phenotypes[phenotypeData478].females_list.length > 0) ? '<button class=\'sg_expand_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData478) + '" data-state="true">Show Individuals</button>' : '');
            }
            output.append('</td><td class=\'sg_experiment_phenotype_detail_right\'>');
            if (opt_data.experiment.phenotypes[phenotypeData478].show_more_males) {
              output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData478), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData478].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData478) + '" data-state="-">Previous?</button>' : '');
              var strainList532 = opt_data.experiment.phenotypes[phenotypeData478].males_list;
              var strainListLen532 = strainList532.length;
              for (var strainIndex532 = 0; strainIndex532 < strainListLen532; strainIndex532++) {
                var strainData532 = strainList532[strainIndex532];
                if (strainIndex532 >= opt_data.experiment.phenotypes[phenotypeData478].start_index_male && strainIndex532 <= opt_data.experiment.phenotypes[phenotypeData478].start_index_male + 5) {
                  output.append('<br>');
                  sg_client_mainframe.strain_short({strain: strainData532, kind: opt_data.experiment.id}, output);
                }
              }
              output.append((opt_data.experiment.phenotypes[phenotypeData478].males_list.length - opt_data.experiment.phenotypes[phenotypeData478].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData478) + '" data-state="+">Next?</button>' : '');
            } else {
              output.append((opt_data.experiment.phenotypes[phenotypeData478].males_list.length > 0) ? '<button class=\'sg_expand_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData478) + '" data-state="true">Show Individuals</button>' : '');
            }
            output.append('</td>');
          }
          output.append('</tr>');
        }
      }
      if (opt_data.experiment.propertiesVisible && ! opt_data.compact_view) {
        output.append('<tr><td rowspan=\'1\' class=\' sg_experiment_phenotype_detail_right\'>Sex </td><td rowspan=\'1\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_parent_f\'>Female</td><td rowspan=\'1\' class=\'\'><!-- x --></td><td rowspan=\'1\' class=\'sg_experiment_phenotype_detail_parent_m \'>Male</td><td rowspan=\'1\' class=\'\'></td>');
        var phenotypeList561 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen561 = phenotypeList561.length;
        for (var phenotypeIndex561 = 0; phenotypeIndex561 < phenotypeListLen561; phenotypeIndex561++) {
          var phenotypeData561 = phenotypeList561[phenotypeIndex561];
          output.append('<td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_left\'>', (opt_data.experiment.phenotypes[phenotypeData561].females_list.length > 0) ? 'Female' : '', '</td><td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_right\'>', (opt_data.experiment.phenotypes[phenotypeData561].males_list.length > 0) ? 'Male' : '', '</td>');
        }
        output.append('</tr>');
        var propertyList573 = opt_data.experiment.propertiesList;
        var propertyListLen573 = propertyList573.length;
        for (var propertyIndex573 = 0; propertyIndex573 < propertyListLen573; propertyIndex573++) {
          var propertyData573 = propertyList573[propertyIndex573];
          output.append('<tr><td class=\'  \'>', soy.$$escapeHtml(opt_data.experiment.capitalized_properties[propertyData573]), '</td><td class=\' sg_experiment_phenotype_detail_parent_f\'>', soy.$$escapeHtml(opt_data.experiment.parent.female.properties[propertyData573].text), '</td><td rowspan=\'1\' class=\'\'><!-- x --></td><td class=\'sg_experiment_phenotype_detail_parent_m\'>', soy.$$escapeHtml(opt_data.experiment.parent.male.properties[propertyData573].text), '</td><td><!-- => --></td>');
          var phenotypeList581 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen581 = phenotypeList581.length;
          for (var phenotypeIndex581 = 0; phenotypeIndex581 < phenotypeListLen581; phenotypeIndex581++) {
            var phenotypeData581 = phenotypeList581[phenotypeIndex581];
            output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_double\'>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData581].properties[propertyData573].text), '</td>');
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
sg_client_mainframe.one_experiment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_experiment_box ', soy.$$escapeHtml(opt_data.css_class), ' ', (opt_data.selected) ? 'sg_experiment_selected' : '', '\'><!-- header --><div class=\'sg_title_box\'>', (opt_data.experiment.canclearparents) ? '<button class=\'sg_discard sg_s_discard\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">X</button>' : '', '</div>');
  sg_client_mainframe.sg_current_experiment_name(opt_data, output);
  if (opt_data.experiment.expanded) {
    output.append('<div class=\'sg_slider_widget_wrapper\'><table data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-widget="slider-table" class=\'sg_slider_table\'><tr></tr>');
    if (opt_data.experiment.visualsVisible) {
      output.append('<tr><td class=\' \'>Strain</td><td class=\'sg_experiment_p_visual sg_s_experiment_parent_table_1\'><div class=\'sg_s_experiment_parent_table\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</div></td><td class=\'sg_s_experiment_parent_table_x\'><div class=\'sg_experiment_parent_x\'>X</div></td><td class=\'sg_experiment_p_visual sg_s_experiment_parent_table_2\'><div class=\'sg_s_experiment_parent_table\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</div></td></tr>', (opt_data.experiment.propertiesVisible) ? '<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_align_top\' ><b>Phenotypes</b>&nbsp; <button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'false\'>Hide</button>&nbsp; &nbsp;</td><td colspan=\'3\' class=\'sg_experiment_phenotype_detail_align_top\'></td></tr>' : '<tr><td class=\'sg_s_col_head \'><b>Phenotypes</b><button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'true\'>Show</button>&nbsp; &nbsp;</td><td><!-- => --></td></tr>');
      if (opt_data.experiment.propertiesVisible) {
        output.append('<tr><td rowspan=\'1\' class=\' \'>Sex </td><td rowspan=\'1\' class=\' sg_experiment_phenotype_detail_parent_f\'>Female</td><td rowspan=\'1\' class=\'\'><!-- x --></td><td rowspan=\'1\' class=\'sg_experiment_phenotype_detail_parent_m \'>Male</td><td rowspan=\'1\' class=\'\'></td></tr>');
        var propertyList639 = opt_data.experiment.propertiesList;
        var propertyListLen639 = propertyList639.length;
        for (var propertyIndex639 = 0; propertyIndex639 < propertyListLen639; propertyIndex639++) {
          var propertyData639 = propertyList639[propertyIndex639];
          output.append('<tr><td class=\' \'>', soy.$$escapeHtml(opt_data.experiment.capitalized_properties[propertyData639]), '</td><td class=\' sg_experiment_phenotype_detail_parent_f\'>', soy.$$escapeHtml(opt_data.experiment.parent.female.properties[propertyData639].text), '</td><td rowspan=\'1\' class=\'\'><!-- x --></td><td class=\'sg_experiment_phenotype_detail_parent_m\'>', soy.$$escapeHtml(opt_data.experiment.parent.male.properties[propertyData639].text), '</td></tr>');
        }
      }
    }
    output.append('<tr><td class=\'sg_experiment_phenotype_detail_header \'><!--Name--></th><td colspan=\'3\' class=\'sg_experiment_phenotype_detail_parent_f sg_experiment_phenotype_detail_align_top\'><button class=\'sg_experiment_mate sg_s_experiment_mate\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '">+ More progeny</button></td></tr><tr><td class=\'sg_experiment_phenotype_detail_header \'><!--Name--></th><td colspan=\'3\' class=\'sg_s_arrow_down\'>&#8897;</td></tr></table></div><div class=\'sg_slider_widget_wrapper\'><table data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-widget="slider-table" class=\'sg_slider_table\'><tr><th class=\'sg_experiment_phenotype_detail_header sg_experiment_phenotype_detail_right\'><!--Name--></th>');
    var phenotypeList653 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
    var phenotypeListLen653 = phenotypeList653.length;
    for (var phenotypeIndex653 = 0; phenotypeIndex653 < phenotypeListLen653; phenotypeIndex653++) {
      var phenotypeData653 = phenotypeList653[phenotypeIndex653];
      output.append('<th colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'><!-- ', soy.$$escapeHtml(phenotypeData653.short_description), ' --> Class ', soy.$$escapeHtml(phenotypeIndex653 + 1), '</th>');
    }
    output.append('</tr>');
    if (opt_data.experiment.visualsVisible) {
      output.append('<tr><td class=\' sg_experiment_phenotype_detail_right\'>Strain</td>');
      var phenotypeList664 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen664 = phenotypeList664.length;
      for (var phenotypeIndex664 = 0; phenotypeIndex664 < phenotypeListLen664; phenotypeIndex664++) {
        var phenotypeData664 = phenotypeList664[phenotypeIndex664];
        output.append('<td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData664].top_female, count: opt_data.experiment.phenotypes[phenotypeData664].females, percentage: opt_data.experiment.phenotypes[phenotypeData664].females / opt_data.experiment.list.length, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id, name: opt_data.experiment.phenotypes[phenotypeData664].females}, output);
        output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData664].top_male, count: opt_data.experiment.phenotypes[phenotypeData664].males, percentage: opt_data.experiment.phenotypes[phenotypeData664].males / opt_data.experiment.list.length, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id, name: opt_data.experiment.phenotypes[phenotypeData664].males}, output);
        output.append('</td>');
      }
      output.append('</tr>');
      if (opt_data.experiment.propertiesVisible) {
        output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_align_top\' ><b>Phenotypes</b>&nbsp; <button class=\'sg_strain_expand_properties\' data-kind=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' data-expanded-properties=\'false\'>Hide</button>&nbsp; &nbsp;</td>');
        var phenotypeList689 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen689 = phenotypeList689.length;
        for (var phenotypeIndex689 = 0; phenotypeIndex689 < phenotypeListLen689; phenotypeIndex689++) {
          var phenotypeData689 = phenotypeList689[phenotypeIndex689];
          output.append('<td class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_align_top\'>');
          if (opt_data.experiment.phenotypes[phenotypeData689].show_more_females) {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData689), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData689].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData689) + '" data-state="-">Previous</button>' : '');
            var strainList705 = opt_data.experiment.phenotypes[phenotypeData689].females_list;
            var strainListLen705 = strainList705.length;
            for (var strainIndex705 = 0; strainIndex705 < strainListLen705; strainIndex705++) {
              var strainData705 = strainList705[strainIndex705];
              if (strainIndex705 >= opt_data.experiment.phenotypes[phenotypeData689].start_index_female && strainIndex705 <= opt_data.experiment.phenotypes[phenotypeData689].start_index_female + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData705, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData689].females_list.length - opt_data.experiment.phenotypes[phenotypeData689].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData689) + '" data-state="+">Next</button>' : '');
          } else {
            output.append((opt_data.experiment.phenotypes[phenotypeData689].females_list.length > 0) ? '<button class=\'sg_expand_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData689) + '" data-state="true">Show Individuals</button>' : '');
          }
          output.append('</td><td class=\'sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_align_top\'>');
          if (opt_data.experiment.phenotypes[phenotypeData689].show_more_males) {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData689), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData689].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData689) + '" data-state="-">Previous</button>' : '');
            var strainList743 = opt_data.experiment.phenotypes[phenotypeData689].males_list;
            var strainListLen743 = strainList743.length;
            for (var strainIndex743 = 0; strainIndex743 < strainListLen743; strainIndex743++) {
              var strainData743 = strainList743[strainIndex743];
              if (strainIndex743 >= opt_data.experiment.phenotypes[phenotypeData689].start_index_male && strainIndex743 <= opt_data.experiment.phenotypes[phenotypeData689].start_index_male + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData743, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData689].males_list.length - opt_data.experiment.phenotypes[phenotypeData689].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData689) + '" data-state="+">Next</button>' : '');
          } else {
            output.append((opt_data.experiment.phenotypes[phenotypeData689].males_list.length > 0) ? '<button class=\'sg_expand_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData689) + '" data-state="true">Show Individuals</button>&nbsp;' : '');
          }
          output.append('</td>');
        }
        output.append('</tr>');
      } else {
        output.append('<tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_right \'><b>Phenotypes</b><button class=\'sg_strain_expand_properties\' data-kind=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' data-expanded-properties=\'true\'>Show</button>&nbsp; &nbsp;</td>');
        var phenotypeList773 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen773 = phenotypeList773.length;
        for (var phenotypeIndex773 = 0; phenotypeIndex773 < phenotypeListLen773; phenotypeIndex773++) {
          var phenotypeData773 = phenotypeList773[phenotypeIndex773];
          output.append('<td class=\'sg_experiment_phenotype_detail_left\'>');
          if (opt_data.experiment.phenotypes[phenotypeData773].show_more_females) {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData773), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData773].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData773) + '" data-state="-">Previous?</button>' : '');
            var strainList789 = opt_data.experiment.phenotypes[phenotypeData773].females_list;
            var strainListLen789 = strainList789.length;
            for (var strainIndex789 = 0; strainIndex789 < strainListLen789; strainIndex789++) {
              var strainData789 = strainList789[strainIndex789];
              if (strainIndex789 >= opt_data.experiment.phenotypes[phenotypeData773].start_index_female && strainIndex789 <= opt_data.experiment.phenotypes[phenotypeData773].start_index_female + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData789, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData773].females_list.length - opt_data.experiment.phenotypes[phenotypeData773].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData773) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append((opt_data.experiment.phenotypes[phenotypeData773].females_list.length > 0) ? '<button class=\'sg_expand_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData773) + '" data-state="true">Show Individuals</button>' : '');
          }
          output.append('</td><td class=\'sg_experiment_phenotype_detail_right\'>');
          if (opt_data.experiment.phenotypes[phenotypeData773].show_more_males) {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData773), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData773].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData773) + '" data-state="-">Previous?</button>' : '');
            var strainList827 = opt_data.experiment.phenotypes[phenotypeData773].males_list;
            var strainListLen827 = strainList827.length;
            for (var strainIndex827 = 0; strainIndex827 < strainListLen827; strainIndex827++) {
              var strainData827 = strainList827[strainIndex827];
              if (strainIndex827 >= opt_data.experiment.phenotypes[phenotypeData773].start_index_male && strainIndex827 <= opt_data.experiment.phenotypes[phenotypeData773].start_index_male + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData827, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData773].males_list.length - opt_data.experiment.phenotypes[phenotypeData773].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData773) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append((opt_data.experiment.phenotypes[phenotypeData773].males_list.length > 0) ? '<button class=\'sg_expand_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData773) + '" data-state="true">Show Individuals</button>' : '');
          }
          output.append('</td>');
        }
        output.append('</tr>');
      }
      if (opt_data.experiment.propertiesVisible) {
        output.append('<tr><td rowspan=\'1\' class=\' sg_experiment_phenotype_detail_right\'>Sex </td>');
        var phenotypeList856 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen856 = phenotypeList856.length;
        for (var phenotypeIndex856 = 0; phenotypeIndex856 < phenotypeListLen856; phenotypeIndex856++) {
          var phenotypeData856 = phenotypeList856[phenotypeIndex856];
          output.append('<td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_left\'>', (opt_data.experiment.phenotypes[phenotypeData856].females_list.length > 0) ? 'Female' : '', '</td><td class=\'sg_experiment_p_count sg_experiment_phenotype_detail_right\'>', (opt_data.experiment.phenotypes[phenotypeData856].males_list.length > 0) ? 'Male' : '', '</td>');
        }
        output.append('</tr>');
        var propertyList868 = opt_data.experiment.propertiesList;
        var propertyListLen868 = propertyList868.length;
        for (var propertyIndex868 = 0; propertyIndex868 < propertyListLen868; propertyIndex868++) {
          var propertyData868 = propertyList868[propertyIndex868];
          output.append('<tr><td class=\' sg_experiment_phenotype_detail_right \'>', soy.$$escapeHtml(opt_data.experiment.capitalized_properties[propertyData868]), '</td>');
          var phenotypeList872 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen872 = phenotypeList872.length;
          for (var phenotypeIndex872 = 0; phenotypeIndex872 < phenotypeListLen872; phenotypeIndex872++) {
            var phenotypeData872 = phenotypeList872[phenotypeIndex872];
            output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_double\'>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData872].properties[propertyData868].text), '</td>');
          }
          output.append('</tr>');
        }
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
sg_client_mainframe.sg_current_experiment_name = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<!--        <div class=\'sg_left_heading sg_bold_heading\'>Current experiment:</div>--><span class=\'sg_current_experiment_name\'><input data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" class=\'sg_current_experiment_name_input\' type=\'text\' placeholder="', soy.$$escapeHtml(opt_data.experiment.name), '"></input><input data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" class=\'sg_current_experiment_name_save\' type=\'button\' value=\'Save\'></input><input data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" class=\'sg_current_experiment_name_cancel\' type=\'button\' value=\'Cancel\'></input></span>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.one_experiment_horizontal = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_experiment_box ', soy.$$escapeHtml(opt_data.css_class), ' ', (opt_data.selected) ? 'sg_experiment_selected' : '', '\'><!-- header --><div class=\'sg_title_box\'>', (opt_data.experiment.canclearparents) ? '<button class=\'sg_discard sg_s_discard\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">X</button>' : '', '</div>');
  sg_client_mainframe.sg_current_experiment_name(opt_data, output);
  if (opt_data.experiment.expanded) {
    output.append('<div class=\'sg_one_experiment_table\'><div class=\'sg_slider_widget_wrapper\'><table data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-widget="slider-table" class=\'sg_slider_table\'><tr><th colspan=\'5\'></th>');
    var phenotypeList912 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
    var phenotypeListLen912 = phenotypeList912.length;
    for (var phenotypeIndex912 = 0; phenotypeIndex912 < phenotypeListLen912; phenotypeIndex912++) {
      var phenotypeData912 = phenotypeList912[phenotypeIndex912];
      output.append('<th colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'><!-- ', soy.$$escapeHtml(phenotypeData912.short_description), ' --> Class ', soy.$$escapeHtml(phenotypeIndex912 + 1), ' (', soy.$$escapeHtml(Math.round((opt_data.experiment.phenotypes[phenotypeData912].females + opt_data.experiment.phenotypes[phenotypeData912].males) / opt_data.experiment.list.length * 100)), '%)</th>');
    }
    output.append('</tr>');
    if (opt_data.experiment.visualsVisible) {
      output.append('<tr><td class=\' \'></td><td class=\'sg_experiment_p_visual sg_s_experiment_parent_table_1\'><div class=\'sg_s_experiment_parent_table\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</div></td><td class=\'sg_s_experiment_parent_table_x\'><div class=\'sg_experiment_parent_x\'>X</div></td><td class=\'sg_experiment_p_visual sg_s_experiment_parent_table_2\'><div class=\'sg_s_experiment_parent_table\'>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</div></td><td> => </td>');
      var phenotypeList935 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen935 = phenotypeList935.length;
      for (var phenotypeIndex935 = 0; phenotypeIndex935 < phenotypeListLen935; phenotypeIndex935++) {
        var phenotypeData935 = phenotypeList935[phenotypeIndex935];
        output.append('<td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_left\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData935].top_female, count: opt_data.experiment.phenotypes[phenotypeData935].females, percentage: opt_data.experiment.phenotypes[phenotypeData935].females / opt_data.experiment.list.length, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id, name: opt_data.experiment.phenotypes[phenotypeData935].females, testid: opt_data.experiment.name + ' ' + (phenotypeIndex935 + 1) + ' F'}, output);
        output.append('</td><td class=\'sg_experiment_p_visual sg_experiment_phenotype_detail_right\'>');
        sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData935].top_male, count: opt_data.experiment.phenotypes[phenotypeData935].males, percentage: opt_data.experiment.phenotypes[phenotypeData935].males / opt_data.experiment.list.length, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id, name: opt_data.experiment.phenotypes[phenotypeData935].males, testid: opt_data.experiment.name + ' ' + (phenotypeIndex935 + 1) + ' M'}, output);
        output.append('</td>');
      }
      output.append('</tr><tr><td class=\'sg_s_col_head sg_experiment_phenotype_detail_align_top\' ><b>Phenotypes</b>', (opt_data.experiment.propertiesVisible) ? '&nbsp; <button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'false\'>Hide</button>&nbsp; &nbsp;' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'true\'>Show</button>&nbsp; &nbsp;', '</td><td colspan=\'3\' class=\'sg_experiment_phenotype_detail_align_top\'><button class=\'sg_experiment_mate sg_s_experiment_mate\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '">+ More progeny</button></td><td></td>');
      var phenotypeList969 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen969 = phenotypeList969.length;
      for (var phenotypeIndex969 = 0; phenotypeIndex969 < phenotypeListLen969; phenotypeIndex969++) {
        var phenotypeData969 = phenotypeList969[phenotypeIndex969];
        output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right\'><button class=\'sg_expand_class sg_s_expand_class\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData969), '" data-class-name="Class ', soy.$$escapeHtml(phenotypeIndex969 + 1), '" data-state="true">Show Individuals</button></td>');
      }
      output.append('</tr>');
      if (opt_data.experiment.propertiesVisible) {
        output.append('<tr><td rowspan=\'1\' class=\' \'>Sex </td><td rowspan=\'1\' class=\' sg_experiment_phenotype_detail_parent_f\'>Female</td><td rowspan=\'1\' class=\'\'><!-- x --></td><td rowspan=\'1\' class=\'sg_experiment_phenotype_detail_parent_m \'>Male</td><td rowspan=\'1\' class=\'\'></td>');
        var phenotypeList982 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen982 = phenotypeList982.length;
        for (var phenotypeIndex982 = 0; phenotypeIndex982 < phenotypeListLen982; phenotypeIndex982++) {
          var phenotypeData982 = phenotypeList982[phenotypeIndex982];
          output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_double\'></td>');
        }
        output.append('</tr>');
        var propertyList986 = opt_data.experiment.propertiesList;
        var propertyListLen986 = propertyList986.length;
        for (var propertyIndex986 = 0; propertyIndex986 < propertyListLen986; propertyIndex986++) {
          var propertyData986 = propertyList986[propertyIndex986];
          output.append('<tr><td class=\' \'>', soy.$$escapeHtml(opt_data.experiment.capitalized_properties[propertyData986]), '</td><td class=\' sg_experiment_phenotype_detail_parent_f\'>', soy.$$escapeHtml(opt_data.experiment.parent.female.properties[propertyData986].text), '</td><td rowspan=\'1\' class=\'\'><!-- x --></td><td class=\'sg_experiment_phenotype_detail_parent_m\'>', soy.$$escapeHtml(opt_data.experiment.parent.male.properties[propertyData986].text), '</td><td class=\' sg_experiment_phenotype_detail_right \'></td>');
          var phenotypeList994 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
          var phenotypeListLen994 = phenotypeList994.length;
          for (var phenotypeIndex994 = 0; phenotypeIndex994 < phenotypeListLen994; phenotypeIndex994++) {
            var phenotypeData994 = phenotypeList994[phenotypeIndex994];
            output.append('<td colspan=\'2\' class=\'sg_experiment_phenotype_detail_left sg_experiment_phenotype_detail_right sg_experiment_phenotype_detail_double\'>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData994].properties[propertyData986].text), '</td>');
          }
          output.append('</tr>');
        }
      }
    }
    output.append('</table></div></div>');
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


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.sg_logo = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<img class=\'sg_logo\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAADOQAAANjCAYAAACwECS3AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAA6QxJREFUeNrs3W1OW8cCx+HjKN9hB9AVhLuC0AVYpR9zFCnuCkJWULqCclcAkSr3Y6m8AbKC0BVcuoJLVnDuTH24dVsC/vuFF+d5pOmxwcB4hg8nEr/OoOu6BgAAAAAAAAAAAAAAAJjPM0sAAAAAAAAAAAAAAAAA8xPkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAABQQ4AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQJADAAAAAAAAAAAAAAAAAUEOAAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBDkAAAAAAAAAAAAAAAAQECQAwAAAAAAAAAAAAAAAAFBDgAAAAAAAAAAAAAAAAQEOQAAAAAAAAAAAAAAABAQ5AAAAAAAAAAAAAAAAEBAkAMAAAAAAAAAAAAAAAAB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AAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMQg4AAAAAAAAAAAAAAAAMAaL3OQdKyJzRAAAAAElFTkSuQmCC\'>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.plus_floaty = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_plus_floaty\'>+</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.sg_expand_females = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_expand_females_dialog\' data-widget="dialog" data-id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'><button class=\'sg_dialog_close\'>X</button>Hello this is expand females dialog ', soy.$$escapeHtml(opt_data.experiment.name), '.<br><div class=\'sg_slider_widget_wrapper\'><div class=\'sg_expand_females_dialog_list\' data-widget="slider-table">');
  var strainList1023 = opt_data.experiment.phenotypes[opt_data.phenotype][opt_data.list_kind];
  var strainListLen1023 = strainList1023.length;
  for (var strainIndex1023 = 0; strainIndex1023 < strainListLen1023; strainIndex1023++) {
    var strainData1023 = strainList1023[strainIndex1023];
    output.append('<span class=\'sg_expand_dialog_strain\'>');
    sg_client_mainframe.strain({strain: strainData1023, visuals: true, kind: opt_data.experiment.id}, output);
    output.append('</span>');
  }
  output.append('</div></div></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.sg_expand_class = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_expand_class_dialog\' data-widget="dialog" data-id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'><span class=\'sg_expand_class_dialog_title\'><button class=\'sg_dialog_close\'> &lt; </button>', soy.$$escapeHtml(opt_data.experiment.name), ' ', soy.$$escapeHtml(opt_data.name), ' individuals</span><div class=\'sg_slider_widget_wrapper\'><div class=\'sg_expand_class_dialog_list\' data-widget="slider-table">');
  var strainList1040 = opt_data.experiment.phenotypes[opt_data.phenotype]['list'];
  var strainListLen1040 = strainList1040.length;
  for (var strainIndex1040 = 0; strainIndex1040 < strainListLen1040; strainIndex1040++) {
    var strainData1040 = strainList1040[strainIndex1040];
    output.append('<span class=\'sg_expand_dialog_strain\'>');
    sg_client_mainframe.strain({strain: strainData1040, visuals: true, kind: opt_data.experiment.id}, output);
    output.append('</span>');
  }
  output.append('</div></div></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.sg_select_strain_target = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sg_select_strain_target">', (opt_data.kind != 'new_experiment') ? '<button class=\'sg_add_to_mating_site sg_s_add_to_mating_site\' data-kind=\'' + soy.$$escapeHtml(opt_data.kind) + '\' data-id=\'' + soy.$$escapeHtml(opt_data.id) + '\'>Mating Site</button>' : '', (opt_data.kind != 'strains') ? '<button class=\'sg_add_to_strains sg_s_add_to_strains\' data-kind=\'' + soy.$$escapeHtml(opt_data.kind) + '\' data-id=\'' + soy.$$escapeHtml(opt_data.id) + '\'>Strains Stock</button>' : '', '</div>');
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
