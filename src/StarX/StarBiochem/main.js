define([], function() {
	
	var config = {};

	function parse_config(config_obj) 
	{
		config.element_id = config_obj.element_id;

		config.width = config_obj.width ? config_obj.width : 300;
		config.height = config_obj.height ? config_obj.height : 300;
		config.color = config_obj.color ? config_obj.color : "green";
		config.debug = false;
		config.addSelectionOptions = false;
		config.serverURL = "http://chemapps.stolaf.edu/jmol/jsmol/jsmol.php";
		config.use = "HTML5";
		config.j2sPath = "jsmol/j2s";
		config.readyFunction = jmol_isReady;
		config.script = "set antialiasDisplay;load jsmol/data/caffeine.mol;";
		config.disableJ2SLoadMonitor = true;
		config.disableInitialConsole = true;
	}

	jmol_isReady = function(applet) 
	{
		var element_ui = $('#' + config.element_id + '_ui');
		element_ui.append(" <button id='" + config.element_id + "_ui_isosurface'>isosurface vdw 4 etc</button>");
		init_ui_isosurface();
		element_ui.append(" <style>" + config.element_id + '_ui' + " {background-color:rgba(0,0,122,0.1); position:absolute; top:10px; left:10px;}</style>HELLO WORLD");
		element_ui.css('z-index',2);
	}

	var toggle = true;
	function init_ui_isosurface() 
	{
		var viewer = $('#' + config.element_id + '_ui').applet;
		var element_ui_isosurface = $('#' + config.element_id + '_ui_isosurface');
		element_ui_isosurface.click( 
			function() 
			{
				console.info("$('#' + config.element_id + '_ui_isosurface');");
				alert(init_ui_isosurface);
				if(toggle) {
					toggle = false;
					Jmol.script (viewer, "select *; rotate;");
					Jmol.script (viewer, "select *; isosurface vdw;");		
				}
				else {
					toggle = true;
					Jmol.script (viewer, "select *; rotate 0;");
					Jmol.script (viewer, "select *; isosurface DELETE;");
				};
			}
		);
	}
    
	function initialize_UI() {
		var element = $('#' + config.element_id);
		element.append(' <script type="text/javascript" src="jsmol/js/JSmoljQuery.js"></script> <script type="text/javascript" src="jsmol/js/JSmolCore.js"></script> <script type="text/javascript" src="jsmol/js/JSmol.js"></script> <script type="text/javascript" src="jsmol/js/JSmolApplet.js"></script> <script type="text/javascript" src="jsmol/js/JSmolControls.js"></script> <script type="text/javascript" src="jsmol/js/JSmolApi.js"></script> <script type="text/javascript" src="jsmol/js/j2sjmol.js"></script>');
		element.append(" <style>" + config.element_id + " {background-color:rgba(122,122,0,0.5); position:absolute; top:0px; left:0px;}</style>");
		Jmol.setXHTML( config.element_id ) ;     
		config.applet = Jmol.getApplet(config.element_id, config);

		element.append(" <div id='" + config.element_id + "_ui'></div>");
		element.append( "Hello World" ) ;
		element.style.border="1px solid blue";
	}

return {
	configure: function( config ) {
		parse_config(config);
		initialize_UI();
		console.info("StarBiochem/main.js");
	},
}});
