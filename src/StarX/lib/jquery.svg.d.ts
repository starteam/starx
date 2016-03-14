/// <reference path="jquery.d.ts" />
interface JQuerySVGOptions {
	loadURL?: string;
	onLoad?: Function;
	settings?: any,
	initPath?: string;
}

interface JQuery {
    svg(options?: JQuerySVGOptions): JQuery;
    svg(string: 'get'): any;
    svg(string: 'destroy'): JQuery;
}
