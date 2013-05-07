define([], function() {
	
	var jsmol_state = {};

	function parse_config(config_obj) 
	{
		jsmol_state.element_id = config_obj.element_id;

		jsmol_state.width = config_obj.width ? config_obj.width : 300;
		jsmol_state.height = config_obj.height ? config_obj.height : 300;
		jsmol_state.color = config_obj.color ? config_obj.color : "green";
		jsmol_state.debug = false;
		jsmol_state.addSelectionOptions = false;
		jsmol_state.serverURL = "http://chemapps.stolaf.edu/jmol/jsmol/jsmol.php";
		jsmol_state.use = "HTML5";
		jsmol_state.j2sPath = "jsmol/j2s";
		jsmol_state.readyFunction = jmol_isReady;
		jsmol_state.script = "set antialiasDisplay;load jsmol/data/caffeine.mol;";
		jsmol_state.disableJ2SLoadMonitor = true;
		jsmol_state.disableInitialConsole = true;
		jsmol_state.toggle = true;
	}

	jmol_isReady = function(applet) 
	{
		var element_ui = $('#' + jsmol_state.element_id + '_ui');
		element_ui.append(" <button id='" + jsmol_state.element_id + "_ui_isosurface'>isosurface vdw 4 etc</button>");
		init_ui_isosurface();
		element_ui.append(" <style>" + jsmol_state.element_id + '_ui' + " {background-color:rgba(0,0,122,0.1); position:absolute; top:10px; left:10px;}</style>");
		element_ui.css('z-index',2);
	}

	function init_ui_isosurface() 
	{
		var viewer = jsmol_state.jsmol;
		var element_ui_isosurface = $('#' + jsmol_state.element_id + '_ui_isosurface');
		element_ui_isosurface.click( 
			function() 
			{
				if(jsmol_state.toggle) {
					jsmol_state.toggle = false;
					Jmol.script (viewer, "select *; rotate;");
					Jmol.script (viewer, "select *; isosurface vdw;");		
				}
				else {
					jsmol_state.toggle = true;
					Jmol.script (viewer, "select *; rotate 0;");
					Jmol.script (viewer, "select *; isosurface DELETE;");
				};
			}
		);
	}
    
	function initialize_UI() {
		var element = $('#' + jsmol_state.element_id);
		element.append(' <script type="text/javascript" src="jsmol/js/JSmoljQuery.js"></script> <script type="text/javascript" src="jsmol/js/JSmolCore.js"></script> <script type="text/javascript" src="jsmol/js/JSmol.js"></script> <script type="text/javascript" src="jsmol/js/JSmolApplet.js"></script> <script type="text/javascript" src="jsmol/js/JSmolControls.js"></script> <script type="text/javascript" src="jsmol/js/JSmolApi.js"></script> <script type="text/javascript" src="jsmol/js/j2sjmol.js"></script>');
		element.append(" <style>" + jsmol_state.element_id + " {background-color:rgba(122,122,0,0.5); position:absolute; top:0px; left:0px;}</style>");
		Jmol.setXHTML( jsmol_state.element_id ) ;     
		jsmol_state.jsmol = Jmol.getApplet(jsmol_state.element_id, jsmol_state);

		element.append(" <div id='" + jsmol_state.element_id + "_ui'></div>");
		element.style.border="1px solid blue";
	}

return {
	configure: function( config ) {
		parse_config(config);
		initialize_UI();
		console.info("StarBiochem/main.js");
	},
}});
