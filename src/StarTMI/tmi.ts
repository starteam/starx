export class TMI {
    debug:boolean = false;

    constructor() {

    }

    pageview() {
        if (this.debug) {
            console.debug("TMI:pageview");
        }
        var payload = {
            source: '_Star_TMI_',
            command: 'pageview'
        };
        top.window.postMessage(payload, '*');
    }

    event(category:string, action:string = undefined, label:string = undefined, value:number = 0) {
        if (this.debug) {
            console.debug("TMI:event c:" + category + " a:" + action + " l:" + label + " v:" + value);
        }
        var payload = {
            source: '_Star_TMI_',
            command: 'event',
            category: category,
            action: action,
            label: label,
            value: value
        };
        top.window.postMessage(payload, '*');
    }

    configure_raven(a, b, callback) {
        if (window['RavenConfigStarX']) {
            try {
                window['RavenConfigStarX'](a, b, callback);
            } catch (e) {
                console.debug(e);
            }
        } else {
            console.debug( 'no raven');
        }

    }
}

