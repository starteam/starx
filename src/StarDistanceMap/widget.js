/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/underscore.d.ts" />
define(["require", "exports", "StarX/lib/underscore", "jquery", "StarDistanceMap/widget.soy", "css!StarDistanceMap/widget.css", "jquery-ui"], function(require, exports, underscore, $, ui) {
    var _ = underscore['_'];

    console.info("Underscore is ");
    console.info(_);

    var ui_config = {
        step_x: 70,
        step_y: 30,
        top: 20,
        left: 5,
        width: 60,
        height: 22,
        dropper_left_offset: 4,
        dropper_top: 40,
        dropper_max: 125,
        axis_top: 20,
        axis_top_step: 180,
        axis_top_help: 120,
        axis_width: 700,
        axis_left: 80,
        axis_height: "5px",
        axis_w_height: "50px",
        axis_w_top: 180,
        distance_div_width: 75,
        top_distance: 152,
        unit: 'cM',
        left_arrow: ' &#8676; ',
        right_arrow: ' &#8677; ',
        ascii_unit: 'cM',
        ascii_left_arrow: '<-',
        ascii_right_arrow: '->',
        v_grid_size: 25,
        v_grid_offset: 12,
        distance_width_min: 60,
        distance_offset_down: 25,
        single_line: Math.floor(765 / 60),
        below_chromosome: 180,
        min_chromosome_gene_distance: 20,
        input_below_chromosome: 30,
        min_widget_height: 100,
        input_down_x: 20,
        max_input_downs: 3,
        above_chromosome: 100,
        group_top: -2
    };

    var Gene = (function () {
        function Gene(config, state, top_selector) {
            this.__data__ = config;
            this.top_selector = top_selector;
            this.state = state;
        }
        Gene.prototype.revert = function () {
            var self = this;
            self.chromosome = undefined;
            self.top = self.__data__.initial_top;
            self.left = self.__data__.initial_left;
        };

        Object.defineProperty(Gene.prototype, "initial_position", {
            get: function () {
                return {
                    top: this.__data__.initial_top,
                    left: this.__data__.initial_left
                };
            },
            set: function (pos) {
                this.__data__.initial_top = pos.top;
                this.__data__.initial_left = pos.left;
                if (!this.__data__.top) {
                    this.top = pos.top;
                }
                if (!this.__data__.left) {
                    this.left = pos.left;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Gene.prototype, "chromosome", {
            get: function () {
                var ret = undefined;
                if (this.__data__.chromosome_id) {
                    var id = this.__data__.chromosome_id;
                    ret = this.state.get_chromosome_by_id(id);
                }
                return ret;
            },
            set: function (chromosome) {
                var old_chromosome = this.chromosome;
                if (old_chromosome) {
                    old_chromosome.unregister(this);
                }
                this.__data__.chromosome_id = chromosome ? chromosome.id : undefined;
                if (chromosome) {
                    chromosome.register(this);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Gene.prototype, "dropper_top", {
            get: function () {
                return this.top + ui_config.height;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Gene.prototype, "dropper_left", {
            get: function () {
                return this.left + ui_config.width / 2;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Gene.prototype, "dropper_height", {
            get: function () {
                var ret = 0;
                if (this.chromosome) {
                    return this.chromosome_top - this.top - ui_config.height;
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Gene.prototype, "distance_dropper_top", {
            get: function () {
                var ret = 0;
                if (this.chromosome) {
                    return this.chromosome_top;
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Gene.prototype, "distance_dropper_left", {
            get: function () {
                var ret = 0;
                if (this.chromosome) {
                    return this.left + ui_config.width / 2 - ui_config.dropper_left_offset;
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Gene.prototype, "id", {
            get: function () {
                return this.__data__.id;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Gene.prototype, "name", {
            get: function () {
                return this.__data__.name;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Gene.prototype, "top", {
            get: function () {
                return this.__data__.top;
            },
            set: function (top) {
                this.set_internal_top(top);
                $('.sgw_gene[data-id=' + this.id + ']', this.top_selector).css({ top: this.top + "px" });
                this.update_distance_dropper();
            },
            enumerable: true,
            configurable: true
        });


        Gene.prototype.set_internal_top = function (top) {
            this.__data__.top = top;
        };

        Object.defineProperty(Gene.prototype, "left", {
            get: function () {
                return this.__data__.left;
            },
            set: function (left) {
                this.set_internal_left(left);
                $('.sgw_gene[data-id=' + this.id + ']', this.top_selector).css({ left: this.left + "px" });
                $('.sgw_dropper[data-id=' + this.id + ']', this.top_selector).css({ left: this.dropper_left + "px" });
                this.update_distance_dropper();
            },
            enumerable: true,
            configurable: true
        });


        Gene.prototype.set_internal_left = function (left) {
            this.__data__.left = left;
        };

        Object.defineProperty(Gene.prototype, "color", {
            get: function () {
                var color = this.__data__.color;
                return color ? color : 'black';
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Gene.prototype, "chromosome_top", {
            get: function () {
                return this.__data__.chromosome_top;
            },
            set: function (top) {
                this.__data__.chromosome_top = top;
                this.update_distance_dropper();
            },
            enumerable: true,
            configurable: true
        });


        Gene.prototype.update_distance_dropper = function () {
            if (this.chromosome) {
                $('.sgw_dropper[data-id=' + this.id + ']', this.top_selector).show().css({ top: this.dropper_top + "px", height: this.dropper_height + "px" });
                $('.sgw_distance_dropper[data-id=' + this.id + ']', this.top_selector).show().css({ top: this.distance_dropper_top + "px", left: this.distance_dropper_left + "px", display: 'block' });
            } else {
                $('.sgw_distance_dropper[data-id=' + this.id + ']', this.top_selector).hide();
                $('.sgw_dropper[data-id=' + this.id + ']', this.top_selector).hide();
            }
        };

        Gene.prototype.get_color_by_index = function (i, size) {
            return "hsl(" + Math.round(360 / size * i) + ",50%,70%)";
        };

        Gene.prototype.set_index = function (i, size) {
            this.__data__.color = this.get_color_by_index(i, size);
        };
        return Gene;
    })();
    exports.Gene = Gene;

    var Chromosome = (function () {
        function Chromosome(config, state) {
            this.cache = {};
            this.__data__ = config;
            this.state = state;
            if (!config.id) {
                config.id = this.gen_id();
            }
            if (!config.name) {
                var index = 1;
                do {
                    var proposed_name = "Chromosome " + index;
                    index++;
                } while(_.find(state.chromosomes, function (c) {
                    return (c.name == proposed_name);
                }));
                config.name = proposed_name;
            }
            if (!config.genes) {
                config.genes = {};
            }
            if (!config.distances) {
                config.distances = {};
            }
        }
        Object.defineProperty(Chromosome.prototype, "unit_distance", {
            get: function () {
                var d = this.__data__.unit_distance;
                if (!d) {
                    this.__data__.unit_distance = 10;
                    d = 10;
                }
                return d;
            },
            set: function (d) {
                this.__data__.unit_distance = d;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Chromosome.prototype, "id", {
            get: function () {
                return this.__data__.id;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Chromosome.prototype, "name", {
            get: function () {
                return this.__data__.name;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Chromosome.prototype, "sex_linked", {
            get: function () {
                return this.__data__.sex_linked;
            },
            set: function (val) {
                this.__data__.sex_linked = val;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Chromosome.prototype, "top", {
            get: function () {
                return this.__data__.top;
            },
            set: function (top) {
                this.__data__.top = top;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Chromosome.prototype, "left", {
            get: function () {
                return this.__data__.left;
            },
            set: function (left) {
                this.__data__.left = left;
            },
            enumerable: true,
            configurable: true
        });


        Chromosome.prototype.gen_id = function () {
            return 'C-' + Math.floor(10000 * Math.random());
        };

        /**
        * Register Gene with Chromosome
        * @param gene
        */
        Chromosome.prototype.register = function (gene) {
            this.__data__.genes[gene.id] = 1;
        };

        /**
        * Unregister Gene from Chromosome
        * @param gene
        */
        Chromosome.prototype.unregister = function (gene) {
            delete this.__data__.genes[gene.id];
            if (this.sorted_genes().length == 0) {
                this.unit_distance = 10;
            }
        };

        Chromosome.prototype.sorted_genes = function () {
            var self = this;

            _.each(this.__data__.genes, function (value, key) {
                if (!self.cache[key]) {
                    var gene = self.state.get_gene_by_id(key);
                    self.cache[key] = gene;
                }
            });
            var list = _.sortBy(_.keys(this.__data__.genes), function (key) {
                return self.cache[key].left;
            });

            return _.map(list, function (e) {
                return self.cache[e];
            });
        };

        Chromosome.prototype.distance_key = function (id1, id2) {
            if (id1 > id2) {
                return id1 + "->" + id2;
            } else {
                return id2 + "->" + id1;
            }
        };

        Chromosome.prototype.set_distance_by_gene_id = function (gene1, gene2, distance) {
            var key = this.distance_key(gene1, gene2);
            this.__data__.distances[key] = distance;
        };

        Chromosome.prototype.get_distance = function (gene1, gene2) {
            var key = this.distance_key(gene1.id, gene2.id);
            var distance = this.__data__.distances[key];
            if (distance == 0) {
                distance = 0.0001;
            }
            return distance;
        };

        Chromosome.prototype.get_distance_string = function (gene1, gene2) {
            var key = this.distance_key(gene1.id, gene2.id);
            var d = this.__data__.distances[key];
            if (d == 0) {
                d = 0.0001;
            }
            return d ? parseFloat(d).toFixed(2) : "";
        };

        Chromosome.prototype.toAscii = function () {
            var self = this;

            function ascii_sex() {
                return self.sex_linked ? "-X" : "";
            }

            var output = '';
            var list = this.sorted_genes();
            if (list.length > 1) {
                var last_gene = list[0];
                output += this.name + ascii_sex() + "(";
                output += list[0].name;
                for (var i = 1; i < list.length; i++) {
                    var this_gene = list[i];
                    var distance = this.get_distance_string(this_gene, last_gene);
                    output += " <- " + distance + ui_config.unit + " -> " + this_gene.name;
                    last_gene = this_gene;
                }
                output += ")";
            } else if (list.length == 1) {
                output = this.name + ascii_sex() + "(" + list[0].name + ")";
            }
            return output;
        };

        Chromosome.prototype.toDict = function () {
            var self = this;
            var ret = {
                'name': this.name,
                'sex_linked': this.sex_linked,
                'genes': []
            };
            var genes = ret.genes;
            var list = this.sorted_genes();
            if (list.length > 1) {
                var last_gene = list[0];
                for (var i = 1; i < list.length; i++) {
                    var this_gene = list[i];
                    var distance = this.get_distance_string(this_gene, last_gene);
                    genes.push({
                        'left': last_gene.name,
                        'right': this_gene.name,
                        'distance': distance,
                        'unit': ui_config.unit
                    });
                    last_gene = this_gene;
                }
            } else if (list.length == 1) {
            }
            return ret;
        };
        return Chromosome;
    })();
    exports.Chromosome = Chromosome;

    var GeneGroups = (function () {
        function GeneGroups(config) {
            this.__data__ = config;
            config.genes = config.genes ? config.genes : [];
        }
        Object.defineProperty(GeneGroups.prototype, "title", {
            get: function () {
                return this.__data__.title;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GeneGroups.prototype, "genes", {
            get: function () {
                return this.__data__.genes;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GeneGroups.prototype, "default", {
            get: function () {
                return this.__data__.default;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GeneGroups.prototype, "top", {
            get: function () {
                return this.__data__.top ? this.__data__.top : 0;
            },
            set: function (top) {
                this.__data__.top = top;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(GeneGroups.prototype, "left", {
            get: function () {
                return this.__data__.left ? this.__data__.left : 0;
            },
            set: function (left) {
                this.__data__.left = left;
            },
            enumerable: true,
            configurable: true
        });


        GeneGroups.prototype.contains = function (gene) {
            return _.contains(this.genes, gene.id);
        };

        GeneGroups.prototype.push = function (gene) {
            this.genes.push(gene.id);
        };
        return GeneGroups;
    })();
    exports.GeneGroups = GeneGroups;

    var State = (function () {
        function State(config, top_selector) {
            this.gene_groups = [];
            this.genes = [];
            this.chromosomes = [];
            this.edit_chromosome_count = true;
            this.sex_linked_show = true;
            this.height = ui_config.height;
            this.errors = [];
            // alternative is that config contains 'state' which we would use to initialize state directly.
            this.top_selector = top_selector;
            this.config = config;
            this.initialize_from_config_or_state(config);
            this.edit_chromosome_count = (config.edit_chromosome_count === undefined) ? true : config.edit_chromosome_count;
            this.sex_linked_show = (config.sex_linked_show === undefined) ? true : config.sex_linked_show;
        }
        State.prototype.getState = function () {
            var state = {
                genes: _.map(this.genes, function (e) {
                    return e.__data__;
                }),
                gene_groups: this.config.gene_groups,
                chromosomes: _.map(this.chromosomes, function (e) {
                    return e.__data__;
                }),
                color_genes: this.config.color_genes,
                centromere: this.config.centromere,
                ascii: this.toAscii(),
                dict: this.toDict()
            };
            return state;
        };

        State.prototype.toAscii = function () {
            var output = '';
            _.each(this.chromosomes, function (e) {
                output += e.toAscii() + " ";
            });
            return output;
        };

        State.prototype.toDict = function () {
            var ret = [];
            _.each(this.chromosomes, function (e) {
                ret.push(e.toDict());
            });
            return ret;
        };

        State.prototype.clear_errors = function () {
            this.errors = [];
        };

        State.prototype.report_errors = function () {
            if (this.errors.length != 0) {
                var str = '';
                _.each(this.errors, function (e) {
                    console.info(e);
                    str = str + e + "\n";
                });
                alert("There is an error, look at the console.");
                //throw new Error(str);
            }
        };

        Object.defineProperty(State.prototype, "widget_id", {
            get: function () {
                return this.config['widget_id'];
            },
            enumerable: true,
            configurable: true
        });

        State.prototype.initialize_from_config_or_state = function (config) {
            if (config.saved) {
                var state_config = {};
                var state = config.saved;

                function copy(out, fb, main, key) {
                    out[key] = main[key] ? main[key] : fb[key];
                }

                _.each(config, function (value, key) {
                    copy(state_config, config, state, key);
                });
                this.initialize_from_config(state_config);
            } else {
                this.initialize_from_config(config);
            }
        };

        Object.defineProperty(State.prototype, "chromosomes_sex_linked", {
            get: function () {
                var ret = false;
                console.info("chromosomes_sex_linked");
                _.each(this.chromosomes, function (e) {
                    console.info("chromosomes_sex_linked " + e.sex_linked);
                    ret = ret || e['sex_linked'];
                });
                return ret;
            },
            enumerable: true,
            configurable: true
        });

        State.prototype.initialize_from_config = function (config) {
            var self = this;
            this.clear_errors();
            this.initialize_groups_from_config(config);
            this.initialize_genes_from_config(config);
            this.initialize_gene_group_positions_from_config(config);
            this.initialize_chromosomes_from_config(config);
            this.initialize_chromosome_positions_from_config(config);
            this.report_errors();
        };

        State.prototype.initialize_groups_from_config = function (config) {
            var self = this;
            if (config.gene_groups) {
                self.gene_groups = [];
                _.each(config.gene_groups, function (group) {
                    self.gene_groups.push(new GeneGroups(group));
                });
            } else {
                this.gene_groups = [];
                this.gene_groups.push(new GeneGroups({ 'default': true }));
            }
        };

        State.prototype.initialize_genes_from_config = function (config) {
            var self = this;
            self.genes = [];
            _.each(config.genes, function (gene_config) {
                var gene = new Gene(gene_config, self, self.top_selector);
                self.genes.push(gene);
                self.register_gene_with_gene_group(gene);
            });
            var count = 0;
            _.each(this.gene_groups, function (group) {
                count += group.genes.length;
            });
            if (count != self.genes.length) {
                this.errors.push("There are " + self.genes.length + " in genes and " + count + " genes in groups.");
            }
            if (config.color_genes) {
                _.each(self.genes, function (gene, index) {
                    gene.set_index(index, self.genes.length);
                });
            }
        };

        State.prototype.initialize_gene_group_positions_from_config = function (config) {
            var self = this;
            if (this.genes.length + this.gene_groups.length <= ui_config.single_line) {
                var count = this.genes.length + this.gene_groups.length - 1;
                var left = (ui_config.left + ui_config.axis_width / 2) - count * ui_config.step_x / 2 + ui_config.width / 2;
                var index = 0;
                _.each(this.gene_groups, function (group) {
                    group.top = ui_config.group_top;
                    group.left = left + index * ui_config.step_x;
                    _.each(group.genes, function (gene_id) {
                        var gene = _.find(self.genes, function (gene) {
                            return gene.id == gene_id;
                        });
                        gene.initial_position = {
                            top: ui_config.top,
                            left: left + index * ui_config.step_x
                        };
                        index++;
                    });
                    index++;
                });
            } else if (this.genes.length + this.gene_groups.length <= 2 * ui_config.single_line) {
                var count = this.genes.length + this.gene_groups.length - 1;
                var left = (ui_config.left + ui_config.axis_width / 2) - count / 2 * ui_config.step_x / 2 + ui_config.width / 2;
                var index = 0;
                _.each(self.gene_groups, function (group) {
                    group.top = ui_config.group_top;
                    group.left = left + index / 2 * ui_config.step_x;
                    _.each(group.genes, function (gene_id) {
                        var gene = _.find(self.genes, function (gene) {
                            return gene.id == gene_id;
                        });
                        gene.initial_position = {
                            top: ui_config.top + index % 2 * ui_config.step_y,
                            left: left + Math.floor(index / 2) * ui_config.step_x
                        };
                        index++;
                    });
                    index += 2 + index % 2;
                });
            } else {
                this.errors.push("Need to do more than one line.");
            }
        };

        State.prototype.initialize_chromosomes_from_config = function (config) {
            var self = this;
            self.chromosomes = [];
            if (config.chromosomes) {
                _.each(config.chromosomes, function (chromosome) {
                    self.chromosomes.push(new Chromosome(chromosome, self));
                });
            }
        };

        State.prototype.initialize_chromosome_positions_from_config = function (config) {
            var self = this;
            var index = 0;
            _.each(this.chromosomes, function (chromosome) {
                self.chromosome_top(chromosome, index++);
            });
            this.update_height();
        };

        State.prototype.register_gene_with_gene_group = function (gene) {
            var default_group = undefined;
            var processed = false;
            _.each(this.gene_groups, function (group) {
                if (!processed) {
                    if (group.contains(gene)) {
                        processed = true;
                    }
                    if (group.default) {
                        default_group = group;
                    }
                }
            });
            if (!processed) {
                if (default_group) {
                    default_group.push(gene);
                } else {
                    this.errors.push("Gene with name " + gene.name + " and id " + gene.id + " is not in any group");
                }
            }
        };

        State.prototype.chromosome_top = function (chromosome, index) {
            var old_top = chromosome.top;
            chromosome.top = ui_config.axis_w_top + index * ui_config.axis_top_step;
            _.each(chromosome.sorted_genes(), function (gene) {
                gene.chromosome_top = chromosome.top;
                gene.top = gene.top + chromosome.top - old_top;
            });
        };

        State.prototype.update_height = function () {
            var height = 0;
            _.each(this.chromosomes, function (c) {
                var cc = c.top + ui_config.below_chromosome;
                height = height > cc ? height : cc;
            });
            this.height = height > ui_config.min_widget_height ? height : ui_config.min_widget_height;
        };

        State.prototype.add_chromosome = function () {
            var chromosome = new Chromosome({}, this);
            this.chromosome_top(chromosome, this.chromosomes.length);
            this.chromosomes.push(chromosome);
            this.update_height();
        };

        State.prototype.del_chromosome = function (id) {
            var self = this;
            var chromosomes = _.filter(this.chromosomes, function (c) {
                return c.id != id;
            });
            this.chromosomes = chromosomes;
            _.each(this.chromosomes, function (c, i) {
                self.chromosome_top(c, i);
            });
            this.update_height();
        };

        State.prototype.get_chromosome_by_id = function (id) {
            return _.find(this.chromosomes, function (c) {
                return c.id == id;
            });
        };

        State.prototype.get_gene_by_id = function (id) {
            return _.find(this.genes, function (c) {
                return c.id == id;
            });
        };
        return State;
    })();
    exports.State = State;

    var GeneDistanceWidget = (function () {
        /**
        * Constructs a widget from config
        * if config has element 'state' uses state to initialize
        * @param config
        */
        function GeneDistanceWidget(config, top_selector, callback) {
            this.help_hidden = false;
            this._callback = callback;
            this.state = new State(config, top_selector);
            if (config.saved) {
                this.help_hidden = true;
            }
            this.update_html();
        }
        /**
        * This uses drag event to sets gene's position
        * and updates chromosome property
        * @param event
        * @param ui
        * @param element
        */
        GeneDistanceWidget.prototype.set_gene_position = function (event, ui, element) {
            var e = $(element);
            var position = e.position();
            var x = position.left;
            var y = position.top;
            var gene_id = e.attr('data-id');

            var gene = this.state.get_gene_by_id(gene_id);
            gene.top = y;
            if (x > ui_config.axis_width) {
                x = ui_config.axis_width;
            }
            if (x < ui_config.axis_left) {
                x = ui_config.axis_left;
            }
            gene.left = x;
            var is_on_chromosome = false;
            var old_chromosome = gene.chromosome;
            var new_chromosome = undefined;
            var self = this;
            var chromosomes = this.state.chromosomes;
            for (var i = 0; i < chromosomes.length; i++) {
                var chromosome = chromosomes[i];
                var ctop = chromosome.top;
                if (y < ctop && y > ctop - ui_config.above_chromosome) {
                    gene.chromosome = chromosome;
                    gene.chromosome_top = ctop;
                    new_chromosome = chromosome;
                    is_on_chromosome = true;
                    break;
                }
            }
            if (!is_on_chromosome) {
                gene.chromosome = undefined;
                gene.chromosome_top = 0;
            }
            this.update_distances(gene, old_chromosome, new_chromosome);
        };

        /**
        * Snaps gene to grid & prevents overlap with chromosome
        * @param event
        * @param ui
        * @param el
        */
        GeneDistanceWidget.prototype.snap_to_grid = function (event, ui, el) {
            var gene_id = $(el).attr('data-id');
            var gene = _.find(this.state.genes, function (e) {
                return e.id == gene_id;
            });
            var up = -gene.top % ui_config.v_grid_size + ui_config.v_grid_offset;
            var new_top = gene.top + up;
            var left = 0;
            var new_left = gene.left;
            if (gene.chromosome_top - new_top < ui_config.min_chromosome_gene_distance) {
                up -= ui_config.min_chromosome_gene_distance;
                new_top -= ui_config.min_chromosome_gene_distance;
            }
            if (new_top < ui_config.top) {
                up += (ui_config.top - new_top);
                new_top = ui_config.top;
            }

            var is_on_chromosome = false;
            _.each(this.state.chromosomes, function (c) {
                if (new_top < c.top && new_top > c.top - ui_config.above_chromosome) {
                    is_on_chromosome = true;
                }
            });
            if (!is_on_chromosome) {
                gene.chromosome = undefined;
                up += (gene.initial_position.top - new_top);
                new_top = gene.initial_position.top;
                left = gene.initial_position.left - gene.left;
                new_left = gene.initial_position.left;
            }
            gene.set_internal_top(new_top);
            gene.set_internal_left(left != 0 ? new_left : gene.left);
            $(el).animate({ top: "+=" + up, left: "+=" + left }, 400, function () {
                gene.top = new_top;
                if (left != 0) {
                    gene.left = new_left;
                }
            });
        };

        GeneDistanceWidget.prototype.update_chromosome = function (chromosome) {
            var self = this;
            var genes = chromosome.sorted_genes();
            var last_left = -1;
            var last_gene = undefined;
            var holder = $('.sgw_distance_holder[data-id=' + chromosome.id + ']');
            var html = '';
            var input_down_steps = 0;
            _.each(genes, function (gene, index) {
                var left = gene.left + ui_config.width / 2;
                if (last_left != -1) {
                    var width = (left - last_left);
                    if (width < 60) {
                        input_down_steps++;
                        if (input_down_steps > ui_config.max_input_downs) {
                            input_down_steps = 1;
                        }
                    } else {
                        input_down_steps = 0;
                    }
                    var top = chromosome.top;
                    var div_left = (width - ui_config.distance_div_width) / 2 + last_left;

                    var left_down_line = {
                        top: top,
                        left: last_gene.left + ui_config.width / 2,
                        height: 60,
                        gene_id: last_gene.id
                    };
                    var right_down_line = {
                        top: top,
                        left: gene.left + ui_config.width / 2,
                        height: 60,
                        gene_id: gene.id
                    };
                    var across_line = {
                        top: top + ui_config.input_below_chromosome,
                        left: last_gene.left + ui_config.width / 2,
                        width: (gene.left - last_gene.left),
                        line_id: chromosome.distance_key(last_gene.id, gene.id)
                    };
                    var distance = chromosome.get_distance(last_gene, gene);
                    if (isFinite(chromosome.unit_distance) && chromosome.unit_distance != 0) {
                        var calculated_distance = (gene.left - last_gene.left) / chromosome.unit_distance;
                        calculated_distance = Math.abs(calculated_distance);
                        if (isFinite(distance) && Math.abs(distance - calculated_distance) > .1) {
                            distance = calculated_distance;
                            chromosome.set_distance_by_gene_id(last_gene.id, gene.id, distance);
                        } else {
                            distance = calculated_distance;
                            chromosome.set_distance_by_gene_id(last_gene.id, gene.id, distance);
                        }
                    }
                    if (!distance) {
                        chromosome.set_distance_by_gene_id(last_gene.id, gene.id, 0.1);
                    }
                    var distance_input = {
                        top: chromosome.top + ui_config.input_below_chromosome + input_down_steps * ui_config.input_down_x,
                        left: div_left,
                        width: ui_config.distance_div_width,
                        input_id: self.state.widget_id + "-" + last_gene.id + "-" + gene.id,
                        gene_1: last_gene,
                        gene_2: gene,
                        distance: chromosome.get_distance_string(last_gene, gene),
                        unit: ui_config.unit,
                        chromosome_id: chromosome.id,
                        line_id: chromosome.distance_key(last_gene.id, gene.id),
                        input_down_steps: input_down_steps
                    };
                    html += ui.gene_distance({
                        left_down_line: left_down_line,
                        right_down_line: right_down_line,
                        across_line: across_line,
                        distance_input: distance_input
                    });
                }
                last_left = left;
                last_gene = gene;
            });
            holder.html(html);
        };

        /**
        * Update distances
        * @param gene
        * @param old_chromosome
        * @param new_chromosome
        */
        GeneDistanceWidget.prototype.update_distances = function (gene, old_chromosome, new_chromosome) {
            if (new_chromosome) {
                this.update_gene_distances(new_chromosome, gene);
                this.update_chromosome(new_chromosome);
            }
            if (old_chromosome && new_chromosome != old_chromosome) {
                this.update_chromosome(old_chromosome);
            }
        };

        GeneDistanceWidget.prototype.update_gene_distances = function (chromosome, gene) {
            var list = chromosome.sorted_genes();
            var index = _.indexOf(list, gene);
            if (index > 0) {
                // got left neighbour
                var gene2 = list[index - 1];
                var unit = chromosome.unit_distance;
                var px_distance = Math.abs(gene2.left - gene.left);
                var units = px_distance / unit;
                chromosome.set_distance_by_gene_id(gene.id, gene2.id, units);
                this.update_input_element(gene.id, gene2.id, chromosome.get_distance_string(gene, gene2));
            }
            if (index < list.length - 1) {
                // got right neighbour
                var gene2 = list[index + 1];
                var unit = chromosome.unit_distance;
                var px_distance = Math.abs(gene2.left - gene.left);
                var units = px_distance / unit;
                chromosome.set_distance_by_gene_id(gene.id, gene2.id, units);
                this.update_input_element(gene.id, gene2.id, chromosome.get_distance_string(gene, gene2));
            }
        };

        GeneDistanceWidget.prototype.update_input_element = function (id1, id2, units) {
            //        var q = $('input[type=text][data-id-1="+id1+"][data-id-2="+id2+"]');
            //        var w = $('input[type=text][data-id-1="+id2+"][data-id-2="+id1+"]');
            //        var s = "" + units;
            //        var l = s.length;
            //        q.css({"min-width": 10 * l + "px", "max-width": 10 * l + "px"});
            //        w.css({"min-width": 10 * l + "px", "max-width": 10 * l + "px"});
            //        console.info("update input element");
        };

        /**
        *
        * @param element
        */
        GeneDistanceWidget.prototype.input_change = function (element) {
            var chromosome_id = $(element).attr('data-chromosome-id');
            var gene_1_id = $(element).attr('data-id-1');
            var gene_2_id = $(element).attr('data-id-2');
            var distance = parseFloat($(element).val());
            var chromosome = this.state.get_chromosome_by_id(chromosome_id);
            if (chromosome) {
                chromosome.set_distance_by_gene_id(gene_1_id, gene_2_id, distance);
                this.reposition_genes_v2(chromosome_id, gene_1_id, gene_2_id);
            }
        };

        /**
        *
        * @param chromosome_id
        * @param gene1_id
        * @param gene2_id
        */
        GeneDistanceWidget.prototype.reposition_genes_v2 = function (chromosome_id, gene1_id, gene2_id) {
            var animate = true;
            var chromosome = this.state.get_chromosome_by_id(chromosome_id);
            var gene1 = this.state.get_gene_by_id(gene1_id);
            var gene2 = this.state.get_gene_by_id(gene2_id);
            this.update_input_element(gene1.id, gene2.id, chromosome.get_distance_string(gene1, gene2));
            var width = gene2.left - gene1.left;
            var gene_distance = chromosome.get_distance(gene1, gene2);
            var list = chromosome.sorted_genes();

            // this is total distance
            var total_distance = 0;
            for (var i = 1; i < list.length; i++) {
                total_distance += chromosome.get_distance(list[i - 1], list[i]);
            }

            // this is gene1 distance
            var gene1_position = 0;
            if (list[0].id != gene1.id) {
                for (var i = 1; i < list.length; i++) {
                    gene1_position += chromosome.get_distance(list[i - 1], list[i]);
                    if (list[i].id == gene1.id) {
                        break;
                    }
                }
            }

            // this scales stuff
            var unit_distance = chromosome.unit_distance;
            if (gene_distance != 0) {
                if (unit_distance * total_distance > ui_config.axis_width) {
                    unit_distance = width / gene_distance;
                }
            }
            if (total_distance * unit_distance < ui_config.axis_width / 10) {
                var axis_width = total_distance;
                if (axis_width < 0.1) {
                    axis_width = 0.1;
                }
                unit_distance = ui_config.axis_width / 3 / axis_width;
            }
            chromosome.unit_distance = unit_distance;
            var gene0_left = gene1.left - unit_distance * gene1_position;
            var geneN_left = gene0_left + unit_distance * total_distance;
            if (gene0_left < ui_config.axis_left) {
                gene0_left += (ui_config.axis_left - gene0_left);
                geneN_left += (ui_config.axis_left - gene0_left);
                animate = false;
            }
            if (geneN_left > (ui_config.axis_width - ui_config.axis_left)) {
                var total_width = geneN_left - gene0_left;
                if (total_width < (ui_config.axis_width - ui_config.axis_left)) {
                    gene0_left = ui_config.axis_width - total_width;
                    geneN_left = ui_config.axis_width;
                } else {
                    var scale = (ui_config.axis_width - ui_config.axis_left) / total_width;
                    gene0_left = ui_config.axis_left;
                    geneN_left = ui_config.axis_width;
                    unit_distance = (geneN_left - gene0_left) / total_distance;
                    animate = false;
                }
            }
            if (list.length > 6) {
                animate = false;
            }
            if (animate) {
                // and this moves stuff
                var gene_position = 0;
                for (var i = 0; i < list.length; i++) {
                    var distance_key = 'N/A';
                    if (i > 0) {
                        gene_position += chromosome.get_distance(list[i - 1], list[i]);
                        distance_key = chromosome.distance_key(list[i - 1].id, list[i].id);
                    }
                    var new_left = gene0_left + gene_position * unit_distance;
                    var left_move = list[i].left - new_left;
                    this.animate_distance(chromosome, list[i], left_move, new_left, distance_key, new_left < gene1_position);
                }
            } else {
                var gene_position = 0;
                for (var i = 0; i < list.length; i++) {
                    var distance_key = 'N/A';
                    if (i > 0) {
                        gene_position += chromosome.get_distance(list[i - 1], list[i]);
                        distance_key = chromosome.distance_key(list[i - 1].id, list[i].id);
                    }
                    var new_left = gene0_left + gene_position * unit_distance;
                    var left_move = list[i].left - new_left;
                    list[i].left = new_left;
                }
                this.update_chromosome(chromosome);
                this.update_html();
            }
        };

        /**
        *
        * @param chromosome_id
        * @param gene1_id
        * @param gene2_id
        */
        GeneDistanceWidget.prototype.reposition_genes = function (chromosome_id, gene1_id, gene2_id) {
            var chromosome = this.state.get_chromosome_by_id(chromosome_id);
            var gene1 = this.state.get_gene_by_id(gene1_id);
            var gene2 = this.state.get_gene_by_id(gene2_id);
            var width = gene2.left - gene1.left;
            var gene_distance = chromosome.get_distance(gene1, gene2);
            var list = chromosome.sorted_genes();

            // this is total distance
            var total_distance = 0;
            for (var i = 1; i < list.length; i++) {
                total_distance += chromosome.get_distance(list[i - 1], list[i]);
            }

            // this is gene1 distance
            var gene1_position = 0;
            if (list[0].id != gene1.id) {
                for (var i = 1; i < list.length; i++) {
                    gene1_position += chromosome.get_distance(list[i - 1], list[i]);
                    if (list[i].id == gene1.id) {
                        break;
                    }
                }
            }

            // this scales stuff
            var unit_distance = chromosome.unit_distance;
            if (gene_distance != 0) {
                unit_distance = width / gene_distance;
            }
            chromosome.unit_distance = unit_distance;
            var gene0_left = gene1.left - unit_distance * gene1_position;
            var geneN_left = gene0_left + unit_distance * total_distance;
            if (gene0_left < 0) {
                gene0_left -= gene0_left;
                geneN_left -= gene0_left;
            }
            if (geneN_left > ui_config.axis_width) {
                var total_width = geneN_left - gene0_left;
                if (total_width < ui_config.axis_width) {
                    gene0_left = ui_config.axis_width - total_width;
                    geneN_left = ui_config.axis_width;
                } else {
                    var scale = ui_config.axis_width / total_width;
                    gene0_left = 0;
                    geneN_left = ui_config.axis_width;
                    unit_distance = geneN_left / total_distance;
                }
            }

            // and this moves stuff
            var gene_position = 0;
            for (var i = 0; i < list.length; i++) {
                var distance_key = 'N/A';
                if (i > 0) {
                    gene_position += chromosome.get_distance(list[i - 1], list[i]);
                    distance_key = chromosome.distance_key(list[i - 1].id, list[i].id);
                }
                var new_left = gene0_left + gene_position * unit_distance;
                var left_move = list[i].left - new_left;
                this.animate_distance(chromosome, list[i], left_move, new_left, distance_key, new_left < gene1_position);
            }

            if (gene_distance != 0) {
            } else {
                throw "Not yet handled!";
            }
        };

        GeneDistanceWidget.prototype.animate_distance = function (chromosome, gene, left_move, new_left, pair_id, left_or_width) {
            var self = this;
            gene.set_internal_left(new_left);
            $('.sgw_distance_element[data-id="' + pair_id + '"]').hide();
            $('.sgw_distance_element[data-id="' + gene.id + '"]').animate({ left: "-=" + left_move + "px" }, 400);
            $('.sgw_distance_dropper[data-id="' + gene.id + '"]').animate({ left: "-=" + left_move + "px" }, 400);
            $('.sgw_dropper[data-id="' + gene.id + '"]').animate({ left: "-=" + left_move + "px" }, 400);
            $('.sgw_gene[data-id="' + gene.id + '"]').animate({ left: "-=" + left_move + "px" }, 400, function () {
                gene.left = new_left;
                self.update_chromosome(chromosome);
            });
            //        $('.sgw_distance_element[data-id="'+pair_id+'"]').animate({width:"-="+left_move+"px"},400);
            //        $('.sgw_distance_element[data-id="'+gene.id+'"]').hide();
            //        $('.sgw_distance_dropper[data-id="'+gene.id+'"]').hide();
            //        $('.sgw_dropper[data-id="'+gene.id+'"]').hide();
        };

        /*
        Gene dragging events
        */
        GeneDistanceWidget.prototype.drag_gene = function (event, ui, el) {
            this.set_gene_position(event, ui, el);
        };

        GeneDistanceWidget.prototype.stop_dragging_gene = function (event, ui, el) {
            this.set_gene_position(event, ui, el);
            this.snap_to_grid(event, ui, el);
        };

        /*
        Chromosome events
        */
        GeneDistanceWidget.prototype.add_chromosome = function () {
            this.state.add_chromosome();
            this.update_html();
        };

        GeneDistanceWidget.prototype.del_chromosome = function (el) {
            var self = this;
            var id = $(el).attr('data-id');
            var chromosome = this.state.get_chromosome_by_id(id);
            _.each(chromosome.sorted_genes(), function (gene) {
                gene.revert();
            });
            this.state.del_chromosome(id);
            this.update_html();
        };

        GeneDistanceWidget.prototype.sex_linked_change = function (el) {
            var self = this;
            var id = $(el).attr('data-id');
            var chromosome = this.state.get_chromosome_by_id(id);
            if (chromosome) {
                var is_checked = $(el).is(':checked');
                chromosome.sex_linked = is_checked;
                if (is_checked) {
                    $('.sgw_sexlinked_checkbox:checkbox', $(self.state.top_selector)).not('[data-id=' + id + ']').prop('checked', false).each(function (e) {
                        var id = $(this).attr('data-id');
                        var chromosome = self.state.get_chromosome_by_id(id);
                        chromosome.sex_linked = false;
                    });
                }
            }
        };

        GeneDistanceWidget.prototype.bind_touchevents = function (top) {
            var self = this;
            var target = undefined;
            var start = { x: 0, y: 0, target: undefined };
            var move = { x: 0, y: 0 };
            var gene_initial = { top: 0, left: 0 };

            function process_touch(e) {
                var touches = e.originalEvent['changedTouches'][0];
                move.x = touches['pageX'];
                move.y = touches['pageY'];

                var offset_x = move.x - start.x;
                var offset_y = move.y - start.y;

                var gene_new_top = gene_initial.top + offset_y;
                var gene_new_left = gene_initial.left + offset_x;

                $(target).css({ top: gene_new_top + "px", left: gene_new_left + "px" });
                self.set_gene_position(e, undefined, target);
            }

            $('.sgw_gene', top).bind('touchstart', function (e) {
                var touches = e.originalEvent['changedTouches'][0];
                start.x = touches['pageX'];
                start.y = touches['pageY'];
                target = e['target'];
                var gene_id = $(target).attr('data-id');
                var gene = self.state.get_gene_by_id(gene_id);
                gene_initial = { top: gene.top, left: gene.left, gene: gene };
                e.preventDefault();
            });
            $('.sgw_gene', top).bind('touchmove', function (e) {
                process_touch(e);
                e.preventDefault();
            });
            $('.sgw_gene', top).bind('touchend', function (e) {
                process_touch(e);
                self.stop_dragging_gene(e, undefined, target);
                e.preventDefault();
            });
            $('.sgw_gene', top).bind('touchcancel', function (e) {
                $(target).css({ top: gene_initial.top + "px", left: gene_initial.left + "px" });
                self.set_gene_position(e, undefined, target);
                self.stop_dragging_gene(e, undefined, target);
                e.preventDefault();
            });
        };

        /**
        * Reset UI
        */
        GeneDistanceWidget.prototype.update_html = function () {
            var self = this;
            var top = $(self.state.top_selector);
            var html = ui.widget({ state: this.state });
            top.html(html).ready(function () {
                $('.sgw_info').html("update html:" + new Date());
                _.each(self.state.genes, function (g) {
                    g.update_distance_dropper();
                });
                _.each(self.state.chromosomes, function (c) {
                    self.update_chromosome(c);
                });
                $('.sgw_gene', top).draggable({
                    drag: function (event, ui) {
                        self.drag_gene(event, ui, this);
                    },
                    stop: function (event, ui) {
                        self.stop_dragging_gene(event, ui, this);
                        self.callback();
                    }
                });
                self.bind_touchevents(top);
                $('.sgw_add_chromosome', top).click(function () {
                    self.add_chromosome();
                    self.callback();
                });
                $('.sgw_delete_chromosome', top).click(function () {
                    self.del_chromosome(this);
                    self.callback();
                });
                $(top).off('change', '.sgw_cm_input').on('change', '.sgw_cm_input', function () {
                    self.input_change(this);
                    self.callback();
                });
                $(top).off('change', '..sgw_sexlinked_checkbox:checkbox').on('change', '.sgw_sexlinked_checkbox:checkbox', function () {
                    self.sex_linked_change(this);
                    self.callback();
                });
                if (self.help_hidden) {
                    $('.sgw_help', top).hide();
                } else {
                    $(top).on('mouseover', '.sgw_help', function () {
                        $('.sgw_help', top).fadeOut(400, function () {
                            $('.sgw_help', top).hide();
                            self.help_hidden = true;
                        });
                    });
                }
            });
        };

        GeneDistanceWidget.prototype.callback = function () {
            if (this._callback) {
                this._callback(this.state.getState());
            }
        };
        return GeneDistanceWidget;
    })();
    exports.GeneDistanceWidget = GeneDistanceWidget;
});
//# sourceMappingURL=widget.js.map
