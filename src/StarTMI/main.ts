/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarTMI/tmi.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="StarTMI/tmi" />


declare var window;

import $ = require("jquery");
import TMI = require('StarTMI/tmi');

export class StarTMI {
    element:any;
    tmi: TMI.TMI;

    public configure(config:any) {
        console.info( "configure StarTMI" );
        console.info( config );
        this.element = $('#'+config.element_id);
        this.element.html( "StarTMI demo");
        this.tmi = new TMI.TMI();
        this.tmi.pageview();
    }

    pageview(q)
    {
        this.tmi.pageview()
    }
}