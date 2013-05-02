


define([], function() {
	
    var config = {};
    var viewer;

    function parse_config(config_obj) {
//        config.element_id = config_obj.element_id;
        console.info( "Hi from StarBiochem.js ");
        console.log(config.element_id) ;

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

    jmol_isReady = function(applet) {
        var element = $('#' + config.element_id);

        element.append("<style>" + viewer_addr + " {background-color:rgba(122,122,0,0.5); position:absolute; top:0px; left:0px;}</style>");
        element.append("<button id='starBiochemX_UI' onclick='javascript:onClickFunction(" + myviewer + ")'>isosurface vdw 4 etc</button>");
        element.append("<style>#starBiochemX_UI {background-color:rgba(0,0,122,0.1); position:absolute; top:10px; left:10px;}</style>HELLO WORLD");
    	$('#starBiochemX_UI').css('z-index',2);
    	console.log(Jmol._getElement(element));
//    	Jmol._getElement(applet, "appletdiv").style.border="1px solid blue";
    }	

    var toggle = true;
    function onClickFunction(viewer) {
    	if(toggle) {
    		toggle = false;
    		Jmol.script (viewer, "select *; rotate;");
    		Jmol.script (viewer, "select *; isosurface vdw;");		
    	}
    	else {
    		toggle = true;
    		Jmol.script (viewer, "select *; rotate 0;");
    		Jmol.script (viewer, "select *; isosurface DELETE;");
    	}
    		
    }
    
    function initialize_UI() {
        var element = $('#' + config.element_id);
        
        viewer = Jmol.getApplet('viewer', config);
    }

return {
 configure2: function( config ) {
     parse_config(config);
     initialize_UI();
     console.info("StarBiochem/main.js");
 },
 configure: function(config) {
 }
}});