/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/underscore.d.ts" />
/// <amd-dependency path="lib/underscore" />

import underscore = require("StarX/lib/underscore");
var _ = underscore._;

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

    get properties() {
        var ret = {};
        var phenotypes = this.__data__['phenotype'];
        console.info("properties");
        console.info(phenotypes);

        if (phenotypes) {
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
        }
        return ret;
    }

}
Base.defineStaticRWField(Strain, "name", "--name not defined--");
Base.readOnlyField(Strain, "id", null);
Base.readOnlyField(Strain, "sex", null);

/**
 * Collapsable defines core UI element
 */
export class Collapsable extends Base {
    expanded:bool = true;
    visualsVisible:bool = true;
    propertiesVisible:bool;
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
    }

    get propertiesList() {
        return this.__data__.propertiesList;
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
Base.defineStaticRWField(Collapsable, "expanded", false);
Base.defineStaticRWField(Collapsable, "visualsVisible", false);
Base.defineStaticRWField(Collapsable, "propertiesVisible", false);
Base.defineStaticRWField(Collapsable, "name", "--name not defined--");
Base.readOnlyWrappedList(Collapsable, "list", Strain);

export class ExperimentStatistics extends Base {
    experiment:Experiment;

    sex_obj:any;

    constructor(e:Experiment)
    {
        this.experiment = e;
        super({});
    }

    public static sex_generate_internal(list)
    {
        var males = 0;
        var females = 0;
        _.each(list,function(e){
            if( e.sex == 'MALE' )
            {
                males++;
            }
            else
            {
                females++;
            }
        });
        return {
            males: males,
            females: females
        };
    }

    get sex()
    {
        if(! this.sex_obj)
        {
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
    constructor(q:{}) {
        if (typeof(q['parents']) === 'undefined') {
            q['parents'] = [];
        }
        super(q);
    }

    addParent(s:Strain):void {
        if (this.parents.length < 2) {
            if (this.parents.length == 1) {
                //TODO: Depending on the model, it is possible that sex needs to be different...
                if( this.parents[0].sex == s.sex )
                {
                    alert( "There is already " + s.sex.toLowerCase() + " parent.");
                    return;
                }
            }
            console.info( "Added here!" ) ;
            this.__data__.parents.push(s.__data__);
        }
    }

    clearParents() {
        this.__data__.parents = [];
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
        if(! this.stats_cache )
        {
            this.stats_cache = new ExperimentStatistics(this);
        }
        return this.stats_cache;
    }

    get parent():{[s:string]:Strain} {
        var parents = this.parents;
        var ret = {};
        _.each( parents, function(p) {
            ret[ p.sex == 'MALE' ? 'male' : 'female' ] = p ;
        });
        return ret;
    }

    get phenotypes():any {
        var group = _.groupBy(this.list , function(q) { return JSON.stringify(q.properties)});
        var ret = {};
        _.map(group, function(value,key){
            var sex_obj = ExperimentStatistics.sex_generate_internal( value );
            ret[key] = {
                list: value,
                males:sex_obj.males,
                females:sex_obj.females,
                properties: value[0].properties,
                top_male: _.find(value, function(e) { return e.sex == 'MALE'}),
                top_female:_.find(value, function(e) { return e.sex == 'FEMALE'})
            }
        });
        return ret;
    }


}
Base.readOnlyWrappedList(Experiment, "parents", Strain);
Base.readOnlyField(Experiment, "id", null);

/**
 * Strains box
 */
export class Strains extends Collapsable {

}

export class NewExperiment extends Experiment {
}

export class Experiments extends Base {
    list:Experiment[];

    update_experiment(experiment:Experiment) {
        var exp = _.find(this.list, function (e) {
            return(e.id == experiment.id);
        });
        console.info( "Experiments::update_experiment:" + exp );
        if (!exp) {
            console.info( "Experiments::update_experiment push!" );
            this.__data__.list.unshift(experiment.toJSON());
            console.info( this.__data__.list );
            console.info( this.list );
        }
    }
}
Base.readOnlyWrappedList(Experiments, "list", Experiment);

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
            if( experiment )
            {
                return experiment;
            }
            else
            {
                throw "Error " + str;
            }
        }
    }

    clearNewExperiment() {
        this.__data__.new_experiment = {
            list: []
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
