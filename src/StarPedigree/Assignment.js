/// <reference path="../StarX/lib/underscore.d.ts" />
/// <reference path="../StarPedigree/widget_template.soy.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "StarX/lib/underscore"], function(require, exports, underscore) {
    var _ = underscore['_'];

    var Base = (function () {
        function Base(jsonmodel, context) {
            if (typeof context === "undefined") { context = {}; }
            this.__cache__ = {};
            this.__data__ = jsonmodel;
            this.__context__ = _.clone(context || {});
            this.__context__[this.getName()] = this;
        }
        Base.prototype.getName = function () {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "";
        };

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
                    var self = this;
                    if (typeof self.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }

                    var rebuild_cache = false;
                    if (!this.__cache__[name]) {
                        rebuild_cache = true;
                    } else if (this.__cache__[name].__data__ !== self.__data__[name]) {
                        rebuild_cache = true;
                    }
                    if (rebuild_cache) {
                        this.__cache__[name] = new wrapper(self.__data__[name], self.__context__);
                    }
                    return this.__cache__[name];
                },
                'enumerable': true,
                'configurable': true
            });
        };

        /**
        * Wrapper function
        * @param cls Class to extend
        * @param name name of data field containing ID, and name of factory's method that ID is passed to
        * @param context_id name of factory class pulled from context
        */
        Base.readOnlyWrappedFieldById = function (cls, name, context_id) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    var self = this;
                    if (typeof self.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    var factory = self.__context__[context_id];
                    return factory[name](self.__data__[name]);
                },
                'enumerable': true,
                'configurable': true
            });
        };

        Base.readOnlyWrappedMap = function (cls, name, wrapper) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    var self = this;
                    if (typeof self.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    if (Base.is_rebuild_cache(self, name)) {
                        var raw_array = self.__data__[name];
                        var cache = {
                            __cache_data__: self.__data__[name]
                        };
                        _.each(raw_array, function (e) {
                            cache[e.id] = new wrapper(e, self.__context__);
                        });
                        Base.set_cache(self, name, cache);
                    }
                    return this.__cache__[name];
                },
                'enumerable': true,
                'configurable': true
            });
        };

        Base.is_rebuild_cache = function (self, name) {
            var rebuild_cache = false;
            if (!self.__cache__[name]) {
                rebuild_cache = true;
            } else if (self.__cache__[name].__cache_data__ !== self.__data__[name]) {
                rebuild_cache = true;
            }
            return rebuild_cache;
        };

        Base.set_cache = function (self, name, obj) {
            obj['__cache_data__'] = self.__data__[name];
            self.__cache__[name] = obj;
        };

        Base.readOnlyWrappedList = function (cls, name, wrapper) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    var self = this;
                    if (typeof self.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    if (Base.is_rebuild_cache(self, name)) {
                        var raw_array = self.__data__[name];
                        var cache = _.map(self.__data__[name], function (q) {
                            return new wrapper(q, self.__context__);
                        });
                        Base.set_cache(self, name, cache);
                    }
                    return self.__cache__[name];
                },
                'enumerable': true,
                'configurable': true
            });
        };

        Base.readOnlyWrappedListById = function (cls, name, context_id) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    var self = this;
                    if (typeof self.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    var list = this.__context__[context_id][name];
                    var ret = _.map(self.__data__[name], function (q) {
                        return list[q] || q;
                    });
                    return ret;
                },
                'enumerable': true,
                'configurable': true
            });
        };

        Base.readOnlyWrappedListReverse = function (cls, name, wrapper) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    var self = this;
                    if (typeof self.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    return _.reverse(_.map(self.__data__[name], function (q) {
                        return new wrapper(q, self.__context__);
                    }));
                },
                'enumerable': true,
                'configurable': true
            });
        };
        return Base;
    })();
    exports.Base = Base;

    var Sex = (function (_super) {
        __extends(Sex, _super);
        function Sex() {
            _super.apply(this, arguments);
        }
        return Sex;
    })(Base);
    exports.Sex = Sex;
    Base.defineStaticRWField(Sex, "id", null);
    Base.defineStaticRWField(Sex, "kind", null);

    var Marker = (function (_super) {
        __extends(Marker, _super);
        function Marker() {
            _super.apply(this, arguments);
        }
        return Marker;
    })(Base);
    exports.Marker = Marker;
    Base.defineStaticRWField(Marker, "id", null);
    Base.defineStaticRWField(Marker, "name", null);
    Base.defineStaticRWField(Marker, "kind", null);

    var Location = (function (_super) {
        __extends(Location, _super);
        function Location() {
            _super.apply(this, arguments);
        }
        return Location;
    })(Base);
    exports.Location = Location;
    Base.defineStaticRWField(Location, "layout", null);
    Base.defineStaticRWField(Location, "row", null);
    Base.defineStaticRWField(Location, "column", null);

    var Individual = (function (_super) {
        __extends(Individual, _super);
        function Individual() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Individual.prototype, "affected", {
            get: function () {
                var self = this;
                var affected = false;
                var symbol_markers = this.__context__['UI'].options['symbol_markers'] || [];
                _.each(symbol_markers, function (id) {
                    var marker = _.find(self.markers, function (marker) {
                        return id == marker.id;
                    });
                    if (marker) {
                        affected = true;
                    }
                });
                return affected;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Individual.prototype, "parents", {
            get: function () {
                var relationship = this.child_relationship;
                if (relationship) {
                    return relationship.parents;
                } else {
                    return [];
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Individual.prototype, "children", {
            get: function () {
                var relationship = this.parent_relationship;
                if (relationship) {
                    return relationship.children;
                } else {
                    return [];
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Individual.prototype, "child_relationship", {
            get: function () {
                var self = this;
                var relationships = this.__context__['UI'].relationships;
                var relationship = _.find(relationships, function (e) {
                    var c = e.children;
                    return _.find(c, function (ee) {
                        return ee.id == self.id;
                    });
                });
                return relationship;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Individual.prototype, "parent_relationship", {
            get: function () {
                var self = this;
                var relationships = this.__context__['UI'].relationships;
                var relationship = _.find(relationships, function (e) {
                    var c = e.parents;
                    console.info("Checking ", e.parents[0].id, e.parents[1].id);
                    return _.find(c, function (ee) {
                        return ee.id == self.id;
                    });
                });
                return relationship;
            },
            enumerable: true,
            configurable: true
        });

        Individual.prototype.is_genotype = function (diploidAllelesArray) {
            var self = this;
            var ret = 0;

            function compare_diploidAlleles(a, b) {
                var first = (a[0] == b[0] && a[1] == b[1]);
                var second = (a[0] == b[1] && a[1] == b[0]);
                return first || second;
            }

            var alleles = [];
            var genotype_map = self.__data__.genotype;
            _.each(genotype_map, function (diploidArray) {
                _.each(diploidArray, function (thisDiploid) {
                    alleles.push(thisDiploid);
                });
            });

            _.each(diploidAllelesArray, function (thatDiploid) {
                var exist = false;
                _.each(alleles, function (thisDiploid) {
                    var cmp = compare_diploidAlleles(thatDiploid, thisDiploid);
                    if (cmp) {
                        alleles = _.without(alleles, thisDiploid);
                    }
                    exist = exist || cmp;
                });
                ret = ret + (exist ? 1 : 0);
            });
            console.info("is_genotype", ret == 2);
            return ret == 2;
        };

        Object.defineProperty(Individual.prototype, "genotype", {
            get: function () {
                if (this.ui_metadata && this.ui_metadata['genotype']) {
                    var f = _.flatten(this.ui_metadata['genotype']);
                    var ret = [];
                    for (var i = 0; i < f.length; i += 2) {
                        ret.push(f[i]);
                    }
                    for (var i = 1; i < f.length; i += 2) {
                        ret.push(f[i]);
                    }
                    return ret;
                } else {
                    var ret = [];
                    for (var i = 0; i < 20; i++) {
                        ret.push('');
                    }
                    return ret;
                }
            },
            enumerable: true,
            configurable: true
        });
        return Individual;
    })(Base);
    exports.Individual = Individual;
    Base.defineStaticRWField(Individual, "id", null);
    Base.readOnlyWrappedListById(Individual, "markers", 'UI');
    Base.readOnlyWrappedFieldById(Individual, "sex", 'UI');
    Base.readOnlyWrappedField(Individual, "location", Location);
    Base.defineStaticRWField(Individual, "ui_metadata", {});

    var Relationship = (function (_super) {
        __extends(Relationship, _super);
        function Relationship() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Relationship.prototype, "children_column_span", {
            get: function () {
                var children = this.children;
                var min = children[0].location;
                _.each(children, function (c) {
                    if (c.location.column < min.column) {
                        min = c.location;
                    }
                });
                var max = children[0].location;
                _.each(children, function (c) {
                    if (c.location.column > max.column) {
                        max = c.location;
                    }
                });
                return [min, max];
            },
            enumerable: true,
            configurable: true
        });
        return Relationship;
    })(Base);
    exports.Relationship = Relationship;
    Base.readOnlyWrappedListById(Relationship, "parents", 'UI');
    Base.readOnlyWrappedListById(Relationship, "children", 'UI');

    var UI = (function (_super) {
        __extends(UI, _super);
        function UI() {
            _super.apply(this, arguments);
        }
        UI.prototype.sex = function (id) {
            return this.sexes[id];
        };

        Object.defineProperty(UI.prototype, "individuals_as_map", {
            get: function () {
                var ret = {};
                _.each(this.individuals, function (q) {
                    ret[q.id] = q;
                });
                return ret;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UI.prototype, "parents", {
            get: function () {
                return this.individuals_as_map;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UI.prototype, "children", {
            get: function () {
                return this.individuals_as_map;
            },
            enumerable: true,
            configurable: true
        });
        return UI;
    })(Base);
    exports.UI = UI;
    Base.readOnlyWrappedList(UI, "individuals", Individual);
    Base.readOnlyWrappedList(UI, "relationships", Relationship);
    Base.readOnlyWrappedMap(UI, "sexes", Sex);
    Base.readOnlyWrappedMap(UI, "markers", Marker);
    Base.readOnlyField(UI, "options", {});

    var Assignment = (function (_super) {
        __extends(Assignment, _super);
        function Assignment() {
            _super.apply(this, arguments);
        }
        return Assignment;
    })(Base);
    exports.Assignment = Assignment;
    Base.readOnlyWrappedField(Assignment, "ui", UI);
});
//# sourceMappingURL=Assignment.js.map
