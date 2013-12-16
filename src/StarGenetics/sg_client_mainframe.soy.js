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
  output.append('</div>');
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
  output.append((opt_data.count != 0) ? '<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'' + soy.$$escapeHtml(opt_data.kind) + '\' data-id="' + soy.$$escapeHtml(opt_data.strain['id']) + '"><div class=\'sg_strain_title\'>' + soy.$$escapeHtml(opt_data.strain['name']) + '</div>' + ((opt_data.visuals) ? '<div class=\'sg_strain_visual\'><canvas data-kind=\'' + soy.$$escapeHtml(opt_data.kind) + '\' data-id=\'' + soy.$$escapeHtml(opt_data.strain['id']) + '\'></canvas></div>' : '') + '</div>' : '<div class=\'sg_s_strain_box\'></div>');
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
  output.append('<div class=\'sg_strains_box\'><div class=\'sg_title_box\'>Strains', (opt_data.strains.expanded) ? '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.strains.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'strains\' data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'strains\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((opt_data.strains.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'true\'>Expand</button>', '</div>');
  if (opt_data.strains.expanded) {
    if (opt_data.strains.propertiesVisible) {
      output.append('<table><thead><td class=\'sg_s_col_head sg_s_row_head\'>Name</td>');
      var strainList58 = opt_data.strains.list;
      var strainListLen58 = strainList58.length;
      for (var strainIndex58 = 0; strainIndex58 < strainListLen58; strainIndex58++) {
        var strainData58 = strainList58[strainIndex58];
        output.append('<td class=\'sg_strain_box sg_s_row_head\'>', soy.$$escapeHtml(strainData58['name']), '</td>');
      }
      output.append('</thead>');
      if (opt_data.strains.visualsVisible) {
        output.append('<tr><td class=\'sg_s_col_head\'>Visual</td>');
        var strainList67 = opt_data.strains.list;
        var strainListLen67 = strainList67.length;
        for (var strainIndex67 = 0; strainIndex67 < strainListLen67; strainIndex67++) {
          var strainData67 = strainList67[strainIndex67];
          output.append('<td class=\'sg_strain_box\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData67['id']), '"><div class=\'sg_strain_visual\'><canvas data-kind=\'strains\' data-id=\'', soy.$$escapeHtml(strainData67['id']), '\'></canvas></div></td>');
        }
        output.append('</tr>');
      }
      var propertyList75 = opt_data.strains.propertiesList;
      var propertyListLen75 = propertyList75.length;
      for (var propertyIndex75 = 0; propertyIndex75 < propertyListLen75; propertyIndex75++) {
        var propertyData75 = propertyList75[propertyIndex75];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData75), '</td>');
        var strainList79 = opt_data.strains.list;
        var strainListLen79 = strainList79.length;
        for (var strainIndex79 = 0; strainIndex79 < strainListLen79; strainIndex79++) {
          var strainData79 = strainList79[strainIndex79];
          output.append('<td class=\'sg_strain_box\'>', soy.$$escapeHtml(strainData79.properties[propertyData75].text), '</td>');
        }
        output.append('</tr>');
      }
      output.append('</table>');
    } else {
      var strainList88 = opt_data.strains.list;
      var strainListLen88 = strainList88.length;
      for (var strainIndex88 = 0; strainIndex88 < strainListLen88; strainIndex88++) {
        var strainData88 = strainList88[strainIndex88];
        sg_client_mainframe.strain({strain: strainData88, visuals: opt_data.strains.visualsVisible, kind: 'strains'}, output);
      }
    }
  } else {
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
  output.append('<div class=\'sg_new_experiment_box\'><div class=\'sg_title_box\'>New Experiment', (opt_data.experiment.expanded) ? '<button class=\'sg_expand\' data-kind=\'new_experiment\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.experiment.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'new_experiment\'  data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'new_experiment\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((opt_data.experiment.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'new_experiment\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'new_experiment\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'new_experiment\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (opt_data.experiment.canclearparents) ? '<button class=\'sg_clear_parents\' data-kind="new_experiment">Clear</button>' : '', (opt_data.experiment.canmate) ? '<button class=\'sg_new_experiment_mate\' data-kind=\'new_experiment\'>Mate</button>' : '', '</div>');
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
  var experimentList151 = opt_data.experiments.list;
  var experimentListLen151 = experimentList151.length;
  for (var experimentIndex151 = 0; experimentIndex151 < experimentListLen151; experimentIndex151++) {
    var experimentData151 = experimentList151[experimentIndex151];
    output.append('<div class=\'sg_experiment_box\'><!-- header --><div class=\'sg_title_box\'>', soy.$$escapeHtml(experimentData151.name), (experimentData151.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData151.id) + '\' data-expanded=\'false\'>Collaps</button>' + ((experimentData151.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData151.id) + '\'  data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData151.id) + '\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((experimentData151.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData151.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData151.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData151.id) + '\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (experimentData151.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(experimentData151.id) + '">Rename</button>' : '', (experimentData151.canmate) ? '<button class=\'sg_experiment_mate\' data-kind="' + soy.$$escapeHtml(experimentData151.id) + '">Add progenies</button>' : '', '</div>');
    if (experimentData151.expanded) {
      output.append('<!-- expanded body -->');
      if (experimentData151.propertiesVisible) {
        output.append('<table><tr><th>Name</th><th>', soy.$$escapeHtml(experimentData151.parent.female.name), '</th><th>', soy.$$escapeHtml(experimentData151.parent.male.name), '</th>');
        var phenotypeList203 = soy.$$getMapKeys(experimentData151.phenotypes);
        var phenotypeListLen203 = phenotypeList203.length;
        for (var phenotypeIndex203 = 0; phenotypeIndex203 < phenotypeListLen203; phenotypeIndex203++) {
          var phenotypeData203 = phenotypeList203[phenotypeIndex203];
          output.append('<th>', soy.$$escapeHtml(phenotypeData203.short_description), '</th>');
        }
        output.append('</tr>');
        if (experimentData151.visualsVisible) {
          output.append('<tr><td>Visual</td><td>');
          sg_client_mainframe.strain({strain: experimentData151.parent.female, visuals: experimentData151.visualsVisible, kind: experimentData151.id}, output);
          output.append('</td><td>');
          sg_client_mainframe.strain({strain: experimentData151.parent.male, visuals: experimentData151.visualsVisible, kind: experimentData151.id}, output);
          output.append('</td>');
          var phenotypeList222 = soy.$$getMapKeys(experimentData151.phenotypes);
          var phenotypeListLen222 = phenotypeList222.length;
          for (var phenotypeIndex222 = 0; phenotypeIndex222 < phenotypeListLen222; phenotypeIndex222++) {
            var phenotypeData222 = phenotypeList222[phenotypeIndex222];
            output.append('<td>');
            sg_client_mainframe.strain({strain: experimentData151.phenotypes[phenotypeData222].top_male, count: experimentData151.phenotypes[phenotypeData222].males, visuals: experimentData151.visualsVisible, kind: experimentData151.id}, output);
            sg_client_mainframe.strain({strain: experimentData151.phenotypes[phenotypeData222].top_female, count: experimentData151.phenotypes[phenotypeData222].females, visuals: experimentData151.visualsVisible, kind: experimentData151.id}, output);
            output.append('</td>');
          }
          output.append('</tr>');
        }
        output.append('<tr><td>Sex (M/F)</td><td>0/1</td><td>1/0</td>');
        var phenotypeList238 = soy.$$getMapKeys(experimentData151.phenotypes);
        var phenotypeListLen238 = phenotypeList238.length;
        for (var phenotypeIndex238 = 0; phenotypeIndex238 < phenotypeListLen238; phenotypeIndex238++) {
          var phenotypeData238 = phenotypeList238[phenotypeIndex238];
          output.append('<td>    ', soy.$$escapeHtml(experimentData151.phenotypes[phenotypeData238].males), '/', soy.$$escapeHtml(experimentData151.phenotypes[phenotypeData238].females), '</td>');
        }
        var propertyList245 = experimentData151.propertiesList;
        var propertyListLen245 = propertyList245.length;
        for (var propertyIndex245 = 0; propertyIndex245 < propertyListLen245; propertyIndex245++) {
          var propertyData245 = propertyList245[propertyIndex245];
          output.append('<tr><td>', soy.$$escapeHtml(propertyData245), '</td><td>', soy.$$escapeHtml(experimentData151.parent.female.properties[propertyData245].text), '</td><td>', soy.$$escapeHtml(experimentData151.parent.male.properties[propertyData245].text), '</td>');
          var phenotypeList253 = soy.$$getMapKeys(experimentData151.phenotypes);
          var phenotypeListLen253 = phenotypeList253.length;
          for (var phenotypeIndex253 = 0; phenotypeIndex253 < phenotypeListLen253; phenotypeIndex253++) {
            var phenotypeData253 = phenotypeList253[phenotypeIndex253];
            output.append('<td>', soy.$$escapeHtml(experimentData151.phenotypes[phenotypeData253].properties[propertyData245].text), '</td>');
          }
          output.append('</tr>');
        }
        output.append('</table>');
      } else {
        output.append('<table><tr><th>Sex</th><th>Parents</th><th>Offsprings</th></tr><tr><td>Female</td><td>');
        sg_client_mainframe.strain({strain: experimentData151.parent.female, visuals: experimentData151.visualsVisible, kind: experimentData151.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData151.stats.sex.females), '</td></tr><tr><td>Male</td><td>');
        sg_client_mainframe.strain({strain: experimentData151.parent.male, visuals: experimentData151.visualsVisible, kind: experimentData151.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData151.stats.sex.males), '</td></tr></table>');
      }
    }
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
