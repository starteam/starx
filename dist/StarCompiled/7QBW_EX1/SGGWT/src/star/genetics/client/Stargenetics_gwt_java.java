package star.genetics.client;

import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import star.genetics.client.messages.Exec;

import com.google.gwt.core.client.EntryPoint;

public class Stargenetics_gwt_java implements EntryPoint
{
	private static Logger logger = Logger.getLogger("StarGenetics");
	private static HashMap<String, StarGenetics> map = new HashMap<String, StarGenetics>();

	public void onModuleLoad()
	{
		Messages.initialize();
		setupInterface();
	}

	private static native void setupInterface()
	/*-{
		$wnd.__sg_bg_exec = $entry(@star.genetics.client.Stargenetics_gwt_java::execute(*));
		if( typeof(console) == 'object' && console && console.info ) {
			console.info( "setup interface" ) ;
		}
		$wnd.addEventListener( 'message' , function(event) {
			console.info( "GWT event listener" ) ;
			if( event && event.data && event.data.starx )
			{
				if( event.data.command == 'is_up' && event.data.starx )
				{
					var target = event.data.starx;
					var origin = event.origin;
					try {
						event.source.postMessage( {command: 'it_is_up', starx:target} , origin ) ;
					} finally {
					}
				}
				else {
					var data = event.data;
					var callbacks = {};
					var original_callbacks = data.callbacks;
					if( data.callbacks )
					{
						if( data.callbacks.onsuccess )
						{
							callbacks.onsuccess = function(e) {
								console.info("GWT callback - onsuccess ") ;
								console.info(e);
								if( e && e.source && e.source.callbacks )
								{
									e.source.callbacks = original_callbacks;
								}
								event.source.postMessage( {command: 'callback' , kind: 'onsuccess' , uid: data.uid, starx: data.target, data:e}, event.origin );
							}
						}
						if( data.callbacks.onerror )
						{
							callbacks.onerror = function(e) {
								console.info("GWT callback - onerror ") ;
								console.info(e);
								if( e && e.source && e.source.callbacks )
								{
									e.source.callbacks = original_callbacks;
								}
								event.source.postMessage( {command: 'callback' , kind: 'onerror' , uid: data.uid, starx: data.target, data:e}, event.origin );
							}
						}
						data.callbacks = callbacks;
					}
					console.info( "GWT execute " ) ;
					console.info( data ) ;
					$wnd.__sg_bg_exec(data);
				}
			}
			console.info( event ) ;
		} , false ) ;
	}-*/;

	private static native void log(String str)
	/*-{
		if( typeof(console) == 'object' && console && console.info )
		{
			console.info( str ) ;
		}
	}-*/;

	public static void execute(Exec obj)
	{
		log("execute start ");

		if (obj != null)
		{
			String token = obj.getToken();
			log("execute start token:" + token);
			if (token != null)
			{
				if (!map.containsKey(token))
				{
					logger.log(Level.INFO, "New StarGenetics backend for token " + token);
					map.put(token, new StarGenetics());

				}
				else
				{
					logger.log(Level.INFO, "Loading existing StarGenetics backend for token " + token);
				}
				logger.log(Level.INFO, "New StarGenetics backend for token " + token + " pre exec.");
				map.get(token).execute(obj);
				logger.log(Level.INFO, "New StarGenetics backend for token " + token + " post exec.");
			}
			else
			{
				logger.log(Level.WARNING, "Token not available, bailing out.");
			}
		}
		else
		{
			logger.log(Level.WARNING, "Input argument invalid.");
		}
		log("execute done ");

	}

}
