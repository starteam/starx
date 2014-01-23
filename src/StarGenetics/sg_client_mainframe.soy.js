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
      var strainList69 = opt_data.strains.list;
      var strainListLen69 = strainList69.length;
      for (var strainIndex69 = 0; strainIndex69 < strainListLen69; strainIndex69++) {
        var strainData69 = strainList69[strainIndex69];
        output.append('<td class=\'sg_strain_box sg_s_row_head\'>', soy.$$escapeHtml(strainData69['name']), '</td>');
      }
      output.append('</thead>');
      if (opt_data.strains.visualsVisible) {
        output.append('<tr><td class=\'sg_s_col_head\'>Visual</td>');
        var strainList78 = opt_data.strains.list;
        var strainListLen78 = strainList78.length;
        for (var strainIndex78 = 0; strainIndex78 < strainListLen78; strainIndex78++) {
          var strainData78 = strainList78[strainIndex78];
          output.append('<td class=\'sg_strain_box\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData78['id']), '"><div class=\'sg_strain_visual\'><canvas data-kind=\'strains\' data-id=\'', soy.$$escapeHtml(strainData78['id']), '\'></canvas></div></td>');
        }
        output.append('</tr>');
      }
      var propertyList86 = opt_data.strains.propertiesList;
      var propertyListLen86 = propertyList86.length;
      for (var propertyIndex86 = 0; propertyIndex86 < propertyListLen86; propertyIndex86++) {
        var propertyData86 = propertyList86[propertyIndex86];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData86), '</td>');
        var strainList90 = opt_data.strains.list;
        var strainListLen90 = strainList90.length;
        for (var strainIndex90 = 0; strainIndex90 < strainListLen90; strainIndex90++) {
          var strainData90 = strainList90[strainIndex90];
          output.append('<td class=\'sg_strain_box\'>', soy.$$escapeHtml(strainData90.properties[propertyData86].text), '</td>');
        }
        output.append('</tr>');
      }
      output.append('</table>');
    } else {
      var strainList99 = opt_data.strains.list;
      var strainListLen99 = strainList99.length;
      for (var strainIndex99 = 0; strainIndex99 < strainListLen99; strainIndex99++) {
        var strainData99 = strainList99[strainIndex99];
        sg_client_mainframe.strain({strain: strainData99, visuals: opt_data.strains.visualsVisible, kind: 'strains'}, output);
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
  var experimentList165 = opt_data.experiments.list;
  var experimentListLen165 = experimentList165.length;
  for (var experimentIndex165 = 0; experimentIndex165 < experimentListLen165; experimentIndex165++) {
    var experimentData165 = experimentList165[experimentIndex165];
    output.append('<div class=\'sg_experiment_box\'><!-- header --><div class=\'sg_title_box\'>', soy.$$escapeHtml(experimentData165.name), (experimentData165.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData165.id) + '\' data-expanded=\'false\'>Collaps</button>' + ((experimentData165.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData165.id) + '\'  data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData165.id) + '\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((experimentData165.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData165.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData165.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData165.id) + '\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (experimentData165.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(experimentData165.id) + '">Rename</button>' : '', (experimentData165.canmate) ? '<button class=\'sg_experiment_mate\' data-kind="' + soy.$$escapeHtml(experimentData165.id) + '">Add progenies</button>' : '', '</div>');
    if (experimentData165.expanded) {
      output.append('<!-- expanded body -->');
      if (experimentData165.propertiesVisible) {
        output.append('<table><tr><th>Name</th><th>', soy.$$escapeHtml(experimentData165.parent.female.name), '</th><th>', soy.$$escapeHtml(experimentData165.parent.male.name), '</th>');
        var phenotypeList217 = soy.$$getMapKeys(experimentData165.phenotypes);
        var phenotypeListLen217 = phenotypeList217.length;
        for (var phenotypeIndex217 = 0; phenotypeIndex217 < phenotypeListLen217; phenotypeIndex217++) {
          var phenotypeData217 = phenotypeList217[phenotypeIndex217];
          output.append('<th>', soy.$$escapeHtml(phenotypeData217.short_description), '</th>');
        }
        output.append('</tr>');
        if (experimentData165.visualsVisible) {
          output.append('<tr><td>Visual</td><td>');
          sg_client_mainframe.strain({strain: experimentData165.parent.female, visuals: experimentData165.visualsVisible, kind: experimentData165.id}, output);
          output.append('</td><td>');
          sg_client_mainframe.strain({strain: experimentData165.parent.male, visuals: experimentData165.visualsVisible, kind: experimentData165.id}, output);
          output.append('</td>');
          var phenotypeList236 = soy.$$getMapKeys(experimentData165.phenotypes);
          var phenotypeListLen236 = phenotypeList236.length;
          for (var phenotypeIndex236 = 0; phenotypeIndex236 < phenotypeListLen236; phenotypeIndex236++) {
            var phenotypeData236 = phenotypeList236[phenotypeIndex236];
            output.append('<td>');
            sg_client_mainframe.strain({strain: experimentData165.phenotypes[phenotypeData236].top_male, count: experimentData165.phenotypes[phenotypeData236].males, visuals: experimentData165.visualsVisible, kind: experimentData165.id}, output);
            sg_client_mainframe.strain({strain: experimentData165.phenotypes[phenotypeData236].top_female, count: experimentData165.phenotypes[phenotypeData236].females, visuals: experimentData165.visualsVisible, kind: experimentData165.id}, output);
            output.append('</td>');
          }
          output.append('</tr>');
        }
        output.append('<tr><td>Sex (M/F)</td><td>0/1</td><td>1/0</td>');
        var phenotypeList252 = soy.$$getMapKeys(experimentData165.phenotypes);
        var phenotypeListLen252 = phenotypeList252.length;
        for (var phenotypeIndex252 = 0; phenotypeIndex252 < phenotypeListLen252; phenotypeIndex252++) {
          var phenotypeData252 = phenotypeList252[phenotypeIndex252];
          output.append('<td>    ', soy.$$escapeHtml(experimentData165.phenotypes[phenotypeData252].males), '/', soy.$$escapeHtml(experimentData165.phenotypes[phenotypeData252].females), '</td>');
        }
        var propertyList259 = experimentData165.propertiesList;
        var propertyListLen259 = propertyList259.length;
        for (var propertyIndex259 = 0; propertyIndex259 < propertyListLen259; propertyIndex259++) {
          var propertyData259 = propertyList259[propertyIndex259];
          output.append('<tr><td>', soy.$$escapeHtml(propertyData259), '</td><td>', soy.$$escapeHtml(experimentData165.parent.female.properties[propertyData259].text), '</td><td>', soy.$$escapeHtml(experimentData165.parent.male.properties[propertyData259].text), '</td>');
          var phenotypeList267 = soy.$$getMapKeys(experimentData165.phenotypes);
          var phenotypeListLen267 = phenotypeList267.length;
          for (var phenotypeIndex267 = 0; phenotypeIndex267 < phenotypeListLen267; phenotypeIndex267++) {
            var phenotypeData267 = phenotypeList267[phenotypeIndex267];
            output.append('<td>', soy.$$escapeHtml(experimentData165.phenotypes[phenotypeData267].properties[propertyData259].text), '</td>');
          }
          output.append('</tr>');
        }
        output.append('</table>');
      } else {
        output.append('<table><tr><th>Sex</th><th>Parents</th><th>Offsprings</th></tr><tr><td>Female</td><td>');
        sg_client_mainframe.strain({strain: experimentData165.parent.female, visuals: experimentData165.visualsVisible, kind: experimentData165.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData165.stats.sex.females), '</td></tr><tr><td>Male</td><td>');
        sg_client_mainframe.strain({strain: experimentData165.parent.male, visuals: experimentData165.visualsVisible, kind: experimentData165.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData165.stats.sex.males), '</td></tr></table>');
      }
    }
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
