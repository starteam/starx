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
  output.append((opt_data.count != 0) ? '<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'' + soy.$$escapeHtml(opt_data.kind) + '\' data-id="' + soy.$$escapeHtml(opt_data.strain['id']) + '"><div class=\'sg_strain_title\'>' + soy.$$escapeHtml(opt_data.strain['name']) + '</div>' + ((opt_data.visuals) ? '<div class=\'sg_strain_visual\'><canvas data-kind=\'' + soy.$$escapeHtml(opt_data.kind) + '\' data-id=\'' + soy.$$escapeHtml(opt_data.strain['id']) + '\'></canvas></div>' : '') + '</div>' : '<div class=\'sg_strain_box\'></div>');
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
  output.append('<div class=\'sg_strains_box\'><div class=\'sg_title_box\'>Strains', (opt_data.strains.expanded) ? '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.strains.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'strains\' data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'strains\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((opt_data.strains.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'true\'>Expand</button>', '</div>');
  if (opt_data.strains.expanded) {
    if (opt_data.strains.propertiesVisible) {
      output.append('<table><thead><td class=\'sg_s_col_head sg_s_row_head\'>Name</td>');
      var strainList66 = opt_data.strains.list;
      var strainListLen66 = strainList66.length;
      for (var strainIndex66 = 0; strainIndex66 < strainListLen66; strainIndex66++) {
        var strainData66 = strainList66[strainIndex66];
        output.append('<td class=\'sg_strain_box sg_s_row_head\'>', soy.$$escapeHtml(strainData66['name']), '</td>');
      }
      output.append('</thead>');
      if (opt_data.strains.visualsVisible) {
        output.append('<tr><td class=\'sg_s_col_head\'>Visual</td>');
        var strainList75 = opt_data.strains.list;
        var strainListLen75 = strainList75.length;
        for (var strainIndex75 = 0; strainIndex75 < strainListLen75; strainIndex75++) {
          var strainData75 = strainList75[strainIndex75];
          output.append('<td class=\'sg_strain_box\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData75['id']), '"><div class=\'sg_strain_visual\'><canvas data-kind=\'strains\' data-id=\'', soy.$$escapeHtml(strainData75['id']), '\'></canvas></div></td>');
        }
        output.append('</tr>');
      }
      var propertyList83 = opt_data.strains.propertiesList;
      var propertyListLen83 = propertyList83.length;
      for (var propertyIndex83 = 0; propertyIndex83 < propertyListLen83; propertyIndex83++) {
        var propertyData83 = propertyList83[propertyIndex83];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData83), '</td>');
        var strainList87 = opt_data.strains.list;
        var strainListLen87 = strainList87.length;
        for (var strainIndex87 = 0; strainIndex87 < strainListLen87; strainIndex87++) {
          var strainData87 = strainList87[strainIndex87];
          output.append('<td class=\'sg_strain_box\'>', soy.$$escapeHtml(strainData87.properties[propertyData83].text), '</td>');
        }
        output.append('</tr>');
      }
      output.append('</table>');
    } else {
      var strainList96 = opt_data.strains.list;
      var strainListLen96 = strainList96.length;
      for (var strainIndex96 = 0; strainIndex96 < strainListLen96; strainIndex96++) {
        var strainData96 = strainList96[strainIndex96];
        sg_client_mainframe.strain({strain: strainData96, visuals: opt_data.strains.visualsVisible, kind: 'strains'}, output);
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
  var experimentList162 = opt_data.experiments.list;
  var experimentListLen162 = experimentList162.length;
  for (var experimentIndex162 = 0; experimentIndex162 < experimentListLen162; experimentIndex162++) {
    var experimentData162 = experimentList162[experimentIndex162];
    output.append('<div class=\'sg_experiment_box\'><!-- header --><div class=\'sg_title_box\'>', soy.$$escapeHtml(experimentData162.name), (experimentData162.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData162.id) + '\' data-expanded=\'false\'>Collaps</button>' + ((experimentData162.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData162.id) + '\'  data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData162.id) + '\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((experimentData162.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData162.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData162.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData162.id) + '\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (experimentData162.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(experimentData162.id) + '">Rename</button>' : '', (experimentData162.canmate) ? '<button class=\'sg_experiment_mate\' data-kind="' + soy.$$escapeHtml(experimentData162.id) + '">Add progenies</button>' : '', '</div>');
    if (experimentData162.expanded) {
      output.append('<!-- expanded body -->');
      if (experimentData162.propertiesVisible) {
        output.append('<table><tr><th>Name</th><th>', soy.$$escapeHtml(experimentData162.parent.female.name), '</th><th>', soy.$$escapeHtml(experimentData162.parent.male.name), '</th>');
        var phenotypeList214 = soy.$$getMapKeys(experimentData162.phenotypes);
        var phenotypeListLen214 = phenotypeList214.length;
        for (var phenotypeIndex214 = 0; phenotypeIndex214 < phenotypeListLen214; phenotypeIndex214++) {
          var phenotypeData214 = phenotypeList214[phenotypeIndex214];
          output.append('<th>', soy.$$escapeHtml(phenotypeData214.short_description), '</th>');
        }
        output.append('</tr>');
        if (experimentData162.visualsVisible) {
          output.append('<tr><td>Visual</td><td>');
          sg_client_mainframe.strain({strain: experimentData162.parent.female, visuals: experimentData162.visualsVisible, kind: experimentData162.id}, output);
          output.append('</td><td>');
          sg_client_mainframe.strain({strain: experimentData162.parent.male, visuals: experimentData162.visualsVisible, kind: experimentData162.id}, output);
          output.append('</td>');
          var phenotypeList233 = soy.$$getMapKeys(experimentData162.phenotypes);
          var phenotypeListLen233 = phenotypeList233.length;
          for (var phenotypeIndex233 = 0; phenotypeIndex233 < phenotypeListLen233; phenotypeIndex233++) {
            var phenotypeData233 = phenotypeList233[phenotypeIndex233];
            output.append('<td>');
            sg_client_mainframe.strain({strain: experimentData162.phenotypes[phenotypeData233].top_male, count: experimentData162.phenotypes[phenotypeData233].males, visuals: experimentData162.visualsVisible, kind: experimentData162.id}, output);
            sg_client_mainframe.strain({strain: experimentData162.phenotypes[phenotypeData233].top_female, count: experimentData162.phenotypes[phenotypeData233].females, visuals: experimentData162.visualsVisible, kind: experimentData162.id}, output);
            output.append('</td>');
          }
          output.append('</tr>');
        }
        output.append('<tr><td>Sex (M/F)</td><td>0/1</td><td>1/0</td>');
        var phenotypeList249 = soy.$$getMapKeys(experimentData162.phenotypes);
        var phenotypeListLen249 = phenotypeList249.length;
        for (var phenotypeIndex249 = 0; phenotypeIndex249 < phenotypeListLen249; phenotypeIndex249++) {
          var phenotypeData249 = phenotypeList249[phenotypeIndex249];
          output.append('<td>    ', soy.$$escapeHtml(experimentData162.phenotypes[phenotypeData249].males), '/', soy.$$escapeHtml(experimentData162.phenotypes[phenotypeData249].females), '</td>');
        }
        var propertyList256 = experimentData162.propertiesList;
        var propertyListLen256 = propertyList256.length;
        for (var propertyIndex256 = 0; propertyIndex256 < propertyListLen256; propertyIndex256++) {
          var propertyData256 = propertyList256[propertyIndex256];
          output.append('<tr><td>', soy.$$escapeHtml(propertyData256), '</td><td>', soy.$$escapeHtml(experimentData162.parent.female.properties[propertyData256].text), '</td><td>', soy.$$escapeHtml(experimentData162.parent.male.properties[propertyData256].text), '</td>');
          var phenotypeList264 = soy.$$getMapKeys(experimentData162.phenotypes);
          var phenotypeListLen264 = phenotypeList264.length;
          for (var phenotypeIndex264 = 0; phenotypeIndex264 < phenotypeListLen264; phenotypeIndex264++) {
            var phenotypeData264 = phenotypeList264[phenotypeIndex264];
            output.append('<td>', soy.$$escapeHtml(experimentData162.phenotypes[phenotypeData264].properties[propertyData256].text), '</td>');
          }
          output.append('</tr>');
        }
        output.append('</table>');
      } else {
        output.append('<table><tr><th>Sex</th><th>Parents</th><th>Offsprings</th></tr><tr><td>Female</td><td>');
        sg_client_mainframe.strain({strain: experimentData162.parent.female, visuals: experimentData162.visualsVisible, kind: experimentData162.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData162.stats.sex.females), '</td></tr><tr><td>Male</td><td>');
        sg_client_mainframe.strain({strain: experimentData162.parent.male, visuals: experimentData162.visualsVisible, kind: experimentData162.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData162.stats.sex.males), '</td></tr></table>');
      }
    }
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
