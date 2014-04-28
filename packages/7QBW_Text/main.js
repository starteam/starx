define('SST',['StarSimpleText/main','StarX/main', 'StarTMI/itmi'], function ( simple, main, itmi) {
	var parentList = document.getElementsByClassName("starx_widget");
	for( var index = 0 ; index < parentList.length ; index++ )
	{
		var element = parentList[index];
		if( element && element.className && element.className.indexOf('starx_handled')==-1 && element.textContent.indexOf( '"StarX":"StarSimpleText"' ) != -1)
		{
			main.load( element.parentElement );
		}
	}
});
require(['SST'], function(q) {} ) ;

