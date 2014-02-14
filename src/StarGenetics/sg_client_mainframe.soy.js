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
    if (opt_data.strains.propertiesVisible) {
      output.append('<table><thead><td class=\'sg_s_col_head sg_s_row_head\'>Name</td>');
      var strainList78 = opt_data.strains.list;
      var strainListLen78 = strainList78.length;
      for (var strainIndex78 = 0; strainIndex78 < strainListLen78; strainIndex78++) {
        var strainData78 = strainList78[strainIndex78];
        output.append('<td class=\'sg_strain_box sg_s_row_head\'>', soy.$$escapeHtml(strainData78['name']), '</td>');
      }
      output.append('</thead>');
      if (opt_data.strains.visualsVisible) {
        output.append('<tr><td class=\'sg_s_col_head\'>Visual</td>');
        var strainList87 = opt_data.strains.list;
        var strainListLen87 = strainList87.length;
        for (var strainIndex87 = 0; strainIndex87 < strainListLen87; strainIndex87++) {
          var strainData87 = strainList87[strainIndex87];
          output.append('<td class=\'sg_strain_box\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData87['id']), '"><div class=\'sg_strain_visual\'><canvas data-kind=\'strains\' data-id=\'', soy.$$escapeHtml(strainData87['id']), '\'></canvas></div></td>');
        }
        output.append('<td class=\'sg_place_holder\'>');
        sg_client_mainframe.strain_place_holder({kind: 'strains', visuals: opt_data.strains.visualsVisible}, output);
        output.append('</td></tr><tr><td  class=\'sg_s_col_head\'>Sex</td>');
        var strainList99 = opt_data.strains.list;
        var strainListLen99 = strainList99.length;
        for (var strainIndex99 = 0; strainIndex99 < strainListLen99; strainIndex99++) {
          var strainData99 = strainList99[strainIndex99];
          output.append('<td class=\'sg_strain_box\'>');
          sg_client_mainframe.sex_icon({sex: strainData99['sex']}, output);
          output.append('</td>');
        }
        output.append('</tr>');
      }
      var propertyList106 = opt_data.strains.propertiesList;
      var propertyListLen106 = propertyList106.length;
      for (var propertyIndex106 = 0; propertyIndex106 < propertyListLen106; propertyIndex106++) {
        var propertyData106 = propertyList106[propertyIndex106];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData106), '</td>');
        var strainList110 = opt_data.strains.list;
        var strainListLen110 = strainList110.length;
        for (var strainIndex110 = 0; strainIndex110 < strainListLen110; strainIndex110++) {
          var strainData110 = strainList110[strainIndex110];
          output.append('<td class=\'sg_strain_box\'>', soy.$$escapeHtml(strainData110.properties[propertyData106].text), '</td>');
        }
        output.append('</tr>');
      }
      output.append('</table>');
    } else {
      var strainList119 = opt_data.strains.list;
      var strainListLen119 = strainList119.length;
      for (var strainIndex119 = 0; strainIndex119 < strainListLen119; strainIndex119++) {
        var strainData119 = strainList119[strainIndex119];
        sg_client_mainframe.strain({strain: strainData119, visuals: opt_data.strains.visualsVisible, kind: 'strains'}, output);
      }
      sg_client_mainframe.strain_place_holder({kind: 'strains', visuals: opt_data.strains.visualsVisible}, output);
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
  var experimentList180 = opt_data.experiments.list;
  var experimentListLen180 = experimentList180.length;
  for (var experimentIndex180 = 0; experimentIndex180 < experimentListLen180; experimentIndex180++) {
    var experimentData180 = experimentList180[experimentIndex180];
    output.append('<div class=\'sg_experiment_box\'><!-- header --><div class=\'sg_title_box\'>', soy.$$escapeHtml(experimentData180.name), (experimentData180.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData180.id) + '\' data-expanded=\'false\'>Collaps</button>' + ((experimentData180.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData180.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData180.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') + ((experimentData180.showIndividuals) ? '<button class=\'sg_strain_show_individuals\' data-kind=\'' + soy.$$escapeHtml(experimentData180.id) + '\'  data-show-individuals=\'false\'>Group flies</button>' : '<button class=\'sg_strain_show_individuals\' data-kind=\'' + soy.$$escapeHtml(experimentData180.id) + '\' data-show-individuals=\'true\'>Ungroup flies</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData180.id) + '\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (experimentData180.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(experimentData180.id) + '">Rename</button>' : '', (experimentData180.canmate) ? '<button class=\'sg_experiment_mate\' data-kind="' + soy.$$escapeHtml(experimentData180.id) + '">Add progenies</button>' : '', '</div>');
    if (experimentData180.expanded) {
      output.append('<!-- expanded body -->');
      if (experimentData180.propertiesVisible) {
        output.append('<table><tr><th>Name</th><th>', soy.$$escapeHtml(experimentData180.parent.female.name), '</th><th>', soy.$$escapeHtml(experimentData180.parent.male.name), '</th>');
        var phenotypeList232 = soy.$$getMapKeys(experimentData180.phenotypes);
        var phenotypeListLen232 = phenotypeList232.length;
        for (var phenotypeIndex232 = 0; phenotypeIndex232 < phenotypeListLen232; phenotypeIndex232++) {
          var phenotypeData232 = phenotypeList232[phenotypeIndex232];
          output.append('<th>', soy.$$escapeHtml(phenotypeData232.short_description), '</th>');
        }
        output.append('</tr>');
        if (experimentData180.visualsVisible) {
          output.append('<tr><td>Visual</td><td>');
          sg_client_mainframe.strain({strain: experimentData180.parent.female, visuals: experimentData180.visualsVisible, kind: experimentData180.id}, output);
          output.append('</td><td>');
          sg_client_mainframe.strain({strain: experimentData180.parent.male, visuals: experimentData180.visualsVisible, kind: experimentData180.id}, output);
          output.append('</td>');
          var phenotypeList251 = soy.$$getMapKeys(experimentData180.phenotypes);
          var phenotypeListLen251 = phenotypeList251.length;
          for (var phenotypeIndex251 = 0; phenotypeIndex251 < phenotypeListLen251; phenotypeIndex251++) {
            var phenotypeData251 = phenotypeList251[phenotypeIndex251];
            output.append('<td>');
            sg_client_mainframe.strain({strain: experimentData180.phenotypes[phenotypeData251].top_male, count: experimentData180.phenotypes[phenotypeData251].males, visuals: experimentData180.visualsVisible, kind: experimentData180.id}, output);
            output.append('</td><td>');
            sg_client_mainframe.strain({strain: experimentData180.phenotypes[phenotypeData251].top_female, count: experimentData180.phenotypes[phenotypeData251].females, visuals: experimentData180.visualsVisible, kind: experimentData180.id}, output);
            output.append('</td>');
          }
          output.append('</tr>');
        }
        if (experimentData180.showIndividuals) {
          output.append('<tr><td><!-- individual --></td><td><!-- parent 1 --></td><td><!-- parent 2 --></td>');
          var phenotypeList270 = soy.$$getMapKeys(experimentData180.phenotypes);
          var phenotypeListLen270 = phenotypeList270.length;
          for (var phenotypeIndex270 = 0; phenotypeIndex270 < phenotypeListLen270; phenotypeIndex270++) {
            var phenotypeData270 = phenotypeList270[phenotypeIndex270];
            output.append('<td colspan=\'2\'>');
            var strainList272 = experimentData180.phenotypes[phenotypeData270].list;
            var strainListLen272 = strainList272.length;
            for (var strainIndex272 = 0; strainIndex272 < strainListLen272; strainIndex272++) {
              var strainData272 = strainList272[strainIndex272];
              sg_client_mainframe.strain_short({strain: strainData272, kind: experimentData180.id}, output);
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
        var phenotypeList285 = soy.$$getMapKeys(experimentData180.phenotypes);
        var phenotypeListLen285 = phenotypeList285.length;
        for (var phenotypeIndex285 = 0; phenotypeIndex285 < phenotypeListLen285; phenotypeIndex285++) {
          var phenotypeData285 = phenotypeList285[phenotypeIndex285];
          output.append('<td>    ', soy.$$escapeHtml(experimentData180.phenotypes[phenotypeData285].males));
          sg_client_mainframe.male_icon(null, output);
          output.append('</td><td>', soy.$$escapeHtml(experimentData180.phenotypes[phenotypeData285].females));
          sg_client_mainframe.female_icon(null, output);
          output.append('</td>');
        }
        var propertyList294 = experimentData180.propertiesList;
        var propertyListLen294 = propertyList294.length;
        for (var propertyIndex294 = 0; propertyIndex294 < propertyListLen294; propertyIndex294++) {
          var propertyData294 = propertyList294[propertyIndex294];
          output.append('<tr><td>', soy.$$escapeHtml(propertyData294), '</td><td>', soy.$$escapeHtml(experimentData180.parent.female.properties[propertyData294].text), '</td><td>', soy.$$escapeHtml(experimentData180.parent.male.properties[propertyData294].text), '</td>');
          var phenotypeList302 = soy.$$getMapKeys(experimentData180.phenotypes);
          var phenotypeListLen302 = phenotypeList302.length;
          for (var phenotypeIndex302 = 0; phenotypeIndex302 < phenotypeListLen302; phenotypeIndex302++) {
            var phenotypeData302 = phenotypeList302[phenotypeIndex302];
            output.append('<td colspan=\'2\'>', soy.$$escapeHtml(experimentData180.phenotypes[phenotypeData302].properties[propertyData294].text), '</td>');
          }
          output.append('</tr>');
        }
        output.append('</table>');
      } else {
        output.append('<table><tr><th>Sex</th><th>Parents</th><th>Offsprings</th></tr><tr><td>Female</td><td>');
        sg_client_mainframe.strain({strain: experimentData180.parent.female, visuals: experimentData180.visualsVisible, kind: experimentData180.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData180.stats.sex.females), '</td></tr><tr><td>Male</td><td>');
        sg_client_mainframe.strain({strain: experimentData180.parent.male, visuals: experimentData180.visualsVisible, kind: experimentData180.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData180.stats.sex.males), '</td></tr></table>');
      }
    }
    output.append('</div>');
  }
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
