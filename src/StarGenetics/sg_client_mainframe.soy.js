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
  output.append('<div class=\'sg_main\'><button class=\'sg_open_ps\'>Open</button></div><div class=\'sg_main\'><button class=\'sg_open_ps\'>Close</button></div><div class=\'sg_workspace\' id=\'', soy.$$escapeHtml(opt_data.config.element_id + '_workspace'), '\'>Workspace</div>');
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
  output.append('<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id="', soy.$$escapeHtml(opt_data.strain['id']), '"><div class=\'sg_strain_title\'>', soy.$$escapeHtml(opt_data.strain['name']), '</div>', (opt_data.visuals) ? '<div class=\'sg_strain_visual\'><canvas data-kind=\'' + soy.$$escapeHtml(opt_data.kind) + '\' data-id=\'' + soy.$$escapeHtml(opt_data.strain['id']) + '\'></canvas></div>' : '', '</div>');
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
      var strainList54 = opt_data.strains.list;
      var strainListLen54 = strainList54.length;
      for (var strainIndex54 = 0; strainIndex54 < strainListLen54; strainIndex54++) {
        var strainData54 = strainList54[strainIndex54];
        output.append('<td class=\'sg_strain_box sg_s_row_head\'>', soy.$$escapeHtml(strainData54['name']), '</td>');
      }
      output.append('</thead>');
      if (opt_data.strains.visualsVisible) {
        output.append('<tr><td class=\'sg_s_col_head\'>Visual</td>');
        var strainList63 = opt_data.strains.list;
        var strainListLen63 = strainList63.length;
        for (var strainIndex63 = 0; strainIndex63 < strainListLen63; strainIndex63++) {
          var strainData63 = strainList63[strainIndex63];
          output.append('<td class=\'sg_strain_box\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData63['id']), '"><div class=\'sg_strain_visual\'><canvas data-kind=\'strains\' data-id=\'', soy.$$escapeHtml(strainData63['id']), '\'></canvas></div></td>');
        }
        output.append('</tr>');
      }
      var propertyList71 = opt_data.strains.propertiesList;
      var propertyListLen71 = propertyList71.length;
      for (var propertyIndex71 = 0; propertyIndex71 < propertyListLen71; propertyIndex71++) {
        var propertyData71 = propertyList71[propertyIndex71];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData71), '</td>');
        var strainList75 = opt_data.strains.list;
        var strainListLen75 = strainList75.length;
        for (var strainIndex75 = 0; strainIndex75 < strainListLen75; strainIndex75++) {
          var strainData75 = strainList75[strainIndex75];
          output.append('<td class=\'sg_strain_box\'>', soy.$$escapeHtml(strainData75.properties[propertyData71].text), '</td>');
        }
        output.append('</tr>');
      }
      output.append('</table>');
    } else {
      var strainList84 = opt_data.strains.list;
      var strainListLen84 = strainList84.length;
      for (var strainIndex84 = 0; strainIndex84 < strainListLen84; strainIndex84++) {
        var strainData84 = strainList84[strainIndex84];
        sg_client_mainframe.strain({strain: strainData84, visuals: opt_data.strains.visualsVisible, kind: 'strains'}, output);
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
  var experimentList147 = opt_data.experiments.list;
  var experimentListLen147 = experimentList147.length;
  for (var experimentIndex147 = 0; experimentIndex147 < experimentListLen147; experimentIndex147++) {
    var experimentData147 = experimentList147[experimentIndex147];
    output.append('<div class=\'sg_experiment_box\'><!-- header --><div class=\'sg_title_box\'>', soy.$$escapeHtml(experimentData147.name), (experimentData147.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData147.id) + '\' data-expanded=\'false\'>Collaps</button>' + ((experimentData147.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData147.id) + '\'  data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData147.id) + '\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((experimentData147.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData147.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData147.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData147.id) + '\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (experimentData147.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(experimentData147.id) + '">Rename</button>' : '', (experimentData147.canmate) ? '<button class=\'sg_experiment_mate\'>Add progenies</button>' : '', '</div>');
    if (experimentData147.expanded) {
      output.append('<!-- expanded body -->');
      if (experimentData147.propertiesVisible) {
        output.append('<table><tr><th>Name</th><th>', soy.$$escapeHtml(experimentData147.parent.female.name), '</th><th>', soy.$$escapeHtml(experimentData147.parent.male.name), '</th>');
        var phenotypeList197 = soy.$$getMapKeys(experimentData147.phenotypes);
        var phenotypeListLen197 = phenotypeList197.length;
        for (var phenotypeIndex197 = 0; phenotypeIndex197 < phenotypeListLen197; phenotypeIndex197++) {
          var phenotypeData197 = phenotypeList197[phenotypeIndex197];
          output.append('<th>', soy.$$escapeHtml(phenotypeData197), '</th>');
        }
        output.append('</tr>');
        if (experimentData147.visualsVisible) {
          output.append('<tr><td>Visual</td><td>');
          sg_client_mainframe.strain({strain: experimentData147.parent.female, visuals: experimentData147.visualsVisible, kind: experimentData147.id}, output);
          output.append('</td><td>');
          sg_client_mainframe.strain({strain: experimentData147.parent.male, visuals: experimentData147.visualsVisible, kind: experimentData147.id}, output);
          output.append('</td>');
          var phenotypeList216 = soy.$$getMapKeys(experimentData147.phenotypes);
          var phenotypeListLen216 = phenotypeList216.length;
          for (var phenotypeIndex216 = 0; phenotypeIndex216 < phenotypeListLen216; phenotypeIndex216++) {
            var phenotypeData216 = phenotypeList216[phenotypeIndex216];
            output.append('<td>');
            sg_client_mainframe.strain({strain: experimentData147.phenotypes[phenotypeData216].top_male, visuals: experimentData147.visualsVisible, kind: experimentData147.id}, output);
            sg_client_mainframe.strain({strain: experimentData147.phenotypes[phenotypeData216].top_female, visuals: experimentData147.visualsVisible, kind: experimentData147.id}, output);
            output.append('</td>');
          }
          output.append('</tr>');
        }
        output.append('<tr><td>Sex (M/F)</td><td>0/1</td><td>1/0</td>');
        var phenotypeList230 = soy.$$getMapKeys(experimentData147.phenotypes);
        var phenotypeListLen230 = phenotypeList230.length;
        for (var phenotypeIndex230 = 0; phenotypeIndex230 < phenotypeListLen230; phenotypeIndex230++) {
          var phenotypeData230 = phenotypeList230[phenotypeIndex230];
          output.append('<td>    ', soy.$$escapeHtml(experimentData147.phenotypes[phenotypeData230].males), '/', soy.$$escapeHtml(experimentData147.phenotypes[phenotypeData230].females), '</td>');
        }
        var propertyList237 = experimentData147.propertiesList;
        var propertyListLen237 = propertyList237.length;
        for (var propertyIndex237 = 0; propertyIndex237 < propertyListLen237; propertyIndex237++) {
          var propertyData237 = propertyList237[propertyIndex237];
          output.append('<tr><td>', soy.$$escapeHtml(propertyData237), '</td><td>', soy.$$escapeHtml(experimentData147.parent.female.properties[propertyData237].text), '</td><td>', soy.$$escapeHtml(experimentData147.parent.male.properties[propertyData237].text), '</td>');
          var phenotypeList245 = soy.$$getMapKeys(experimentData147.phenotypes);
          var phenotypeListLen245 = phenotypeList245.length;
          for (var phenotypeIndex245 = 0; phenotypeIndex245 < phenotypeListLen245; phenotypeIndex245++) {
            var phenotypeData245 = phenotypeList245[phenotypeIndex245];
            output.append('<td>', soy.$$escapeHtml(experimentData147.phenotypes[phenotypeData245].properties[propertyData237].text), '</td>');
          }
          output.append('</tr>');
        }
        output.append('</table>');
      } else {
        output.append('<table><tr><th>Sex</th><th>Parents</th><th>Offsprings</th></tr><tr><td>Female</td><td>');
        sg_client_mainframe.strain({strain: experimentData147.parent.female, visuals: experimentData147.visualsVisible, kind: experimentData147.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData147.stats.sex.females), '</td></tr><tr><td>Male</td><td>');
        sg_client_mainframe.strain({strain: experimentData147.parent.male, visuals: experimentData147.visualsVisible, kind: experimentData147.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData147.stats.sex.males), '</td></tr></table>');
      }
    }
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
