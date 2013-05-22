define([ "StarORF/aminoacids"], function (AminoAcids) {
    console.info(AminoAcids);
    var config = {};

    function parse_config(config_obj) {
        config.element_id = config_obj.element_id;
        config.sequence = config_obj.sequence ? config_obj.sequence : "/StarX/StarORF/sequence.txt";

        config.sequence_id = config.element_id + "_sequence";
        config.length_id = config.element_id + "_length";
        config.gc_percentage_id = config.element_id + "_gc_percentage";
        config.minimal_orf_length_id = config.element_id + "_minimal_orf_length";
        config.minimal_orf_length_button_id = config.element_id + "_minimal_orf_length_button";
        config.reverse_complement_id = config.element_id + "_reverse_complement_button";
        config.calculate_all_orfs_id = config.element_id + "_calculate_all_orfs_button";
        config.toggle_3_1_letter_code_id = config.element_id + "_toggle_3_1_letter_code";
        config.canvas_id = config.element_id + "_canvas";
        config.slider_id = config.element_id + "_slider";
        config.putative_orf_id = config.element_id + "_putative_orf";
        config.blast_putative_orf_id = config.element_id + "_blast_putative_orf";

        config.show_input_sequence = true;
        config.show_input_sequence_title = true;
        config.show_sequence_length = true;
        config.show_gc_percentage = true;
        config.show_minimal_orf_length = true;
        config.show_minimal_orf_length_button = true;

        config.initial_minimal_orf_legth = 80;
        config.show_reverse_complement = true;
        config.show_calculate_all_orfs = true;
        config.show_3_1_letter_code_toggle = true;
        config.initial_letter_code_type = 3;
        config.show_slider = true;
        config.show_putative_orf = true;
        config.show_blast_putative_orf = true;

        config.output_selector = null;
        config.output_letter_code_type = 1;
        config.output_basepair_start = false;
        config.output_basepair_end = false;
        config.output_basepair_length = false;
        config.output_separator = ",";
    }

    function $q(str) {
        return $("#" + str);
    }

    function trim(seq) {
    	return seq.replace(/[^atgcu]/mig, '').replace(/t/mig, 'u').toUpperCase();
    }

    function load_sequence() {
        $.ajax({
            url: config.sequence,
            success: function (data) {
                $q(config.sequence_id).val(data).trigger('change');
                //sequenceChanged();
            }
        });
    }

    function initialize_UI() {
        var element = $('#' + config.element_id);

        var html = '';
        var closures = [];
        if (config.show_input_sequence_title) {
            html += "<span class='StarX_StarORF_input_sequence_title'>Input sequence</span><br>";
        }
        if (config.show_input_sequence) {
            html += "<textarea class='StarX_StarORF_input_sequence_textarea' id='" + config.sequence_id + "' style='width:100%;height:200px;border-width:1px, border-color:black'></textarea>";
        } else {
            html += "<input class='StarX_StarORF_input_sequence_hidden' id='" + config.sequence_id + "' type='hidden'>";
        }
        if (config.show_sequence_length) {
            html += "<span class='StarX_StarORF_input_sequence_length'>Sequence length is <span id='" + config.length_id + "'>0</span> bp.</span>";
            closures.push(function () {
                $q(config.sequence_id).unbind('change').bind('change', function () {
                    $q(config.length_id).html($(this).val().length);
                });
            })
        }
        if (config.show_gc_percentage) {
            html += "<span class='StarX_StarORF_input_sequence_gc_percentage'>Percentage of GC is <span id='" + config.gc_percentage_id + "'>0</span>%.</span>"
            closures.push(function () {
                $q(config.sequence_id).unbind('change').bind('change', function () {
                    var sequence = $(this).val();
                    var gc = 0;
                    for (var i = 0; i < sequence.length; i++) {
                        var c = sequence.charAt(i);
                        if (c == 'g' || c == 'G' || c == 'c' || c == 'C') {
                            gc++;
                        }
                    }
                    var perc = 0;
                    if (sequence.length != 0) {
                        perc = gc / sequence.length;
                    }
                    $q(config.gc_percentage_id).html(Math.round(perc * 100));
                });
            })
        }
        if (config.show_minimal_orf_length) {
            html += "<span class='StarX_StarORF_input_sequence_minimal_length'>Current minimal ORF length is <span id='" + config.minimal_orf_length_id + "'>"+config.initial_minimal_orf_legth+"</span> bp.</span>"
        }
        if (config.show_minimal_orf_length_button) {
            html += "<button id='" + config.minimal_orf_length_button_id + "' class='StarX_StarORF_input_sequence_minimal_length_button'>Change ORF Length</button>";

        }
        if (config.show_reverse_complement) {
            html += "<button id='" + config.reverse_complement_id + "' class='StarX_StarORF_reverse_complement_button'>Reverse Complement</button>";
        }
        if (config.show_calculate_all_orfs) {
            html += "<button id='" + config.calculate_all_orfs_id + "' class='StarX_StarORF_calculate_all_orfs_button'>Calculate all ORFs</button>";
        }
        if (config.show_3_1_letter_code_toggle) {
            html += "<input type='checkbox' id='" + config.toggle_3_1_letter_code_id + "' class='StarX_StarORF_toggle_3_1_letter_code'/><label style='font-size:10px' for='" + config.toggle_3_1_letter_code_id + "'>3 letter code</label>";
        }
        html += "<canvas id='" + config.canvas_id + "' class='canvas' style='width:100%; height:300px; border-color:black; border-width:1px;border-style:solid;display:block;' width=1000 height=300></canvas>";
        if (config.show_slider) {
            html += "<div id='" + config.slider_id + "'></div>";
        }
        if (config.show_putative_orf) {
            html += "<textarea id='" + config.putative_orf_id + "' style='width:100%;height:100;'></textarea>";
        }
        if (config.show_blast_putative_orf) {
            html += "<button id='" + config.blast_putative_orf_id + "'>Blast</button>";
        }
        $(element).html(html);

        closures.push(load_sequence);

        $(closures).each(function () {
            this();
        });
    }

    return {
        configure: function (config) {
            parse_config(config);
            initialize_UI();
            console.info("StarORF/main.js");
        }
    };
})