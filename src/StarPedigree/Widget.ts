/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarPedigree/widget_template.soy.d.ts" />
/// <reference path="../StarPedigree/widget_template.css.soy.d.ts" />


import $ = require('jquery');
import model = require("StarPedigree/Assignment");
import ui = require("StarPedigree/widget_template.soy");
import css = require("StarPedigree/widget_template.css.soy");

export class Widget {
    config:any;
    data:model.Assignment;
    workspace:JQuery;

    constructor(config:any,data:model.Assignment)
    {
        this.config = config;
        this.data = data;
        var main_element = $('#'+this.config.element_id);
        var html =ui.wrapper({config:this.config}) + css.css_html({});
        console.info( html ) ;
        main_element.html(html );
        this.workspace = $('.starpedigree_workspace', main_element);
    }

    run():void {
        this.show();
    }

    show():void {
        var w = this.workspace;


    }

}