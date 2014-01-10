/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />

declare var window;

import $ = require('jquery');
import StarTMI = require('StarTMI/tmi');
var tmi = new StarTMI.TMI();

export class StarSimpleText {
    config:any;
    postprocess:boolean;
    timer:any = null;
    textarea_id:string;

    last_line_break_index(val, pos) {
        pos = pos > 0 ? pos - 1 : pos;
        var min_index = 0;
        var nn = val.lastIndexOf("\n", pos);
        if (nn != -1) {
            min_index = nn;
        }
        var rr = val.lastIndexOf("\r", pos);
        if (rr != -1) {
            min_index = min_index > rr ? min_index : rr;
        }
        return min_index;
    }

    last_space_index(val, last_index) {
        var ss = val.lastIndexOf(" ", last_index);
        return ss;
    }

    process_change(max_iter) {
        var self:StarSimpleText = this;
        var elem = document.getElementById(self.textarea_id);
        if (elem) {
            var changed = false;
            var val = elem['value'];
            var lines = val.split(/[\n\r]/);
            var new_lines = [];
            for (var i in lines) {
                var line = lines[i];

                if (line.length < self.config.cols) {
                    new_lines.push(line);
                    continue;
                }
                var iter = 0;
                var line_processed = false;

                while (line.length >= self.config.cols && iter < max_iter) {
                    line_processed = false;
                    iter++;
                    var break_point = self.last_space_index(line, self.config.cols);
                    if (break_point == -1 || break_point == 0) {
                        new_lines.push(line);
                        line_processed = true;
                        break;
                    }
                    else {
                        new_lines.push(line.substr(0, break_point));
                        line = line.substr(line.charAt(break_point) == ' ' ? break_point + 1 : break_point);
                        line_processed = false;
                    }
                }
                if (!line_processed) {
                    new_lines.push(line);
                }
            }
            elem['value'] = new_lines.join("\n");
            console.info("NEW TEXT");
            console.info(elem['value']);
        }
    }

    process(max_iter) {
        var self:StarSimpleText = this;
        var elem = document.getElementById(self.textarea_id);
        if (elem) {
            var iter = 0;
            var changed = false;
            var val = elem['value'];
            var pos = val.length;
            if (elem['selectionStart']) {
                pos = elem['selectionStart'];
            }


            while (iter < max_iter) {
                iter++;
                var min_index = self.last_line_break_index(val, pos);
                if (pos - min_index < self.config.cols) {
                    break;
                }
                else {
                    var max_len = min_index + self.config.cols;
                    var break_point = self.last_space_index(val, max_len);
                    if (break_point == -1) {
                        break;
                    }
                    else {
                        val = val.substr(0, break_point) + "\n" + val.substr(val.charAt(break_point) == ' ' ? break_point + 1 : break_point);
                        changed = true;
                    }
                }
            }
            if (changed) {
                elem['value'] = val;
                elem['selectionStart'] = pos;
                elem['selectionEnd'] = pos;
                console.info(val);
            }
        }
    }

    keyup(el, event) {
        this.process(20);
        this.save_to_jshidden();
    }

    change(el, event) {
        this.process_change(1000);
        this.save_to_jshidden();
    }

    save_to_jshidden() {
        var elem = document.getElementById(this.textarea_id);
        var val = elem['value'];
        var jq = $('[name=' + this.config.state + ']');
        if (this.config['show_length']) {
            jq.show().text(val.length + " characters");
        }
        var ret = $('#' + jq.attr('inputid'));
        ret.attr('value', encodeURI(val));
    }

    get_from_jshidden() {
        var jq = $('[name=' + this.config.state + ']');
        var ret = $('#' + jq.attr('inputid'));
        try {
            return decodeURI(ret.attr('value'));
        }
        catch (e) {
            console.debug("value can not be decoded, failing back on raw");
            return ret ? ret.attr('value') : '';
        }
    }

    apply_css() {
        var elem = document.getElementById(this.textarea_id);
        $(elem).css('min-height', '300px');
    }

    configure(config:any) {
        tmi.event('StarSimpleText','Start');
        this.config = config;
        var self:StarSimpleText = this;
        var top = $('#' + config.element_id);
        var text = '';
        try {
            text = this.get_from_jshidden();
        }
        catch (e) {
            console.info(e);
        }
        self.textarea_id = config.element_id + "_textarea";
        config.cols = config.cols ? parseInt(config.cols) : 80;
        config.rows = config.rows ? parseInt(config.rows) : 25;
        var textarea = '<textarea id="' + self.textarea_id + '" cols="' + config.cols + '" rows="' + config.rows + '">' + text + '</textarea>';
        top.html(textarea);
        $('#' + self.textarea_id).off('keyup').off('change').off('blur').on('keyup',function (e) {
            self.keyup(this, e);
        }).on('change',function (e) {
                self.change(this, e);
            }).on('blur',function (e) {
                self.change(this, e);
            }).ready(function () {
                self.apply_css();
            })
    }
}