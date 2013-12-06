/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="lib/google_analytics" />

declare var window;

var $:JQueryStatic = require("jquery");
var tmi = require('StarTMI/tmi');

export class StarTMI {

    configure(config:any) {
        console.info( "configure StarTMI" );
        console.info( config );
    }
}