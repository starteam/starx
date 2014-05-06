/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
/// <reference path="../StarX/lib/underscore.d.ts" />
/// <reference path="../StarGenetics/visualizers/property_name_remap.ts" />
/// <amd-dependency path="jquery-ui" />

import remapper = require("StarGenetics/visualizers/property_name_remap");
import underscore = require("StarX/lib/underscore");
var _ = underscore['_'];

export class Base {
    __data__:any;

    constructor(jsonmodel:any) {
        this.__data__ = jsonmodel;
    }

    toJSON():any {
        return this.__data__;
    }

    static defineStaticRWField(cls, name, default_value) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                if (typeof this.__data__[name] === 'undefined') {
                    this.__data__[name] = default_value;
                }
                return this.__data__[name];
            },
            'set': function (q) {
                this.__data__[name] = q;
            },
            'enumerable': true,
            'configurable': true
        });
    }

    static readOnlyField(cls, name, default_value) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                if (typeof this.__data__[name] === 'undefined') {
                    this.__data__[name] = default_value;
                }
                return this.__data__[name];
            },
            'enumerable': true,
            'configurable': true
        });
    }

    static readOnlyWrappedField(cls, name, wrapper) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                if (typeof this.__data__[name] === 'undefined') {
                    throw "__data__[" + name + "] is undefined for " + cls;
                }
                return new wrapper(this.__data__[name]);
            },
            'enumerable': true,
            'configurable': true
        });
    }

    static readOnlyWrappedList(cls, name, wrapper) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                if (typeof this.__data__[name] === 'undefined') {
                    throw "__data__[" + name + "] is undefined for " + cls;
                }
                return _.map(this.__data__[name], function (q) {
                    return new wrapper(q)
                });
            },
            'enumerable': true,
            'configurable': true
        });

    }

    static readOnlyWrappedListReverse(cls, name, wrapper) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                if (typeof this.__data__[name] === 'undefined') {
                    throw "__data__[" + name + "] is undefined for " + cls;
                }
                return _.reverse(_.map(this.__data__[name], function (q) {
                    return new wrapper(q)
                }));
            },
            'enumerable': true,
            'configurable': true
        });

    }

}

/**
 * Strain class
 */
export class Strain extends Base {
    name:string;
    sex:string;
    id:string;
    properties_cached:any = null;
    properties_cached_capitalized:any = null;

    get properties() {
        var ret = {};
        var phenotypes = this.__data__['phenotype'];

        if (phenotypes) {
            if (this.properties_cached == null) {
                _.each(phenotypes, function (v, k) {
                    if (typeof(v) === 'string' && v.charAt(0) == '{') {
                        try {
                            var q = JSON.parse(v);
                            if (typeof( q['text'] === 'string')) {
                                ret[k] = q;
                                return;
                            }
                        } finally {
                        }

                    }
                    ret[k] = {text: v};
                });
                this.properties_cached = ret;
            }
            else {
                ret = this.properties_cached;
            }
        }
        return ret;
    }

    get capitalized_properties():any {
        if (!this.properties_cached_capitalized) {
            function capitalize(str) {
                return remapper.Remapper.transform(str);
            }

            var properties = this.properties;
            var ret = {};
            _.each(properties, function (q, v) {
                ret[capitalize(v)] = { 'text': capitalize(q['text']), 'value': q['value']};
            });
            this.properties_cached_capitalized = ret;
        }
        return this.properties_cached_capitalized;
    }


}
Base.defineStaticRWField(Strain, "name", "--name not defined--");
Base.readOnlyField(Strain, "id", null);
Base.readOnlyField(Strain, "sex", null);

/**
 * Collapsable defines core UI element
 */
export class Collapsable extends Base {
    expanded:boolean;
    visualsVisible:boolean;
    propertiesVisible:boolean;
    showIndividuals:boolean;
    name:string;
    list:Strain[];

    update_properties(list:any[]) {
        var properties = {};
        _.each(list, function (l) {
            _.each(l, function (strain) {
                _.each(strain.properties, function (value, key) {
                    properties[key] = 1;
                });
            });
        });
        this.__data__.propertiesList = _.keys(properties);
        var cp = {}
        this.__data__.capitalized_properties = cp;
        _.each(_.keys(properties), function (e) {
            cp[e] = remapper.Remapper.transform(e);
        });
    }

    get propertiesList() {
        return this.__data__.propertiesList || [];
    }

    get capitalized_properties() {
        return this.__data__.capitalized_properties || [];
    }

    set_list(strains:any[]):void {
        this.__data__.list = strains;
        this.update_properties([this.list]);
    }

    get(id:string) {
        return _.find(this.list, function (element) {
            return element.id == id;
        });
    }
}
Base.defineStaticRWField(Collapsable, "expanded", true);
Base.defineStaticRWField(Collapsable, "visualsVisible", true);
Base.defineStaticRWField(Collapsable, "propertiesVisible", true);
Base.defineStaticRWField(Collapsable, "showIndividuals", false);
Base.defineStaticRWField(Collapsable, "name", "--name not defined--");
Base.readOnlyWrappedList(Collapsable, "list", Strain);

export class ExperimentStatistics extends Base {
    experiment:Experiment;

    sex_obj:any;

    constructor(e:Experiment) {
        this.experiment = e;
        super({});
    }

    public static sex_generate_internal(list) {
        var males = 0;
        var females = 0;
        var males_list = [];
        var females_list = [];
        _.each(list, function (e) {
            if (e.sex == 'MALE') {
                males++;
                males_list.push(e);
            }
            else {
                females++;
                females_list.push(e);
            }
        });
        return {
            males: males,
            females: females,
            males_list: males_list,
            females_list: females_list
        };
    }

    get sex() {
        if (!this.sex_obj) {
            this.sex_obj = ExperimentStatistics.sex_generate_internal(this.experiment.list);
        }
        return this.sex_obj;
    }

}

/**
 * Experiment class adds parents to the mix
 */
export class Experiment extends Collapsable {
    id:string;
    parents:Strain[];
    stats_cache:ExperimentStatistics;
    phenotypes_map:any;
    discarded:boolean;

    constructor(q:{
    }) {
        if (typeof(q['parents']) === 'undefined') {
            q['parents'] = [];
        }
        super(q);
    }

    addParent(s:Strain):boolean {
        if (this.parents.length < 2) {
            if (this.parents.length == 1) {
                //TODO: Depending on the model, it is possible that sex needs to be different...
                if (this.parents[0].sex == s.sex) {
                    alert("There is already a " + s.sex.toLowerCase() + " parent.");
                    return false;
                }
            }
            this.__data__.parents.push(s.__data__);
            return true;
        }
        return false;
    }

    clearParents() {
        this.__data__.parents = [];
    }

    clearParent(id:string) {
        var new_parents = _.filter(this.__data__.parents, function (elem) {
            return elem.id != id;
        });
        this.__data__.parents = new_parents;
    }

    get(id:string):Strain {
        var ret = super.get(id);
        if (ret == null) {
            ret = _.find(this.parents, function (element) {
                return element.id == id;
            });
        }
        return ret;
    }

    get canmate():boolean {
        return ( this.parents.length == 2 );
    }

    get canclearparents():boolean {
        return this.parents.length != 0;
    }

    update_experiment(data:any) {
        this.__data__.list = data.children;
        this.__data__.parents = data.parents;
        this.__data__.name = data.name;
        this.__data__.id = data.id;
        this.stats_cache = undefined;
        this.update_properties([this.list, this.parents]);
    }

    get stats():ExperimentStatistics {
        if (!this.stats_cache) {
            this.stats_cache = new ExperimentStatistics(this);
        }
        return this.stats_cache;
    }

    get parent():{[s:string]:Strain
    } {
        var parents = this.parents;
        var ret:{[s:string]:Strain
        } = {};
        _.each(parents, function (p) {
            ret[ p.sex == 'MALE' ? 'male' : 'female' ] = p;
        });
        return ret;
    }

    get phenotypes():any {
        var self = this;
        var group = _.groupBy(this.list, function (q) {
            return JSON.stringify(q.properties)
        });
        var ret = {};
        _.map(group, function (value, key) {
            var sex_obj = ExperimentStatistics.sex_generate_internal(value);
            if (!self.phenotypes_map[key]) {
                self.phenotypes_map[key] = {
                    start_index_male: 0,
                    show_more_males: false,
                    start_index_female: 0,
                    show_more_females: false
                }
            }
            ret[key] = {
                list: value,
                males: sex_obj.males,
                males_list: sex_obj.males_list,
                females: sex_obj.females,
                females_list: sex_obj.females_list,
                properties: value[0].properties,
                top_male: _.find(value, function (e) {
                    return e.sex == 'MALE'
                }),
                top_female: _.find(value, function (e) {
                    return e.sex == 'FEMALE'
                }),
                get start_index_male():number {
                    return self.phenotypes_map[key].start_index_male;
                },
                set start_index_male(q:number) {
                    if (q < 0) {
                        q = 0
                    }
                    else if (q > sex_obj.males_list.length - 5) {
                        q = sex_obj.males_list.length - 5;
                    }
                    self.phenotypes_map[key].start_index_male = q;
                },
                get show_more_males():boolean {
                    return self.phenotypes_map[key].show_more_males;
                },
                set show_more_males(q:boolean) {
                    self.phenotypes_map[key].show_more_males = q;
                },
                get start_index_female():number {
                    return self.phenotypes_map[key].start_index_female;
                },
                set start_index_female(q:number) {
                    self.phenotypes_map[key].start_index_female = q;
                },
                get show_more_females():boolean {
                    return self.phenotypes_map[key].show_more_females;
                },
                set show_more_females(q:boolean) {
                    self.phenotypes_map[key].show_more_females = q;
                }
            }
        });
        return ret;
    }


}
Base.defineStaticRWField(Experiment, "phenotypes_map", {});
Base.readOnlyWrappedList(Experiment, "parents", Strain);
Base.readOnlyField(Experiment, "id", null);
Base.defineStaticRWField(Experiment, "discarded", false);

/**
 * Strains box
 */
export class Strains extends Collapsable {

    add_strain(s:Strain) {
        if (!this.get(s.id)) {
            this.__data__.list.push(s.__data__);
        }
    }
}

export class NewExperiment extends Experiment {
}

export class Experiments extends Base {
    list:Experiment[];
    show_experiments:number;
    show_experiment:string;

    update_experiment(experiment:Experiment) {
        var exp = _.find(this.list, function (e) {
            return(e.id == experiment.id);
        });
        console.info("Experiments::update_experiment:" + exp);
        if (!exp) {
            console.info("Experiments::update_experiment push!");
            this.__data__.list.unshift(experiment.toJSON());
            console.info(this.__data__.list);
            console.info(this.list);
        }
        this.show_experiment = experiment.id;
    }

    show_more(count:number) {
        this.show_experiments += count;
        if (this.show_experiments < 1) {
            this.show_experiments = 1;
        }
        if (this.show_experiments > this.list.length) {
            this.show_experiments == this.list.length;
        }
    }

    remove(exp:Experiment) {
        var exp_list = this.__data__.list;
        var data_exp = _.find(exp_list, function (e) {
            return e.id == exp.id;
        });
        var index = exp_list.indexOf(data_exp);
        exp_list.splice(index, 1);
        if (exp.id == this.show_experiment) {
            if (exp_list.length > 0) {
                this.show_experiment = exp_list[0].id;
            }
            else {
                this.show_experiment = null;
            }

        }
    }
}
Base.readOnlyWrappedList(Experiments, "list", Experiment);
Base.defineStaticRWField(Experiments, "show_experiments", 0);
Base.defineStaticRWField(Experiments, "show_experiment", undefined);


/**
 * UIModel
 */
export class UIModel extends Base {
    // here we declare fields defined with Base.defineStaticField below
    strains:Strains;
    new_experiment:NewExperiment;
    experiments:Experiments;

    get(str:string):Collapsable {
        if (str == 'strains') {
            return this.strains;
        }
        else if (str == 'new_experiment') {
            return this.new_experiment;
        }
        else {
            var experiment = _.find(this.experiments.list, function (e) {
                return e.id == str
            });
            if (experiment) {
                return experiment;
            }
            else {
                throw "Error " + str;
            }
        }
    }

    clearNewExperiment() {
        this.__data__.new_experiment = {
            list: [],
            expanded: true
        }
    }
}
Base.readOnlyWrappedField(UIModel, "strains", Strains);
Base.readOnlyWrappedField(UIModel, "new_experiment", NewExperiment);
Base.readOnlyWrappedField(UIModel, "experiments", Experiments);


/**
 * Top wraps JSON its structure is:
 *      model -- this is passed to GWT
 *      ui -- this is wrapped by UIModel
 */
export class Top extends Base {
    // here we declare fields defined with Base.defineStaticField below
    backend:any;
    ui:UIModel;
}
Base.defineStaticRWField(Top, "backend", {});
Base.readOnlyWrappedField(Top, "ui", UIModel);
