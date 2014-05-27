/// <reference path="../StarX/lib/underscore.d.ts" />

import underscore = require("StarX/lib/underscore");
var _ = underscore['_'];

export class Base {
    __data__:any;
    __context__:any;
    __cache__:any = {};

    constructor(jsonmodel:any, context:any = {}) {
        this.__data__ = jsonmodel;
        this.__context__ = _.clone(context || {});
        this.__context__[this.getName()] = this;
        console.info("Context for ", this.getName(), this.__context__);
    }

    getName() {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((this).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
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
                var self = this;
                if (typeof self.__data__[name] === 'undefined') {
                    throw "__data__[" + name + "] is undefined for " + cls;
                }

                var rebuild_cache = false;
                if (!this.__cache__[name]) {
                    rebuild_cache = true;
                }
                else if (this.__cache__[name].__data__ !== self.__data__[name]) {
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
    }

    /**
     * Wrapper function
     * @param cls Class to extend
     * @param name name of data field containing ID, and name of factory's method that ID is passed to
     * @param context_id name of factory class pulled from context
     */
    static readOnlyWrappedFieldById(cls, name, context_id) {
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
    }

    static readOnlyWrappedMap(cls, name, wrapper) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                var self = this;
                if (typeof self.__data__[name] === 'undefined') {
                    throw "__data__[" + name + "] is undefined for " + cls;
                }
                if (Base.is_rebuild_cache(self,name)) {
                    var raw_array = self.__data__[name];
                    var cache = {
                        __cache_data__: self.__data__[name]
                    };
                    _.each(raw_array, function (e) {
                        cache[e.id] = new wrapper(e, self.__context__);
                    });
                    Base.set_cache(self,name,cache);
                }
                return this.__cache__[name];


            },
            'enumerable': true,
            'configurable': true
        });
    }

    static is_rebuild_cache(self:Base,name:string):boolean {
        var rebuild_cache = false;
        if (!self.__cache__[name]) {
            rebuild_cache = true;
        } else if (self.__cache__[name].__cache_data__ !== self.__data__[name]) {
            rebuild_cache = true;
        }
        return rebuild_cache;
    }

    static set_cache(self:Base,name:string,obj:any) {
        obj['__cache_data__'] = self.__data__[name];
        self.__cache__[name]=obj;
    }

    static readOnlyWrappedList(cls, name, wrapper) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                var self = this;
                if (typeof self.__data__[name] === 'undefined') {
                    throw "__data__[" + name + "] is undefined for " + cls;
                }
                if (Base.is_rebuild_cache(self,name)) {
                    var raw_array = self.__data__[name];
                    var cache = _.map(self.__data__[name], function (q) {
                        return new wrapper(q, self.__context__);
                    });
                    Base.set_cache(self,name,cache);
                }
                return self.__cache__[name];
            },
            'enumerable': true,
            'configurable': true
        });
    }

    static readOnlyWrappedListById(cls, name, context_id) {
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
    }

    static readOnlyWrappedListReverse(cls, name, wrapper) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                var self = this;
                if (typeof self.__data__[name] === 'undefined') {
                    throw "__data__[" + name + "] is undefined for " + cls;
                }
                return _.reverse(_.map(self.__data__[name], function (q) {
                    return new wrapper(q, self.__context__)
                }));
            },
            'enumerable': true,
            'configurable': true
        });

    }

}


export class Sex extends Base {
    id:string;
}
Base.defineStaticRWField(Sex, "id", null);
Base.defineStaticRWField(Sex, "kind", null);

export class Marker extends Base {
    id:string;
    name:string;
}
Base.defineStaticRWField(Sex, "id", null);
Base.defineStaticRWField(Sex, "name", null);

export class Location extends Base {
    layout:string;
    row:number;
    column:number;
}
Base.defineStaticRWField(Location, "layout", null);
Base.defineStaticRWField(Location, "row", null);
Base.defineStaticRWField(Location, "column", null);

export class Individual extends Base {
    id:string;
    markers:Marker[];
    sex:Sex;
    location:Location;
}
Base.defineStaticRWField(Individual, "id", null);
Base.readOnlyWrappedListById(Individual, "markers", 'UI');
Base.readOnlyWrappedFieldById(Individual, "sex", 'UI');
Base.readOnlyWrappedField(Individual, "location", Location);

export class Relationship extends Base {
    id:string;
    parents:Individual[];
    children:Individual[];
}
Base.readOnlyWrappedListById(Individual, "parents", 'UI');
Base.readOnlyWrappedListById(Individual, "children", 'UI');

export class UI extends Base {
    individuals:Individual[];
    relationships:Relationship[];
    sexes:{[id:string]:Sex
    };
    markers:{[id:string]:Marker
    };

    sex(id:string):Sex {
        return this.sexes[id];
    }
}
Base.readOnlyWrappedList(UI, "individuals", Individual);
Base.readOnlyWrappedMap(UI, "sexes", Sex);
Base.readOnlyWrappedMap(UI, "markers", Marker);

export class Assignment extends Base {
    ui:UI;
}
Base.readOnlyWrappedField(Assignment, "ui", UI);

