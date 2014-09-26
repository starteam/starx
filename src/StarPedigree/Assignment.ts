/// <reference path="../StarX/lib/underscore.d.ts" />
/// <reference path="../StarPedigree/widget_template.soy.d.ts" />


import underscore = require("StarX/lib/underscore");
var _ = underscore['_'];
import ui = require("StarPedigree/widget_template.soy");

export class Base {
    __data__:any;
    __context__:any;
    __cache__:any = {};

    constructor(jsonmodel:any, context:any = {}) {
        this.__data__ = jsonmodel;
        this.__context__ = _.clone(context || {});
        this.__context__[this.getName()] = this;
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
    }

    static is_rebuild_cache(self:Base, name:string):boolean {
        var rebuild_cache = false;
        if (!self.__cache__[name]) {
            rebuild_cache = true;
        } else if (self.__cache__[name].__cache_data__ !== self.__data__[name]) {
            rebuild_cache = true;
        }
        return rebuild_cache;
    }

    static set_cache(self:Base, name:string, obj:any) {
        obj['__cache_data__'] = self.__data__[name];
        self.__cache__[name] = obj;
    }

    static readOnlyWrappedList(cls, name, wrapper) {
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
    }

    static readOnlyWrappedFieldWithDefault(cls, name, wrapper, defaults) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                var self = this;
                if (typeof self.__data__[name] === 'undefined') {
                    self.__data__[name] = defaults;
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


    static readOnlyWrappedListByIdAs(cls, name, context_id, as) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                var self = this;
                if (typeof self.__data__[name] === 'undefined') {
                    throw "__data__[" + name + "] is undefined for " + cls;
                }
                var list = this.__context__[context_id][as];
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
Base.defineStaticRWField(Marker, "id", null);
Base.defineStaticRWField(Marker, "name", null);
Base.defineStaticRWField(Marker, "kind", null);

export class Location extends Base {
    layout:string;
    row:number;
    column:number;

    get top():number {
        return parseFloat(this.__context__['UI'].options['cell_height'])*this.row;
    }

    get left(): number {
        return parseFloat(this.__context__['UI'].options['cell_width'])*this.column;

    }
}
Base.defineStaticRWField(Location, "layout", null);
Base.defineStaticRWField(Location, "row", null);
Base.defineStaticRWField(Location, "column", null);

export class AnnotatorState extends Base {
    markers:Marker[];
    disease:Marker[];
    phase:string;
    informative:string;

    constructor(jsonmodel:any, context:any = {}) {
        super(jsonmodel, context);
    }

    static staticinit() {
        return {markers: [], disease: [], phase: 'undefined', informative: 'undefined'};
    }

    private static individual():Individual {
        return this['__data__']['Individual'];
    }

    get is_annotated() {
        return ( this.markers.length == 2 && this.disease.length == 2);
    }
}
Base.readOnlyWrappedListById(AnnotatorState, "markers", 'UI');
Base.readOnlyWrappedListByIdAs(AnnotatorState, "disease", 'UI', "markers");
Base.defineStaticRWField(AnnotatorState, "phase", null);
Base.defineStaticRWField(AnnotatorState, "informative", null);

export class Individual extends Base {
    id:string;
    markers:Marker[];
    sex:Sex;
    location:Location;
    ui_metadata:any;

    get affected():boolean {
        var self:Individual = this;
        var affected:boolean = false;
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
    }

    get genotype_markers():Marker[] {
        var self:Individual = this;
        var display_markers = this.__context__['UI'].options['selected_marker'];
        var markers = _.filter(self.markers, function (marker) {
            var found = _.find(display_markers, function (hid) {
                return hid == marker.id
            });
            if (found) {
                return true;
            }
        });
        markers = _.sortBy(markers, function (m) {
            return m.id;
        });
        return markers;
    }

    get parents():Individual[] {
        var relationship = this.child_relationship;
        if (relationship) {
            return relationship.parents;
        }
        else {
            return [];
        }
    }

    get children():Individual[] {
        var relationship = this.parent_relationship;
        if (relationship) {
            return relationship.children;
        }
        else {
            return [];
        }
    }

    get child_relationship():Relationship {
        var self:Individual = this;
        var relationships = this.__context__['UI'].relationships;
        var relationship = _.find(relationships, function (e) {
            var c = e.children;
            return _.find(c, function (ee) {
                return ee.id == self.id;
            });
        })
        return relationship;

    }

    get parent_relationship():Relationship {
        var self:Individual = this;
        var relationships = this.__context__['UI'].relationships;
        var relationship = _.find(relationships, function (e) {
            var c = e.parents;
            console.info("Checking ", e.parents[0].id, e.parents[1].id);
            return _.find(c, function (ee) {
                return ee.id == self.id;
            });
        })
        return relationship;
    }

    is_genotype(diploidAllelesArray):boolean {
        var self = this;
        var ret = 0;

        function compare_diploidAlleles(a, b) {
            var first = ( a[0] == b[0] && a[1] == b[1] );
            var second = ( a[0] == b[1] && a[1] == b[0] );
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
    }

    is_phase(diploidAllelesArray, value):boolean {
        var self = this;
        var val = [];

        function compare_diploidAlleles(a, b) {
            var first = ( a[0] == b[0] && a[1] == b[1] );
            var second = ( a[0] == b[1] && a[1] == b[0] );
            if (first) {
                return 1;
            }
            if (second) {
                return -1;
            }
            return 0;
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
                if (cmp != 0) {
                    alleles = _.without(alleles, thisDiploid);
                    val.push(cmp);
                }
            });
        });
        var ret = false;
        if (value == 'inphase') {
            ret = (val[0] == val[1]);
        }
        else if (value == 'outofphase') {
            ret = (val[0] == -val[1]) && val[0] != 0;
        }
        else if (value == 'unknown') {
            ret = true;
        }
        return ret;
    }

    get genotype() {
        if (this.ui_metadata && this.ui_metadata['genotype']) {
            var f = _.flatten(this.ui_metadata['genotype'])
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
            for (var i = 0; i < 20; i++) //TODO: this needs to be max size of genotype
            {
                ret.push('');
            }
            return ret;
        }
    }

    private get annotator_map() {
        if (this.ui_metadata && !this.ui_metadata['annotator']) {
            this.ui_metadata['annotator'] = {};
        }
        return this.ui_metadata['annotator'];
    }

    get annotator():any {
        var map = this.annotator_map;
        var selected_marker = this.__context__['UI'].options['selected_marker'];
        if (!map[selected_marker]) {
            map[selected_marker] = AnnotatorState.staticinit();
        }
        return new AnnotatorState(map[selected_marker], this.__context__);
    }

    get name():string {
        return this.__data__['name'] || this.id;
    }
}
Base.defineStaticRWField(Individual, "id", null);
Base.readOnlyWrappedListById(Individual, "markers", 'UI');
Base.readOnlyWrappedFieldById(Individual, "sex", 'UI');
Base.readOnlyWrappedField(Individual, "location", Location);
Base.defineStaticRWField(Individual, "ui_metadata", {});

export class Relationship extends Base {
    id:string;
    parents:Individual[];
    children:Individual[];

    get children_column_span():Location[] {
        var children = this.children;
        var min:Location = children[0].location;
        _.each(children, function (c) {
            if (c.location.column < min.column) {
                min = c.location;
            }
        });
        var max:Location = children[0].location;
        _.each(children, function (c) {
            if (c.location.column > max.column) {
                max = c.location;
            }
        });
        return [min, max];
    }
}
Base.readOnlyWrappedListById(Relationship, "parents", 'UI');
Base.readOnlyWrappedListById(Relationship, "children", 'UI');

export class OptionsHelper extends Base {
    selected_marker: string;
    markers:any;
    cell_height:number;
    cell_width:number;

    get selected_marker_name()
    {
        return this.markers[this.selected_marker].label;
    }
}
Base.defineStaticRWField(OptionsHelper, "selected_marker", null);
Base.defineStaticRWField(OptionsHelper, "markers", {});
Base.defineStaticRWField(OptionsHelper, "cell_height", 100);
Base.defineStaticRWField(OptionsHelper, "cell_width", 100);
Base.defineStaticRWField(OptionsHelper, "generations", []);
Base.defineStaticRWField(OptionsHelper, "layout", "grid");
Base.defineStaticRWField(OptionsHelper, "cell_offset_x", 100);
Base.defineStaticRWField(OptionsHelper, "cell_offset_y", 100);
Base.defineStaticRWField(OptionsHelper, "symbol_markers", []);

export class UI extends Base {
    individuals:Individual[];
    relationships:Relationship[];
    sexes:{[id:string]:Sex};
    markers:{[id:string]:Marker};
    options:any;

    sex(id:string):Sex {
        return this.sexes[id];
    }

    get individuals_as_map():{[id:string]:Individual} {
        var ret:{[id:string]:Individual} = {};
        _.each(this.individuals, function (q) {
            ret[q.id] = q;
        });
        return ret;
    }

    get parents():{[id:string]:Individual} {
        return this.individuals_as_map;
    }

    get children():{[id:string]:Individual} {
        return this.individuals_as_map;
    }

}
Base.readOnlyWrappedList(UI, "individuals", Individual);
Base.readOnlyWrappedList(UI, "relationships", Relationship);
Base.readOnlyWrappedMap(UI, "sexes", Sex);
Base.readOnlyWrappedMap(UI, "markers", Marker);
Base.readOnlyWrappedField(UI, "options", OptionsHelper);

export class Assignment extends Base {
    ui:UI;
}
Base.readOnlyWrappedField(Assignment, "ui", UI);

