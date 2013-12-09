/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="config.d.ts" />

export class StudentIDWidgetState {
    element_id: string;
    student_id: string;

    constructor(config:StarGeneticsConfig)
    {
        this.element_id = config.element_id;
        this.student_id = config.StudentID;
    }

    get id()
    {
        return this.student_id;
    }

    get uid()
    {
        return this.element_id;
    }
}
export class StarGeneticsSelectExperimentWidgetState {
    config:StarGeneticsConfig;

    constructor(config:StarGeneticsConfig)
    {
        this.config = config;
    }

    get input_element()
    {
        var ret;
        var jq = $('[name='+this.config.State+']');
        ret = $('#'+jq.attr('inputid'));
        return ret;
    }

    get uid()
    {
        return this.config.element_id;
    }
}

export class StarGeneticsAppWidgetState {
    config:StarGeneticsConfig;

    constructor(config:StarGeneticsConfig)
    {
        this.config = config;
    }

    get input_element()
    {
        var ret;
        var jq = $('[name='+this.config.State+']');
        ret = $('#'+jq.attr('inputid'));
        return ret;
    }

    get uid()
    {
        return this.config['element_id'];
    }

    get open()
    {
        return this.config['open'];
    }

    get new()
    {
        return this.config['new'];
    }

    get save()
    {
        return this.config['save'];
    }
}

export class StarGeneticsState {
    StudentIDWidgetState: StudentIDWidgetState;
    StarGeneticsAppWidgetState:StarGeneticsAppWidgetState;
    onmessages:{[string:string]:any} = {};

    setStudentID(config:StarGeneticsConfig):StudentIDWidgetState
    {
        this.StudentIDWidgetState = new StudentIDWidgetState(config);
        return this.StudentIDWidgetState;
    }

    setApp(config:StarGeneticsConfig):StarGeneticsAppWidgetState
    {
        this.StarGeneticsAppWidgetState = new StarGeneticsAppWidgetState(config);
        return this.StarGeneticsAppWidgetState;
    }

    get student_id() {
        var sid = this.StudentIDWidgetState;
        return sid ? sid.id : "__NOT_SET__";
    }

    onmessage(message:string)
    {
        var map = this.onmessages;
        for( var k in map)
        {
            var v = map[k];
            v.onmessage(message);
        }
    }

       onopen(socket:WebSocket,event)
    {
        var map = this.onmessages;
        for( var k in map)
        {
            var v = map[k];
            v.onopen(socket,event);
        }
    }
    listen_websocket(config:StarGeneticsConfig,listener)
    {
        this.onmessages[config.element_id] = listener;
    }
}

export class StarGeneticsGlobalState {
    state = {};

    get_state( config:StarGeneticsConfig):StarGeneticsState
    {
        var Group = config['Group'] || 'default';
        if(! this.state[Group] )
        {
            this.state[Group] = new StarGeneticsState();
        }
        var my_state = this.state[Group];
        return my_state;
    }
}