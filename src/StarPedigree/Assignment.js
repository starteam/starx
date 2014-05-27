/// <reference path="../StarX/lib/underscore.d.ts" />
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
            console.info("Context for ", this.getName(), this.__context__);
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
    Base.defineStaticRWField(Sex, "id", null);
    Base.defineStaticRWField(Sex, "name", null);

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
        return Individual;
    })(Base);
    exports.Individual = Individual;
    Base.defineStaticRWField(Individual, "id", null);
    Base.readOnlyWrappedListById(Individual, "markers", 'UI');
    Base.readOnlyWrappedFieldById(Individual, "sex", 'UI');
    Base.readOnlyWrappedField(Individual, "location", Location);

    var Relationship = (function (_super) {
        __extends(Relationship, _super);
        function Relationship() {
            _super.apply(this, arguments);
        }
        return Relationship;
    })(Base);
    exports.Relationship = Relationship;
    Base.readOnlyWrappedListById(Individual, "parents", 'UI');
    Base.readOnlyWrappedListById(Individual, "children", 'UI');

    var UI = (function (_super) {
        __extends(UI, _super);
        function UI() {
            _super.apply(this, arguments);
        }
        UI.prototype.sex = function (id) {
            return this.sexes[id];
        };
        return UI;
    })(Base);
    exports.UI = UI;
    Base.readOnlyWrappedList(UI, "individuals", Individual);
    Base.readOnlyWrappedMap(UI, "sexes", Sex);
    Base.readOnlyWrappedMap(UI, "markers", Marker);

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
