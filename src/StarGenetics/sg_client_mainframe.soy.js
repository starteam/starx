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
  output.append('<button class=\'sg_workspace_save\'>Save</button><button class=\'sg_workspace_load\'>Load</button></div>');
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
      var strainList79 = opt_data.strains.list;
      var strainListLen79 = strainList79.length;
      for (var strainIndex79 = 0; strainIndex79 < strainListLen79; strainIndex79++) {
        var strainData79 = strainList79[strainIndex79];
        output.append('<td class=\'sg_strain_box\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData79['id']), '">');
        sg_client_mainframe.strain({strain: strainData79, visuals: true, kind: 'strains'}, output);
        output.append('</td>');
      }
      output.append('<td class=\'sg_place_holder\'>');
      sg_client_mainframe.strain_place_holder({kind: 'strains', visuals: opt_data.strains.visualsVisible}, output);
      output.append('</td></tr><tr><td  class=\'sg_s_col_head\'>Sex</td>');
      var strainList94 = opt_data.strains.list;
      var strainListLen94 = strainList94.length;
      for (var strainIndex94 = 0; strainIndex94 < strainListLen94; strainIndex94++) {
        var strainData94 = strainList94[strainIndex94];
        output.append('<td class=\'sg_strain_box\'>');
        sg_client_mainframe.sex_icon({sex: strainData94['sex']}, output);
        output.append('</td>');
      }
      output.append('</tr>');
    }
    if (opt_data.strains.propertiesVisible) {
      var propertyList103 = opt_data.strains.propertiesList;
      var propertyListLen103 = propertyList103.length;
      for (var propertyIndex103 = 0; propertyIndex103 < propertyListLen103; propertyIndex103++) {
        var propertyData103 = propertyList103[propertyIndex103];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData103), '</td>');
        var strainList107 = opt_data.strains.list;
        var strainListLen107 = strainList107.length;
        for (var strainIndex107 = 0; strainIndex107 < strainListLen107; strainIndex107++) {
          var strainData107 = strainList107[strainIndex107];
          output.append('<td data-id="', soy.$$escapeHtml(strainData107.id), '">', soy.$$escapeHtml(strainData107.properties[propertyData103].text), '</td>');
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
  var experimentList168 = opt_data.experiments.list;
  var experimentListLen168 = experimentList168.length;
  for (var experimentIndex168 = 0; experimentIndex168 < experimentListLen168; experimentIndex168++) {
    var experimentData168 = experimentList168[experimentIndex168];
    if (experimentIndex168 == 0 || experimentIndex168 < opt_data.experiments.show_experiments) {
      sg_client_mainframe.one_experiment({experiment: experimentData168, index: experimentIndex168}, output);
    }
  }
  output.append((opt_data.experiments.list.length > opt_data.experiments.show_experiments) ? '<button class=\'sg_show_more\' data-increment=\'+\'>Show More?</button>' : '', (opt_data.experiments.show_experiments > 1) ? '<button class=\'sg_show_more\' data-increment=\'-\'>Show Less?</button>' : '');
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
  output.append('<div class=\'sg_experiment_box\'><!-- header --><div class=\'sg_title_box\'>', soy.$$escapeHtml(opt_data.experiment.name), (opt_data.experiment.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.experiment.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') + ((opt_data.experiment.showIndividuals) ? '<button class=\'sg_strain_show_individuals\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'  data-show-individuals=\'false\'>Group flies</button>' : '<button class=\'sg_strain_show_individuals\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-show-individuals=\'true\'>Ungroup flies</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (opt_data.experiment.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">Rename</button>' : '', (opt_data.experiment.canmate) ? '<button class=\'sg_experiment_mate\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '">Add progenies</button>' : '', '</div>');
  if (opt_data.experiment.expanded) {
    output.append('<!-- expanded body -->');
    if (opt_data.experiment.propertiesVisible) {
      output.append('<table><tr><th>Name</th><th>', soy.$$escapeHtml(opt_data.experiment.parent.female.name), '</th><th>', soy.$$escapeHtml(opt_data.experiment.parent.male.name), '</th>');
      var phenotypeList233 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen233 = phenotypeList233.length;
      for (var phenotypeIndex233 = 0; phenotypeIndex233 < phenotypeListLen233; phenotypeIndex233++) {
        var phenotypeData233 = phenotypeList233[phenotypeIndex233];
        output.append('<th>', soy.$$escapeHtml(phenotypeData233.short_description), '</th>');
      }
      output.append('</tr>');
      if (opt_data.experiment.visualsVisible) {
        output.append('<tr><td>Visual</td><td>');
        sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td><td>');
        sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
        output.append('</td>');
        var phenotypeList252 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen252 = phenotypeList252.length;
        for (var phenotypeIndex252 = 0; phenotypeIndex252 < phenotypeListLen252; phenotypeIndex252++) {
          var phenotypeData252 = phenotypeList252[phenotypeIndex252];
          output.append('<td>');
          sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData252].top_male, count: opt_data.experiment.phenotypes[phenotypeData252].males, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
          output.append('</td><td>');
          sg_client_mainframe.strain({strain: opt_data.experiment.phenotypes[phenotypeData252].top_female, count: opt_data.experiment.phenotypes[phenotypeData252].females, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
          output.append('</td>');
        }
        output.append('</tr><tr><td><!-- individual --></td><td><!-- parent 1 --></td><td><!-- parent 2 --></td>');
        var phenotypeList268 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen268 = phenotypeList268.length;
        for (var phenotypeIndex268 = 0; phenotypeIndex268 < phenotypeListLen268; phenotypeIndex268++) {
          var phenotypeData268 = phenotypeList268[phenotypeIndex268];
          output.append('<td><br>');
          if (opt_data.experiment.phenotypes[phenotypeData268].show_more_males) {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData268), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData268].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData268) + '" data-state="-">Previous?</button>' : '');
            var strainList284 = opt_data.experiment.phenotypes[phenotypeData268].males_list;
            var strainListLen284 = strainList284.length;
            for (var strainIndex284 = 0; strainIndex284 < strainListLen284; strainIndex284++) {
              var strainData284 = strainList284[strainIndex284];
              if (strainIndex284 > opt_data.experiment.phenotypes[phenotypeData268].start_index_male && strainIndex284 <= opt_data.experiment.phenotypes[phenotypeData268].start_index_male + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData284, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData268].males_list.length - opt_data.experiment.phenotypes[phenotypeData268].start_index_male > 0) ? '<br><button class=\'sg_move_start_males\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData268) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_males\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData268), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td><td><br>');
          if (opt_data.experiment.phenotypes[phenotypeData268].show_more_females) {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData268), '" data-state="false">Hide Individuals</button>', (opt_data.experiment.phenotypes[phenotypeData268].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData268) + '" data-state="-">Previous?</button>' : '');
            var strainList320 = opt_data.experiment.phenotypes[phenotypeData268].females_list;
            var strainListLen320 = strainList320.length;
            for (var strainIndex320 = 0; strainIndex320 < strainListLen320; strainIndex320++) {
              var strainData320 = strainList320[strainIndex320];
              if (strainIndex320 > opt_data.experiment.phenotypes[phenotypeData268].start_index_female && strainIndex320 <= opt_data.experiment.phenotypes[phenotypeData268].start_index_female + 5) {
                output.append('<br>');
                sg_client_mainframe.strain_short({strain: strainData320, kind: opt_data.experiment.id}, output);
              }
            }
            output.append((opt_data.experiment.phenotypes[phenotypeData268].females_list.length - opt_data.experiment.phenotypes[phenotypeData268].start_index_female > 0) ? '<br><button class=\'sg_move_start_females\' data-kind="' + soy.$$escapeHtml(opt_data.experiment.id) + '" data-phenotype-id="' + soy.$$escapeHtml(phenotypeData268) + '" data-state="+">Next?</button>' : '');
          } else {
            output.append('<button class=\'sg_expand_females\' data-kind="', soy.$$escapeHtml(opt_data.experiment.id), '" data-phenotype-id="', soy.$$escapeHtml(phenotypeData268), '" data-state="true">Show Individuals</button>');
          }
          output.append('</td>');
        }
        output.append('</tr>');
      }
      if (opt_data.experiment.showIndividuals) {
        output.append('<tr><td><!-- individual --></td><td><!-- parent 1 --></td><td><!-- parent 2 --></td>');
        var phenotypeList347 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen347 = phenotypeList347.length;
        for (var phenotypeIndex347 = 0; phenotypeIndex347 < phenotypeListLen347; phenotypeIndex347++) {
          var phenotypeData347 = phenotypeList347[phenotypeIndex347];
          output.append('<td colspan=\'2\'>');
          var strainList349 = opt_data.experiment.phenotypes[phenotypeData347].list;
          var strainListLen349 = strainList349.length;
          for (var strainIndex349 = 0; strainIndex349 < strainListLen349; strainIndex349++) {
            var strainData349 = strainList349[strainIndex349];
            sg_client_mainframe.strain_short({strain: strainData349, kind: opt_data.experiment.id}, output);
          }
          output.append('</td>');
        }
        output.append('</tr>');
      }
      output.append('<tr><td>Sex (M/F)</td><td>');
      sg_client_mainframe.female_icon(null, output);
      output.append('</td><td>');
      sg_client_mainframe.male_icon(null, output);
      output.append('</td>');
      var phenotypeList362 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
      var phenotypeListLen362 = phenotypeList362.length;
      for (var phenotypeIndex362 = 0; phenotypeIndex362 < phenotypeListLen362; phenotypeIndex362++) {
        var phenotypeData362 = phenotypeList362[phenotypeIndex362];
        output.append('<td>    ', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData362].males));
        sg_client_mainframe.male_icon(null, output);
        output.append('</td><td>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData362].females));
        sg_client_mainframe.female_icon(null, output);
        output.append('</td>');
      }
      var propertyList371 = opt_data.experiment.propertiesList;
      var propertyListLen371 = propertyList371.length;
      for (var propertyIndex371 = 0; propertyIndex371 < propertyListLen371; propertyIndex371++) {
        var propertyData371 = propertyList371[propertyIndex371];
        output.append('<tr><td>', soy.$$escapeHtml(propertyData371), '</td><td>', soy.$$escapeHtml(opt_data.experiment.parent.female.properties[propertyData371].text), '</td><td>', soy.$$escapeHtml(opt_data.experiment.parent.male.properties[propertyData371].text), '</td>');
        var phenotypeList379 = soy.$$getMapKeys(opt_data.experiment.phenotypes);
        var phenotypeListLen379 = phenotypeList379.length;
        for (var phenotypeIndex379 = 0; phenotypeIndex379 < phenotypeListLen379; phenotypeIndex379++) {
          var phenotypeData379 = phenotypeList379[phenotypeIndex379];
          output.append('<td colspan=\'2\'>', soy.$$escapeHtml(opt_data.experiment.phenotypes[phenotypeData379].properties[propertyData371].text), '</td>');
        }
        output.append('</tr>');
      }
      output.append('</table>');
    } else {
      output.append('<table><tr><th>Sex</th><th>Parents</th><th>Offsprings</th></tr><tr><td>Female</td><td>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.female, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td><td>', soy.$$escapeHtml(opt_data.experiment.stats.sex.females), '</td></tr><tr><td>Male</td><td>');
      sg_client_mainframe.strain({strain: opt_data.experiment.parent.male, visuals: opt_data.experiment.visualsVisible, kind: opt_data.experiment.id}, output);
      output.append('</td><td>', soy.$$escapeHtml(opt_data.experiment.stats.sex.males), '</td></tr></table>');
    }
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
