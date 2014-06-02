/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarStudentStateExport/main.soy.d.ts" />
/// <amd-dependency path="../StarCommons/jquery.csv.js" />
define(["require", "exports", 'jquery', 'StarTMI/tmi', 'StarStudentStateExport/main.soy', "../StarCommons/jquery.csv.js"], function(require, exports, $, StarTMI, ssse) {
    

    var tmi = new StarTMI.TMI();

    var StarStudentStateExport = (function () {
        function StarStudentStateExport() {
        }
        StarStudentStateExport.prototype.add = function (student, student_answers) {
            if (!this.master_map[student]) {
                this.master_map[student] = {};
            }
            var answer_map = this.master_map[student];
            for (var answer in student_answers) {
                answer_map[answer] = student_answers[answer];
            }
        };

        StarStudentStateExport.prototype.converted = function () {
            var out = [];
            for (var student in this.master_map) {
                var map = this.master_map[student];
                for (var answer in map) {
                    var m = answer;
                    if (this.mapping[answer]) {
                        m = this.mapping[answer];
                    }
                    out.push([student, m, map[answer]]);
                }
            }
            this.out = out;
            this.update_ui();
        };

        StarStudentStateExport.prototype.update_ui = function () {
            $('.out').html(ssse.table({ rows: this.out }));
            $('.select_table').show();
            $('.download').html(ssse.download({ data: "data:application/octet-stream," + encodeURI($.csv.fromArrays(this.out)) }));
            tmi.event('StarStudentStateExport', 'Converted', this.out['length']);
        };

        StarStudentStateExport.prototype.convert = function (text) {
            var arrays = $['csv']['toArrays'](text);
            for (var i in arrays) {
                var student = arrays[i][0];
                var str_data = arrays[i][1];
                if (student != 'username') {
                    var data = JSON.parse(str_data);
                    var student_answers = {};
                    if (data['student_answers']) {
                        student_answers = data['student_answers'];
                        this.add(student, student_answers);
                    }
                }
            }
            this.converted();
        };

        StarStudentStateExport.prototype.process_csv = function (student_files) {
            var self = this;
            if (student_files.length > 0) {
                for (var i in student_files) {
                    var fr = new FileReader();
                    var file = student_files[i];
                    fr.onloadend = function (e) {
                        var text = e['target']['result'];
                        self.convert(text);
                    };
                    fr.readAsText(file);
                }
            }
        };

        StarStudentStateExport.prototype.parse_mapping = function (mapping_prefix, text, student_files) {
            var arrays = $['csv']['toArrays'](text);
            for (var i in arrays) {
                var key = mapping_prefix + arrays[i][0];
                var value = arrays[i][1];
                this.mapping[key] = value;
            }
            this.status("Parse Mapping, there are " + Object.keys(this.mapping).length + " keys.");
            this.process_csv(student_files);
        };

        StarStudentStateExport.prototype.load_mapping = function (mapping_prefix, mapping_file, student_files) {
            var self = this;
            var fr = new FileReader();
            fr.onloadend = function (e) {
                var text = e['target']['result'];
                self.parse_mapping(mapping_prefix, text, student_files);
            };
            fr.readAsText(mapping_file);
        };

        StarStudentStateExport.prototype.process = function (self, top) {
            this.master_map = {};
            this.mapping = {};
            $('.status', top).html("Loading files...");
            var student_files = $('.student_files', top)[0]['files'];
            var mapping_files = $('.mapping_file', top)[0]['files'];
            var mapping_prefix = $('.mapping_prefix', top).val();
            this.status("There are " + student_files.length + " student files and " + (mapping_files.length != 0 ? "one" : "no") + " mapping file");
            if (mapping_files.length > 0) {
                this.load_mapping(mapping_prefix, mapping_files[0], student_files);
            } else {
                this.process_csv(student_files);
            }
            return false;
        };

        StarStudentStateExport.prototype.top = function () {
            var top = $('#' + this.config.element_id);
            return top;
        };

        StarStudentStateExport.prototype.status = function (text) {
            $('.status', this.top()).html(text);
        };

        StarStudentStateExport.prototype.select = function () {
            var s = document.getSelection();
            s.removeAllRanges();
            var r = document.createRange();
            r.selectNodeContents(document.getElementById('csv_table'));
            s.addRange(r);
        };

        StarStudentStateExport.prototype.setup_handlers = function (top) {
            var self = this;
            $('.start', top).click(function (e) {
                e.preventDefault();
                self.process(self, top);
            });
            $('.select_table', top).hide().click(function (e) {
                self.select();
            });
        };

        StarStudentStateExport.prototype.configure = function (config) {
            tmi.event('StarStudentStateExport', 'Start');
            this.config = config;
            var self = this;
            var top = $('#' + config.element_id);
            top.html(ssse.main({}));
            this.setup_handlers(top);
        };
        return StarStudentStateExport;
    })();
    exports.StarStudentStateExport = StarStudentStateExport;
});
