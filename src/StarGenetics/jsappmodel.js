/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
/// <reference path="../StarX/lib/underscore.d.ts" />
/// <reference path="../StarGenetics/visualizers/property_name_remap.ts" />
/// <amd-dependency path="jquery-ui" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "StarGenetics/visualizers/property_name_remap", "StarX/lib/underscore", "jquery-ui"], function(require, exports, remapper, underscore) {
    var _ = underscore['_'];

    var Base = (function () {
        function Base(jsonmodel) {
            this.__data__ = jsonmodel;
        }
        Base.prototype.toJSON = function () {
            return this.__data__;
        };

        Base.defineStaticRWField = function (cls, name, default_value) {
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
        };

        Base.readOnlyField = function (cls, name, default_value) {
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
        };

        Base.readOnlyWrappedField = function (cls, name, wrapper) {
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
        };

        Base.readOnlyWrappedList = function (cls, name, wrapper) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    if (typeof this.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    return _.map(this.__data__[name], function (q) {
                        return new wrapper(q);
                    });
                },
                'enumerable': true,
                'configurable': true
            });
        };

        Base.readOnlyWrappedListReverse = function (cls, name, wrapper) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    if (typeof this.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    return _.reverse(_.map(this.__data__[name], function (q) {
                        return new wrapper(q);
                    }));
                },
                'enumerable': true,
                'configurable': true
            });
        };
        return Base;
    })();
    exports.Base = Base;

    /**
    * Strain class
    */
    var Strain = (function (_super) {
        __extends(Strain, _super);
        function Strain() {
            _super.apply(this, arguments);
            this.properties_cached = null;
            this.properties_cached_capitalized = null;
        }
        Object.defineProperty(Strain.prototype, "properties", {
            get: function () {
                var ret = {};
                var phenotypes = this.__data__['phenotype'];

                if (phenotypes) {
                    if (this.properties_cached == null) {
                        _.each(phenotypes, function (v, k) {
                            if (typeof (v) === 'string' && v.charAt(0) == '{') {
                                try  {
                                    var q = JSON.parse(v);
                                    if (typeof (q['text'] === 'string')) {
                                        ret[k] = q;
                                        return;
                                    }
                                } finally {
                                }
                            }
                            ret[k] = { text: v };
                        });
                        this.properties_cached = ret;
                    } else {
                        ret = this.properties_cached;
                    }
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Strain.prototype, "capitalized_properties", {
            get: function () {
                if (!this.properties_cached_capitalized) {
                    function capitalize(str) {
                        return remapper.Remapper.transform(str);
                    }

                    var properties = this.properties;
                    var ret = {};
                    _.each(properties, function (q, v) {
                        ret[capitalize(v)] = { 'text': capitalize(q['text']), 'value': q['value'] };
                    });
                    this.properties_cached_capitalized = ret;
                }
                return this.properties_cached_capitalized;
            },
            enumerable: true,
            configurable: true
        });
        return Strain;
    })(Base);
    exports.Strain = Strain;
    Base.defineStaticRWField(Strain, "name", "--name not defined--");
    Base.readOnlyField(Strain, "id", null);
    Base.readOnlyField(Strain, "sex", null);

    /**
    * Collapsable defines core UI element
    */
    var Collapsable = (function (_super) {
        __extends(Collapsable, _super);
        function Collapsable() {
            _super.apply(this, arguments);
        }
        Collapsable.prototype.update_properties = function (list) {
            var properties = {};
            _.each(list, function (l) {
                _.each(l, function (strain) {
                    _.each(strain.properties, function (value, key) {
                        properties[key] = 1;
                    });
                });
            });
            this.__data__.propertiesList = _.keys(properties);
            var cp = {};
            this.__data__.capitalized_properties = cp;
            _.each(_.keys(properties), function (e) {
                cp[e] = remapper.Remapper.transform(e);
            });
        };

        Object.defineProperty(Collapsable.prototype, "propertiesList", {
            get: function () {
                return this.__data__.propertiesList || [];
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Collapsable.prototype, "capitalized_properties", {
            get: function () {
                return this.__data__.capitalized_properties || [];
            },
            enumerable: true,
            configurable: true
        });

        Collapsable.prototype.set_list = function (strains) {
            this.__data__.list = strains;
            this.update_properties([this.list]);
        };

        Collapsable.prototype.get = function (id) {
            return _.find(this.list, function (element) {
                return element.id == id;
            });
        };
        return Collapsable;
    })(Base);
    exports.Collapsable = Collapsable;
    Base.defineStaticRWField(Collapsable, "expanded", true);
    Base.defineStaticRWField(Collapsable, "visualsVisible", true);
    Base.defineStaticRWField(Collapsable, "propertiesVisible", false);
    Base.defineStaticRWField(Collapsable, "showIndividuals", false);
    Base.defineStaticRWField(Collapsable, "name", "--name not defined--");
    Base.readOnlyWrappedList(Collapsable, "list", Strain);

    var ExperimentStatistics = (function (_super) {
        __extends(ExperimentStatistics, _super);
        function ExperimentStatistics(e) {
            this.experiment = e;
            _super.call(this, {});
        }
        ExperimentStatistics.sex_generate_internal = function (list) {
            var males = 0;
            var females = 0;
            var males_list = [];
            var females_list = [];
            _.each(list, function (e) {
                if (e.sex == 'MALE') {
                    males++;
                    males_list.push(e);
                } else {
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
        };

        Object.defineProperty(ExperimentStatistics.prototype, "sex", {
            get: function () {
                if (!this.sex_obj) {
                    this.sex_obj = ExperimentStatistics.sex_generate_internal(this.experiment.list);
                }
                return this.sex_obj;
            },
            enumerable: true,
            configurable: true
        });
        return ExperimentStatistics;
    })(Base);
    exports.ExperimentStatistics = ExperimentStatistics;

    /**
    * Experiment class adds parents to the mix
    */
    var Experiment = (function (_super) {
        __extends(Experiment, _super);
        function Experiment(q) {
            if (typeof (q['parents']) === 'undefined') {
                q['parents'] = [];
            }
            _super.call(this, q);
        }
        Experiment.prototype.addParent = function (s) {
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
            } else {
                alert("There is already two parents.");
                return false;
            }
            return false;
        };

        Experiment.prototype.clearParents = function () {
            this.__data__.parents = [];
        };

        Experiment.prototype.clearParent = function (id) {
            var new_parents = _.filter(this.__data__.parents, function (elem) {
                return elem.id != id;
            });
            this.__data__.parents = new_parents;
        };

        Experiment.prototype.get = function (id) {
            var ret = _super.prototype.get.call(this, id);
            if (ret == null) {
                ret = _.find(this.parents, function (element) {
                    return element.id == id;
                });
            }
            return ret;
        };

        Object.defineProperty(Experiment.prototype, "canmate", {
            get: function () {
                return (this.parents.length == 2);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Experiment.prototype, "canclearparents", {
            get: function () {
                return this.parents.length != 0;
            },
            enumerable: true,
            configurable: true
        });

        Experiment.prototype.update_experiment = function (data) {
            this.__data__.list = data.children;
            this.__data__.parents = data.parents;
            this.__data__.name = data.name;
            this.__data__.id = data.id;
            this.stats_cache = undefined;
            this.update_properties([this.list, this.parents]);
        };

        Object.defineProperty(Experiment.prototype, "stats", {
            get: function () {
                if (!this.stats_cache) {
                    this.stats_cache = new ExperimentStatistics(this);
                }
                return this.stats_cache;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Experiment.prototype, "parent", {
            get: function () {
                var parents = this.parents;
                var ret = {};
                _.each(parents, function (p) {
                    ret[p.sex == 'MALE' ? 'male' : 'female'] = p;
                });
                return ret;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Experiment.prototype, "phenotypes", {
            get: function () {
                var self = this;
                var group = _.groupBy(this.list, function (q) {
                    return JSON.stringify(q.properties);
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
                        };
                    }
                    ret[key] = {
                        list: value,
                        males: sex_obj.males,
                        males_list: sex_obj.males_list,
                        females: sex_obj.females,
                        females_list: sex_obj.females_list,
                        properties: value[0].properties,
                        top_male: _.find(value, function (e) {
                            return e.sex == 'MALE';
                        }),
                        top_female: _.find(value, function (e) {
                            return e.sex == 'FEMALE';
                        }),
                        get start_index_male() {
                            return self.phenotypes_map[key].start_index_male;
                        },
                        set start_index_male(q) {
                            if (q < 0) {
                                q = 0;
                            } else if (q > sex_obj.males_list.length - 5) {
                                q = sex_obj.males_list.length - 5;
                            }
                            self.phenotypes_map[key].start_index_male = q;
                        },
                        get show_more_males() {
                            return self.phenotypes_map[key].show_more_males;
                        },
                        set show_more_males(q) {
                            self.phenotypes_map[key].show_more_males = q;
                        },
                        get start_index_female() {
                            return self.phenotypes_map[key].start_index_female;
                        },
                        set start_index_female(q) {
                            self.phenotypes_map[key].start_index_female = q;
                        },
                        get show_more_females() {
                            return self.phenotypes_map[key].show_more_females;
                        },
                        set show_more_females(q) {
                            self.phenotypes_map[key].show_more_females = q;
                        }
                    };
                });
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        return Experiment;
    })(Collapsable);
    exports.Experiment = Experiment;
    Base.defineStaticRWField(Experiment, "phenotypes_map", {});
    Base.readOnlyWrappedList(Experiment, "parents", Strain);
    Base.readOnlyField(Experiment, "id", null);
    Base.defineStaticRWField(Experiment, "discarded", false);

    /**
    * Strains box
    */
    var Strains = (function (_super) {
        __extends(Strains, _super);
        function Strains() {
            _super.apply(this, arguments);
        }
        Strains.prototype.add_strain = function (s) {
            if (!this.get(s.id)) {
                this.__data__.list.push(s.__data__);
            }
        };
        return Strains;
    })(Collapsable);
    exports.Strains = Strains;

    var NewExperiment = (function (_super) {
        __extends(NewExperiment, _super);
        function NewExperiment() {
            _super.apply(this, arguments);
        }
        return NewExperiment;
    })(Experiment);
    exports.NewExperiment = NewExperiment;

    var Experiments = (function (_super) {
        __extends(Experiments, _super);
        function Experiments() {
            _super.apply(this, arguments);
        }
        Experiments.prototype.update_experiment = function (experiment) {
            var exp = _.find(this.list, function (e) {
                return (e.id == experiment.id);
            });
            console.info("Experiments::update_experiment:" + exp);
            if (!exp) {
                console.info("Experiments::update_experiment push!");
                this.__data__.list.unshift(experiment.toJSON());
                console.info(this.__data__.list);
                console.info(this.list);
            }
            this.show_experiment = experiment.id;
        };

        Experiments.prototype.show_more = function (count) {
            this.show_experiments += count;
            if (this.show_experiments < 1) {
                this.show_experiments = 1;
            }
            if (this.show_experiments > this.list.length) {
                this.show_experiments == this.list.length;
            }
        };

        Experiments.prototype.remove = function (exp) {
            var exp_list = this.__data__.list;
            var data_exp = _.find(exp_list, function (e) {
                return e.id == exp.id;
            });
            var index = exp_list.indexOf(data_exp);
            exp_list.splice(index, 1);
            if (exp.id == this.show_experiment) {
                if (exp_list.length > 0) {
                    this.show_experiment = exp_list[0].id;
                } else {
                    this.show_experiment = null;
                }
            }
        };
        return Experiments;
    })(Base);
    exports.Experiments = Experiments;
    Base.readOnlyWrappedList(Experiments, "list", Experiment);
    Base.defineStaticRWField(Experiments, "show_experiments", 0);
    Base.defineStaticRWField(Experiments, "show_experiment", undefined);

    /**
    * UIModel
    */
    var UIModel = (function (_super) {
        __extends(UIModel, _super);
        function UIModel() {
            _super.apply(this, arguments);
        }
        UIModel.prototype.get = function (str) {
            if (str == 'strains') {
                return this.strains;
            } else if (str == 'new_experiment') {
                return this.new_experiment;
            } else {
                var experiment = _.find(this.experiments.list, function (e) {
                    return e.id == str;
                });
                if (experiment) {
                    return experiment;
                } else {
                    throw "Error " + str;
                }
            }
        };

        UIModel.prototype.clearNewExperiment = function () {
            this.__data__.new_experiment = {
                list: [],
                expanded: true
            };
        };
        return UIModel;
    })(Base);
    exports.UIModel = UIModel;
    Base.readOnlyWrappedField(UIModel, "strains", Strains);
    Base.readOnlyWrappedField(UIModel, "new_experiment", NewExperiment);
    Base.readOnlyWrappedField(UIModel, "experiments", Experiments);

    /**
    * Top wraps JSON its structure is:
    *      model -- this is passed to GWT
    *      ui -- this is wrapped by UIModel
    */
    var Top = (function (_super) {
        __extends(Top, _super);
        function Top() {
            _super.apply(this, arguments);
        }
        return Top;
    })(Base);
    exports.Top = Top;
    Base.defineStaticRWField(Top, "backend", {});
    Base.readOnlyWrappedField(Top, "ui", UIModel);
});
//# sourceMappingURL=jsappmodel.js.map
