/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="state.ts" />
/// <reference path="config.d.ts" />
/// <amd-dependency path="StarGenetics/selectexperiment.soy" />

var SGUI = require("StarGenetics/selectexperiment.soy");

export class StarGeneticsSelectExperimentWidget {
    state:StarGeneticsState;
    config:StarGeneticsConfig;

    experiments:any;

    input_element()
    {
        console.info( "input element");
        var ret;
        var jq = $('[name='+this.config.State+']');
        console.info(jq);
        var ret = $('#'+jq.attr('inputid'));
        console.info(ret);
        console.info(ret.attr('value'));
        return ret;
    }

    set_state(data:string) {
        console.info( "Set STATE" + data) ;
        $(this.input_element()).attr('value', data);
    }

    get_state():string {
        return $(this.input_element()).attr('value');
    }

    set_message(message) {
        $('#' + this.config['element_id']).html(message);
    }

    constructor(state:StarGeneticsState, config:StarGeneticsConfig) {
        this.state = state;
        this.config = config ;
        console.info( "StarGeneticsSelectExperimentWidget");
        console.info( config );
        this.set_message("Welcome!");
        $('button','#' + this.config['element_id']).click()
        window.select_experiment = this;
        state.listen_websocket(config,this);
        var parent = $('#' + this.config['element_id']);
        var self = this;
        var selector ='.sg_1_select_experiment';
        $(parent).off('change',selector).on('change', selector,function(e) {
            self.onchange(e,this);
        });
    }

    public onmessage(message)
    {
        var data = JSON.parse( message.data) ;
        if( data.command == 'list_experiment_response')
        {
            console.info( "Experiment list");
            console.info( data.experiments ) ;
            this.experiments = data.experiments;
            this.update_ui()
        }
    }

    update_ui()
    {
        var state =this.get_state();
        console.info( state ) ;
        this.set_message( SGUI.select_experiments({experiments:this.experiments, selected:this.get_state()}));
    }

    onchange(e,ui)
    {
        this.set_state($(ui).val());
    }


    public onopen(socket,event)
    {
        this.socket = socket;
        socket.send(JSON.stringify({'command':'list_experiments'}));
    }
}