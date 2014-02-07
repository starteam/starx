/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarStudentStateExport/main.soy.d.ts" />
/// <amd-dependency path="../StarCommons/jquery.csv.js" />

declare var window;

import $ = require('jquery');
import StarTMI = require('StarTMI/tmi');
var tmi = new StarTMI.TMI();
import ssse = require('StarStudentStateExport/main.soy');

export class StarStudentStateExport {
    config:any;
    master_map:any;
    mapping:any;
    out:any;

    add(student:string, student_answers:any) {
        if (!this.master_map[student]) {
            this.master_map[student] = {};
        }
        var answer_map = this.master_map[student];
        for (var answer in student_answers) {
            answer_map[answer] = student_answers[answer];
        }
    }

    converted() {
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
    }

    update_ui() {
        $('.out').html(ssse.table({rows: this.out}));
        tmi.event('StarStudentStateExport','Converted',this.out['length'])  ;
    }

    convert(text:string) {
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
    }

    process_csv(student_files:any[]) {
        var self:StarStudentStateExport = this;
        if (student_files.length > 0) {
            var fr:FileReader = new FileReader();
            for (var i in student_files) {
                var file = student_files[i];
                fr.onloadend = function (e) {
                    var text = e['target']['result'];
                    self.convert(text);
                }
                fr.readAsText(file);
            }
        }
    }

    parse_mapping(mapping_prefix:string, text:string, student_files:any[]) {
        var arrays = $['csv']['toArrays'](text);
        for (var i in arrays) {
            var key = mapping_prefix + arrays[i][0];
            var value = arrays[i][1];
            this.mapping[key] = value;
        }
        this.status("Parse Mapping, there are " + Object.keys(this.mapping).length + " keys.");
        this.process_csv(student_files);
    }

    load_mapping(mapping_prefix:string, mapping_file:any, student_files:any[]) {
        var self:StarStudentStateExport = this;
        var fr:FileReader = new FileReader();
        fr.onloadend = function (e) {
            var text = e['target']['result'];
            self.parse_mapping(mapping_prefix, text, student_files);
        }
        fr.readAsText(mapping_file);
    }

    process(self:StarStudentStateExport, top) {
        this.master_map = {};
        this.mapping = {};
        $('.status', top).html("Loading files...");
        var student_files = $('.student_files', top)[0]['files'];
        var mapping_files = $('.mapping_file', top)[0]['files'];
        var mapping_prefix:string = $('.mapping_prefix', top).val();
        this.status("There are " + student_files.length + " student files and " + (mapping_files.length != 0 ? "one" : "no") + " mapping file");
        if (mapping_files.length > 0) {

            this.load_mapping(mapping_prefix, mapping_files[0], student_files);
        }
        else {
            this.process_csv(student_files);
        }
        return false;
    }

    top() {
        var top = $('#' + this.config.element_id);
        return top;
    }

    status(text:string) {
        $('.status', this.top()).html(text);
    }

    select() {
        var s = document.getSelection();
        s.removeAllRanges();
        var r = document.createRange();
        r.selectNodeContents(document.getElementById('csv_table'));
        s.addRange(r);
    }

    setup_handlers(top) {
        var self:StarStudentStateExport = this;
        $('.start', top).click(
            function (e) {
                e.preventDefault();
                self.process(self, top);
            }
        );
        $('.select_table', top).click(function (e) {
            self.select()
        });
    }

    configure(config:any) {
        tmi.event('StarStudentStateExport', 'Start');
        this.config = config;
        var self:StarStudentStateExport = this;
        var top = $('#' + config.element_id);
        top.html(ssse.main({}));
        this.setup_handlers(top);
    }
}
