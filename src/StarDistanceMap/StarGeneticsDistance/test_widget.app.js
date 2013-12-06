function console_info(obj) {
	console.info(obj);
}

if ( typeof (star_widgets ) == 'undefined') {
	star_widgets = {};
}

function test_widget(selector, context) {

	var html = "<div class='swg_widget' style='position: relative;left:0px;top:0px;border-radius:8px;width:600px; height:300px;background-color:white'></div>";

	$(selector).append(html);
	var config = {
		selector : $(".swg_widget",selector),
		genes : context.genes ? context.genes : [{
			id : 'phy',
			name : 'Phy'
		}, {
			id : 'ala',
			name : 'Ala'
		}, {
			id : 'g3',
			name : 'Gen3'
		},
		{
			id : 'g5',
			name : 'Gen12'
		}],
		centromere : context.cetromere ? context.centromere : false,
		callback : context.callback ? context.callback : function(obj) {
		//	console.info(obj);
		$(context.output_selector,selector).html( obj.text ) ;
		},
	};
	star_widgets.gene_distance_order_widget(config);
	//$('body').css('background-color','rgb(242,240,230)');
}
