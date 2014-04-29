define('SDM',['StarDistanceMap/main','StarX/main', 'StarTMI/itmi'], function ( simple, main, itmi) {
	var parentList = document.getElementsByClassName("starx_widget");
	for( var index = 0 ; index < parentList.length ; index++ )
	{
		var element = parentList[index];
		if( element && element.className && element.className.indexOf('starx_handled')==-1 && element.textContent.indexOf( '"StarX":"StarDistanceMap"' ) != -1)
		{
			main.load( element.parentElement );
		}
	}
});
require(['SDM'], function(q) {} ) ;

