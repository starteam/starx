/// <reference path="underscore.d.ts" />
/// <reference path="require.d.ts" />
/// <amd-dependency path="StarX/underscore" />

declare var exports;
export var _ = window['_'];
if (window['_'] && window['_'].noConflict) {
    window['_'].noConflict();
}
if (!window['_']) {
    window['_'] = _;
}
