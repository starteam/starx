/// <reference path="config.d.ts" />

export class ConfigElement {
    constructor(name:string){}
}

export var config = [
    new ConfigElement('show'),
    new ConfigElement('hide')
];