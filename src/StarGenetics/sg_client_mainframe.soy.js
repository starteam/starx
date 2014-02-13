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
  output.append('<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'', soy.$$escapeHtml(opt_data.kind), '\' data-id="', soy.$$escapeHtml(opt_data.strain['id']), '"><div class=\'sg_strain_title\'>', soy.$$escapeHtml(opt_data.strain['name']), ' ', (opt_data.strain['sex'] == 'FEMALE') ? 'F' : 'M', '</div></div>');
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
          output.append('<td class=\'sg_strain_box sg_s_row_head\'>', soy.$$escapeHtml(strainData99['sex']), '</td>');
        }
        output.append('</tr>');
      }
      var propertyList105 = opt_data.strains.propertiesList;
      var propertyListLen105 = propertyList105.length;
      for (var propertyIndex105 = 0; propertyIndex105 < propertyListLen105; propertyIndex105++) {
        var propertyData105 = propertyList105[propertyIndex105];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData105), '</td>');
        var strainList109 = opt_data.strains.list;
        var strainListLen109 = strainList109.length;
        for (var strainIndex109 = 0; strainIndex109 < strainListLen109; strainIndex109++) {
          var strainData109 = strainList109[strainIndex109];
          output.append('<td class=\'sg_strain_box\'>', soy.$$escapeHtml(strainData109.properties[propertyData105].text), '</td>');
        }
        output.append('</tr>');
      }
      output.append('</table>');
    } else {
      var strainList118 = opt_data.strains.list;
      var strainListLen118 = strainList118.length;
      for (var strainIndex118 = 0; strainIndex118 < strainListLen118; strainIndex118++) {
        var strainData118 = strainList118[strainIndex118];
        sg_client_mainframe.strain({strain: strainData118, visuals: opt_data.strains.visualsVisible, kind: 'strains'}, output);
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
  var experimentList179 = opt_data.experiments.list;
  var experimentListLen179 = experimentList179.length;
  for (var experimentIndex179 = 0; experimentIndex179 < experimentListLen179; experimentIndex179++) {
    var experimentData179 = experimentList179[experimentIndex179];
    output.append('<div class=\'sg_experiment_box\'><!-- header --><div class=\'sg_title_box\'>', soy.$$escapeHtml(experimentData179.name), (experimentData179.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData179.id) + '\' data-expanded=\'false\'>Collaps</button>' + ((experimentData179.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData179.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData179.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') + ((experimentData179.showIndividuals) ? '<button class=\'sg_strain_show_individuals\' data-kind=\'' + soy.$$escapeHtml(experimentData179.id) + '\'  data-show-individuals=\'false\'>Group flies</button>' : '<button class=\'sg_strain_show_individuals\' data-kind=\'' + soy.$$escapeHtml(experimentData179.id) + '\' data-show-individuals=\'true\'>Ungroup flies</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData179.id) + '\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (experimentData179.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(experimentData179.id) + '">Rename</button>' : '', (experimentData179.canmate) ? '<button class=\'sg_experiment_mate\' data-kind="' + soy.$$escapeHtml(experimentData179.id) + '">Add progenies</button>' : '', '</div>');
    if (experimentData179.expanded) {
      output.append('<!-- expanded body -->');
      if (experimentData179.propertiesVisible) {
        output.append('<table><tr><th>Name</th><th>', soy.$$escapeHtml(experimentData179.parent.female.name), '</th><th>', soy.$$escapeHtml(experimentData179.parent.male.name), '</th>');
        var phenotypeList231 = soy.$$getMapKeys(experimentData179.phenotypes);
        var phenotypeListLen231 = phenotypeList231.length;
        for (var phenotypeIndex231 = 0; phenotypeIndex231 < phenotypeListLen231; phenotypeIndex231++) {
          var phenotypeData231 = phenotypeList231[phenotypeIndex231];
          output.append('<th>', soy.$$escapeHtml(phenotypeData231.short_description), '</th>');
        }
        output.append('</tr>');
        if (experimentData179.visualsVisible) {
          output.append('<tr><td>Visual</td><td>');
          sg_client_mainframe.strain({strain: experimentData179.parent.female, visuals: experimentData179.visualsVisible, kind: experimentData179.id}, output);
          output.append('</td><td>');
          sg_client_mainframe.strain({strain: experimentData179.parent.male, visuals: experimentData179.visualsVisible, kind: experimentData179.id}, output);
          output.append('</td>');
          var phenotypeList250 = soy.$$getMapKeys(experimentData179.phenotypes);
          var phenotypeListLen250 = phenotypeList250.length;
          for (var phenotypeIndex250 = 0; phenotypeIndex250 < phenotypeListLen250; phenotypeIndex250++) {
            var phenotypeData250 = phenotypeList250[phenotypeIndex250];
            output.append('<td>');
            sg_client_mainframe.strain({strain: experimentData179.phenotypes[phenotypeData250].top_male, count: experimentData179.phenotypes[phenotypeData250].males, visuals: experimentData179.visualsVisible, kind: experimentData179.id}, output);
            sg_client_mainframe.strain({strain: experimentData179.phenotypes[phenotypeData250].top_female, count: experimentData179.phenotypes[phenotypeData250].females, visuals: experimentData179.visualsVisible, kind: experimentData179.id}, output);
            output.append('</td>');
          }
          output.append('</tr>');
        }
        if (experimentData179.showIndividuals) {
          output.append('<tr><td><!-- individual --></td><td><!-- parent 1 --></td><td><!-- parent 2 --></td>');
          var phenotypeList268 = soy.$$getMapKeys(experimentData179.phenotypes);
          var phenotypeListLen268 = phenotypeList268.length;
          for (var phenotypeIndex268 = 0; phenotypeIndex268 < phenotypeListLen268; phenotypeIndex268++) {
            var phenotypeData268 = phenotypeList268[phenotypeIndex268];
            output.append('<td>');
            var strainList270 = experimentData179.phenotypes[phenotypeData268].list;
            var strainListLen270 = strainList270.length;
            for (var strainIndex270 = 0; strainIndex270 < strainListLen270; strainIndex270++) {
              var strainData270 = strainList270[strainIndex270];
              sg_client_mainframe.strain_short({strain: strainData270, kind: experimentData179.id}, output);
            }
            output.append('</td>');
          }
          output.append('</tr>');
        }
        output.append('<tr><td>Sex (M/F)</td><td>0/1</td><td>1/0</td>');
        var phenotypeList279 = soy.$$getMapKeys(experimentData179.phenotypes);
        var phenotypeListLen279 = phenotypeList279.length;
        for (var phenotypeIndex279 = 0; phenotypeIndex279 < phenotypeListLen279; phenotypeIndex279++) {
          var phenotypeData279 = phenotypeList279[phenotypeIndex279];
          output.append('<td>    ', soy.$$escapeHtml(experimentData179.phenotypes[phenotypeData279].males), '/', soy.$$escapeHtml(experimentData179.phenotypes[phenotypeData279].females), '</td>');
        }
        var propertyList286 = experimentData179.propertiesList;
        var propertyListLen286 = propertyList286.length;
        for (var propertyIndex286 = 0; propertyIndex286 < propertyListLen286; propertyIndex286++) {
          var propertyData286 = propertyList286[propertyIndex286];
          output.append('<tr><td>', soy.$$escapeHtml(propertyData286), '</td><td>', soy.$$escapeHtml(experimentData179.parent.female.properties[propertyData286].text), '</td><td>', soy.$$escapeHtml(experimentData179.parent.male.properties[propertyData286].text), '</td>');
          var phenotypeList294 = soy.$$getMapKeys(experimentData179.phenotypes);
          var phenotypeListLen294 = phenotypeList294.length;
          for (var phenotypeIndex294 = 0; phenotypeIndex294 < phenotypeListLen294; phenotypeIndex294++) {
            var phenotypeData294 = phenotypeList294[phenotypeIndex294];
            output.append('<td>', soy.$$escapeHtml(experimentData179.phenotypes[phenotypeData294].properties[propertyData286].text), '</td>');
          }
          output.append('</tr>');
        }
        output.append('</table>');
      } else {
        output.append('<table><tr><th>Sex</th><th>Parents</th><th>Offsprings</th></tr><tr><td>Female</td><td>');
        sg_client_mainframe.strain({strain: experimentData179.parent.female, visuals: experimentData179.visualsVisible, kind: experimentData179.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData179.stats.sex.females), '</td></tr><tr><td>Male</td><td>');
        sg_client_mainframe.strain({strain: experimentData179.parent.male, visuals: experimentData179.visualsVisible, kind: experimentData179.id}, output);
        output.append('</td><td>', soy.$$escapeHtml(experimentData179.stats.sex.males), '</td></tr></table>');
      }
    }
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
