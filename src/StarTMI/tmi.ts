
export class TMI {
    debug:boolean = true;

    constructor() {

    }

    pageview() {
        if( this.debug )
        {
            console.info( "TMI:pageview" );
        }
        var payload = {
            source:'_Star_TMI_',
            command: 'pageview'
        };
        top.window.postMessage( payload , '*' );
    }

    event(category:string,action:string = undefined,label:string = undefined,value:number = 0)
    {
        if( this.debug )
        {
            console.info( "TMI:event c:" + category + " a:" + action + " l:" + label + " v:" + value );
        }
        var payload = {
            source:'_Star_TMI_',
            command: 'event',
            category: category,
            action:action,
            label: label,
            value:value
        };
        top.window.postMessage( payload , '*' );
    }


}

