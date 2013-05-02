$(function(){
var minlen = 80;
var sliderValue = 0;
var basepairWidth = 12;
var aminoacidHeight = 15;
var decodedForward = null;
var decodedReverse = null;
var sequence_length = -1;
var putativeORF = null;
var decode3Letter = true;
var orig = null;

check();
init();

function getInternetExplorerVersion() {
	// Returns the version of Internet Explorer or a -1 for other browsers.
	var rv = -1;
	if(navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if(re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}
	return rv;
}

function geckoGetRv()
{
  if (navigator.product != 'Gecko')
  {
    return -1;
  }
  var rvValue = 0;
  var ua      = navigator.userAgent.toLowerCase();
  var rvStart = ua.indexOf('rv:');
  var rvEnd   = ua.indexOf(')', rvStart);
  var rv      = ua.substring(rvStart+3, rvEnd);
  var rvParts = rv.split('.');
  var exp     = 1;

  for (var i = 0; i < rvParts.length; i++)
  {
    var val = parseInt(rvParts[i]);
    rvValue += val / exp;
    exp *= 100;
  }

  return rvValue;
}

function check() {
	var pass = true;
	if(!Modernizr.canvas) {
		pass = false;
	}
	if(pass) {
		var agt = navigator.userAgent.toLowerCase();
		var nav = ((agt.indexOf('mozilla') != -1) && (agt.indexOf('spoofer') == -1) && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera') == -1) && (agt.indexOf('webtv') == -1) && (agt.indexOf('hotjava') == -1));
		
		if(nav && geckoGetRv() < 2) {
			pass = false;
		} else {
			var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
			if( ie && getInternetExplorerVersion() < 9)
			{
				pass = false;
			}
			
		}
	}
	if(!pass) {
		alert("This site does support your browser. Please upgrade to modern browser.");
		//document.location = '/';

	}
}

function init() {
	parseAminoAcids();
	$('#decodedlabel').hide();
	$('#decoded').hide();
	$('#sequence').change(function() {
		sequenceChanged()
	});
	$('#sequence').keypress(function() {
		sequenceChanged()
	});
	$('#new_window').button();

	$('#changelength').button();
	$('#changelength').click(function() {
		var newLength = Math.round(prompt("Minimum ORF length: ", minlen));
		if(newLength > 0 && newLength < 10000) {

			$('#wait').html("Recalculating putative ORFs");
			$('#wait').dialog('open');
			minlen = newLength;
			var f2 = function() {
				setMinLength();
				sequenceChanged();
				$('#wait').dialog('close');
			};
			window.setTimeout(f2, 10);
		}
	});

	$('#decoded31').button();
	$('#decoded31').click(function() {
		decode3Letter = !this.checked;
		if(decode3Letter) {
			$('#decoded31').button('option', 'label', '3 letter code');
		} else {
			$('#decoded31').button('option', 'label', '1 letter code');
		}
		if(putativeORF != null) {
			decodePutativeORF();
		}
	});

	$('#decodedblast').button()
	$('#decodedblast').click(function() {
		decode3Letter = false;
		if(decode3Letter) {
			$('#decoded31').button('option', 'label', '3 letter code');
		} else {
			$('#decoded31').button('option', 'label', '1 letter code');
		}
		decodePutativeORF();
		var link = 'http://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=' + $('#decoded').html();
		window.open(link, 'blast');

	});

	$('#reversecomplement').button();
	$('#reversecomplement').click(function() {
		$('#wait').html("Calculating reverse complement");
		$('#wait').dialog('open');
		window.setTimeout(function() {
			reverseComplement();
			$('#wait').dialog('close');
		}, 5);
	});

	$('#allorfs').button();
	$('#allorfs').click(function() {
		$('#wait').html("Calculating all ORFs, this may take a while...");
		$('#wait').dialog('open');
		window.setTimeout(function() {
			calculateAllORFs();
			$('#wait').dialog('close');
		}, 5);
	});

	$('#scrollbar').slider();
	$('#scrollbar').slider('option', 'slide', setSlider);

	$('#canvas').click(function(e) {
		var canvas = document.getElementById('canvas');
		var x = (e.pageX - canvas.offsetLeft);
		var y = (e.pageY - canvas.offsetTop);
		canvasClick(x, y, null);
	});
	$('#canvas').mousedown(function(e) {
		var canvas = document.getElementById('canvas');
		orig = {
			x : (e.pageX - canvas.offsetLeft),
			y : (e.pageY - canvas.offsetTop)
		}
		return false;
	});
	$('#canvas').mouseup(function(e) {
		orig = null;
	});

	$('#canvas').mousemove(function(e) {

		if(orig != null) {
			var canvas = document.getElementById('canvas');
			var x = (e.layerX - canvas.offsetLeft);
			var y = (e.layerY - canvas.offsetTop);
			canvasClick(x, y, orig);
		}
	});
	if(Modernizr.touch) {
		$('#canvas').each(function() {
			this.ontouchstart = function(e) {
				var e = e.touches[0];
				var canvas = document.getElementById('canvas');
				orig = {
					x : (e.clientX - canvas.offsetLeft),
					y : (e.clientY - canvas.offsetTop)
				}
			};
			this.ontouchmove = function(e) {
				var e = e.touches[0];
				var canvas = document.getElementById('canvas');
				var x = (e.clientX - canvas.offsetLeft);
				var y = (e.clientY - canvas.offsetTop);
				canvasClick(x, y, orig);
			};
			this.ontouchend = function(e) {
				orig = null;
			};
		});
	}
	$('#wait').dialog();
	$('#wait').html("Loading sample sequence");
	$('#wait').dialog('open');

	window.setTimeout(function() {
		$().ready(function() {
			$.ajax({
				url : 'sequence.txt',
				success : function(data) {
					$('#sequence').html(data);
					sequenceChanged();
				}
			});
			$('#wait').dialog('close');
		}, 10);
	});
}

function sequenceChanged() {
	$('#decodedlabel').hide();
	$('#decoded').hide();
	$('#allORFs').html('');
	var sequence = $("#sequence").attr("value");
	sequence = trim(sequence);
	sequence_length = sequence.length;
	setLength(sequence);
	setPercentage(sequence);
	setMinLength();
	setSliderHandle(sequence);
	decodedForward = decode(sequence);
	decodedReverse = decode(reverseComplementString(sequence));
	paint(sequence);
} ;

function trim(seq) {
	return seq.replace(/[^atgcu]/mig, '').replace(/t/mig, 'u').toUpperCase();
}

function complementChar(c) {
	if(c == 'G') {
		c = 'C';
	} else if(c == 'g') {
		c = 'c';
	} else if(c == 'C') {
		c = 'G';
	} else if(c == 'c') {
		c = 'g';
	} else if(c == 'a') {
		c = 'u';
	} else if(c == 'A') {
		c = 'U';
	} else if(c == 'T') {
		c = 'A';
	} else if(c == 't') {
		c = 'a';
	} else if(c == 'u') {
		c = 'a';
	} else if(c == 'U') {
		c = 'A';
	}
	return c;
}

function reverseComplementString(str) {
	var ret = '';
	for(var i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		if(c == 'G') {
			c = 'C';
		} else if(c == 'g') {
			c = 'c';
		} else if(c == 'C') {
			c = 'G';
		} else if(c == 'c') {
			c = 'g';
		} else if(c == 'a') {
			c = 'u';
		} else if(c == 'A') {
			c = 'U';
		} else if(c == 'T') {
			c = 'A';
		} else if(c == 't') {
			c = 'a';
		} else if(c == 'u') {
			c = 'a';
		} else if(c == 'U') {
			c = 'A';
		}
		ret = c + ret;
	}
	return ret;
}

function reverseComplement() {
	var sequence = trim($("#sequence").attr("value"));
	var ret = reverseComplementString(sequence);
	$("#sequence").attr("value", ret);
	sequenceChanged();
}

function setLength(sequence) {
	$('#length').html(sequence.length);
}

function setPercentage(sequence) {
	var gc = 0;
	for(var i = 0; i < sequence.length; i++) {
		var c = sequence.charAt(i);
		if(c == 'g' || c == 'G' || c == 'c' || c == 'C') {
			gc++;
		}
	}
	var perc = 0;
	if(sequence.length != 0) {
		perc = gc / sequence.length;
	}
	$('#perc').html(Math.round(perc * 100));
}

function setMinLength() {
	$('#minlen').html(minlen);
}

function setSliderHandle(sequence) {
	var scrollbar = $('#scrollbar');
	var handleHelper = scrollbar.find(".ui-slider-handle");
	var width = 30;
	var canvas = $("#canvas");
	var canvasWidth = canvas.width();
	var sequenceWidth = (1 + sequence.length) * basepairWidth;
	var visible = canvasWidth / sequenceWidth;
	if(visible > 1) {
		visible = 1;
	}
	var newWidth = Math.round(visible * scrollbar.width());
	if(newWidth < 1) {
		newWidth = 1;
	}
	scrollbar.slider('option', 'min', 0);
	scrollbar.slider('option', 'max', Math.round(sequence.length - canvasWidth / basepairWidth));
	scrollbar.slider('option', 'value', sequence.length / 4);
	sliderValue = sequence.length / 4;
}

function setSlider() {
	var scrollbar = $('#scrollbar');
	var value = scrollbar.slider('option', 'value');
	sliderValue = value;
	var sequence = $("#sequence").attr("value");
	sequence = trim(sequence);
	paint(sequence);
}

function clearCanvas(canvas, width, height, g) {
	g.clearRect(0, 0, width, height);
	g.fillStyle = '#f0f0f0';
	g.fillRect(0, 0, width, 100);
}

function paintWholeSequence(sequence, canvas, width, height, g) {
	if(decodedForward == null || decodedReverse == null) {
		return;
	}
	// paint whole sequence
	var oldFillStyle = g.fillStyle;
	g.fillStyle = '#e0e0e0';
	var h0 = 10;
	var h = 6;
	var step = 8;
	g.fillRect(0, h0 + 0 * step, width, h);
	g.fillRect(0, h0 + 1 * step, width, h);
	g.fillRect(0, h0 + 2 * step, width, h);

	g.fillRect(0, h0 + 3 * step + 1, width, h * 2);

	g.fillRect(0, h0 + 5 * step, width, h);
	g.fillRect(0, h0 + 6 * step, width, h);
	g.fillRect(0, h0 + 7 * step, width, h);

	var qq = sequence.length / width;
	var gc = 0;
	var qqc = 0;
	var pixel = 0;
	for(var i = 0; i < sequence.length; i++) {
		var c = sequence.charAt(i);
		if(c == 'g' || c == 'G' || c == 'c' || c == 'C') {
			gc++;
		}
		qqc++;
		if(qqc > qq) {
			var a = Math.round(256.0 - 256.0 * gc / qqc);
			g.fillStyle = 'rgb(' + a + ',' + a + ',' + a + ')';
			g.fillRect(pixel, h0 + 3 * step + 1, 1, h * 2);
			qqc = 0;
			gc = 0;
			pixel++;
		}
	}

	for(var band = 0; band < 3; band++) {
		var decodeMap = decodedForward[band];
		var isGreen = 0;
		var pixelIndex = 0;
		for(var bpi = band; bpi < sequence.length; bpi += 3) {
			pixelIndex += 3;
			var pt = decodeMap[bpi];
			if( typeof (pt) == 'object') {
				isGreen++;
			}
			if(pixelIndex > qq) {
				if(isGreen > 0) {
					var pixel = Math.round(bpi / sequence.length * width);
					if(isGreen == (pixelIndex / 3)) {
						g.fillStyle = 'rgb(64,128,64)';
					} else {
						g.fillStyle = 'rgb(64,200,64)';

					}
					g.fillRect(pixel, h0 + band * step + 1, 1, h - 1);
				}
				isGreen = 0;
				pixelIndex = 0;
			}
		}
	}

	for(var band = 0; band < 3; band++) {
		var decodeMap = decodedReverse[band];
		var isGreen = 0;
		var pixelIndex = 0;
		for(var bpi = band; bpi < sequence.length; bpi += 3) {
			pixelIndex += 3;
			var pt = decodeMap[bpi];
			if( typeof (pt) == 'object') {
				isGreen++;
			}
			if(pixelIndex > qq) {
				if(isGreen > 0 && isGreen == (pixelIndex / 3)) {
					var pixel = Math.round(bpi / sequence.length * width);
					g.fillRect(width - pixel, h0 + (5 + band) * step + 1, 1, h - 1);
				}
				isGreen = false;
				pixelIndex = 0;
			}
		}
	}
	g.fillStyle = oldFillStyle;

}

var baselineSequence = null;
var baselineLength = 0;
var baselineImage = null;
function paint(sequence) {
	var canvas = document.getElementById('canvas');
	var width = canvas.width;
	var height = canvas.height;
	if(width != canvas.clientWidth) {
		canvas.width = canvas.clientWidth;
		width = canvas.width;
		baselineImage = null;
	}
	var g = canvas.getContext('2d');

	clearCanvas(canvas, width, height, g);
	if(sequence != baselineSequence || baselineLength != minlen || baselineImage == null) {
		paintWholeSequence(sequence, canvas, width, height, g);
		baselineImage = g.getImageData(0, 0, width, height);
		baselineSequence = sequence;
		baselineLength = minlen;
	} else {
		g.putImageData(baselineImage, 0, 0);
	}
	var from = Math.round(sliderValue / 10) * 10;
	var to = Math.round((sliderValue + width / basepairWidth) / 10) * 10;
	// paint selector window
	g.fillStyle = 'rgba(0,0,0,.5)';
	g.fillRect(from / sequence.length * width, 5, (from - to) / sequence.length * width, 70);
	g.fillStyle = '#000000';
	g.beginPath();
	g.moveTo(0, 100);
	g.lineTo(from / sequence.length * width, 75);
	g.moveTo(to / sequence.length * width, 75);
	g.lineTo(width, 100);
	g.stroke();
	g.closePath();

	// paint numbers
	g.font = 'bold 12px verdana';
	for(var bpi = from; bpi <= to; bpi += 10) {
		var w = g.measureText(bpi).width;
		g.fillText(bpi, (bpi - sliderValue) * basepairWidth - (w - basepairWidth) / 2, 110);
		g.fillText(bpi, (bpi - sliderValue) * basepairWidth - (w - basepairWidth) / 2, 270);
		g.fillRect((bpi - sliderValue) * basepairWidth, 113, basepairWidth, 5);
		g.fillRect((bpi - sliderValue) * basepairWidth, 254, basepairWidth, 5);

	}
	g.font = 'normal 12px verdana';

	// paint basepairs
	var w = g.measureText('A').width;
	for(var pos = sliderValue; pos <= Math.round((sliderValue + width / basepairWidth)); pos++) {
		var c = sequence.charAt(pos);
		g.fillText(c, (pos - sliderValue) * basepairWidth - (w - basepairWidth) / 2, 130);
		var c2 = complementChar(c);
		g.fillText(c2, (pos - sliderValue) * basepairWidth - (w - basepairWidth) / 2, 252);
	}

	g.lineWidth = .25;
	// paint lines
	g.beginPath();
	for(var step = 0; step <= 7; step++) {
		g.moveTo(0, 135 + 15 * step);
		g.lineTo(width, 135 + 15 * step);
	}
	for(var bpi = from - 3; bpi <= to; bpi += 1) {
		var step = bpi % 3;
		g.moveTo((bpi - sliderValue) * basepairWidth, 135 + step * aminoacidHeight);
		g.lineTo((bpi - sliderValue) * basepairWidth + 3, 142 + step * aminoacidHeight);
		g.lineTo((bpi - sliderValue) * basepairWidth, 150 + step * aminoacidHeight);

		g.moveTo((bpi - sliderValue) * basepairWidth, 195 + step * aminoacidHeight);
		g.lineTo((bpi - sliderValue) * basepairWidth - 3, 202 + step * aminoacidHeight);
		g.lineTo((bpi - sliderValue) * basepairWidth, 210 + step * aminoacidHeight);
	}
	g.stroke();
	g.closePath();

	function paintStopCodon(codon, step, bpi, dir) {
		if(codon == 'STOP') {
			var x0 = (bpi - sliderValue) * basepairWidth;
			var y0 = 135 + step * 15;
			g.beginPath();
			g.moveTo(x0, y0);
			g.lineTo(x0 + 3 * basepairWidth, y0);
			g.lineTo(x0 + 3 * basepairWidth + 3 * dir, y0 + 7);
			g.lineTo(x0 + 3 * basepairWidth, y0 + aminoacidHeight);
			g.lineTo(x0, y0 + 15);
			g.lineTo(x0 + 3 * dir, y0 + 7);
			g.fill();
			g.closePath();
		}
	}

	function paintStartCodon(codon, step, bpi, dir) {
		if(codon == 'Met') {
			var x0 = (bpi - sliderValue) * basepairWidth;
			var y0 = 135 + step * 15;
			g.beginPath();
			g.moveTo(x0, y0);
			g.lineTo(x0 + 3 * basepairWidth, y0);
			g.lineTo(x0 + 3 * basepairWidth + 3 * dir, y0 + 7);
			g.lineTo(x0 + 3 * basepairWidth, y0 + aminoacidHeight);
			g.lineTo(x0, y0 + 15);
			g.lineTo(x0 + 3 * dir, y0 + 7);
			g.fill();
			g.closePath();
		}
	}

	oldFillStyle = g.fillStyle;
	g.fillStyle = '#008000';
	for(var bpi = ((from > 3 ) ? from - 3 : 0); bpi <= to; bpi += 1) {
		var step = bpi % 3;
		if( typeof (decodedForward[step][bpi]) == 'object') {
			var x0 = (bpi - sliderValue) * basepairWidth;
			var y0 = 135 + step * 15 + 4;
			g.fillRect(x0, y0, basepairWidth * 3, basepairWidth / 2);
		}
		if( typeof (decodedReverse[step][sequence.length - bpi]) == 'object') {
			var x0 = (bpi - sliderValue) * basepairWidth;
			var y0 = 135 + (step + 4) * 15 + 4;
			g.fillRect(x0, y0, basepairWidth * 3, basepairWidth / 2);
		}

	}

	g.fillStyle = '#ff0000';
	for(var bpi = ((from > 3 ) ? from - 3 : 0); bpi <= to; bpi += 1) {
		var step = bpi % 3;
		var str = sequence.substring(bpi, bpi + 3);
		var codon = CodonMap[str];
		var codon2 = CodonMap[reverseComplementString(str)];
		paintStopCodon(codon, step, bpi, 1);
		paintStopCodon(codon2, step + 4, bpi, -1);
	}
	g.fillStyle = oldFillStyle;

	g.fillStyle = 'rgb(96,96,192)';
	for(var bpi = ((from > 3 ) ? from - 3 : 0); bpi <= to; bpi += 1) {
		var step = bpi % 3;
		var str = sequence.substring(bpi, bpi + 3);
		var codon = CodonMap[str];
		var codon2 = CodonMap[reverseComplementString(str)];
		paintStartCodon(codon, step, bpi, 1);
		paintStartCodon(codon2, step + 4, bpi, -1);
	}
	g.fillStyle = oldFillStyle;

	//draw Amino Acid text
	for(var bpi = from - 3; bpi <= to; bpi += 1) {
		var step = bpi % 3;
		var str = sequence.substring(bpi, bpi + 3);
		var codon = CodonMap[str];
		var codon2 = CodonMap[reverseComplementString(str)];
		var w = g.measureText(codon).width;
		var w2 = g.measureText(codon2).width;
		g.fillText(codon, (bpi - sliderValue) * basepairWidth + 2 - (w - 3 * basepairWidth) / 2, 147 + step * aminoacidHeight);
		g.fillText(codon2, (bpi - sliderValue) * basepairWidth - 2 - (w2 - 3 * basepairWidth) / 2, 147 + 60 + step * aminoacidHeight);

	}

}

function parseAminoAcids() {
	CodonMap = {};
	for(aa in AminoAcids ) {
		if(aa != 'START') {
			var list = AminoAcids[aa].codes;
			for(i in list ) {
				CodonMap[list[i]] = aa;
			}
		}
	}
}

function canvasClick(x, y, orig) {
	if(y <= 100) {
		// whole sequence click
		var canvas = document.getElementById('canvas');
		var width = canvas.width;
		var sequence = $("#sequence").attr("value");
		sequence = trim(sequence);
		var bpi = Math.round((sequence.length - width / basepairWidth) * x / width);
		if(bpi < 0) {
			bpi = 0;
		}
		if(bpi > sequence.length) {
			bpi = sequence.length;
		}
		var scrollbar = $('#scrollbar');
		scrollbar.slider('option', 'value', bpi);
		setSlider();
	}
	if(y >= 100 && orig != null) {
		var slide = x - orig.x;
		if(Math.abs(slide) > basepairWidth) {
			var steps = Math.round(slide / basepairWidth);
			orig.x += steps * basepairWidth;
			var scrollbar = $('#scrollbar');
			sliderValue = sliderValue - steps;
			scrollbar.slider('option', 'value', sliderValue);
			setSlider();
		}
	} else if(y >= 100 && orig == null) {
		var steps = Math.round(x / basepairWidth);
		var bpi = sliderValue + steps - 1;
		var row = Math.ceil((y - 135) / aminoacidHeight);
		if(row >= 1 && row <= 3) {
			var range = decodedForward[row-1][bpi];
			putativeORF = {
				from : range.from,
				to : range.to,
				forward : true
			};
			decodePutativeORF();
			console.info("decode forward on bpi: " + bpi + " row:" + row + " " + range.from + "-" + range.to);
		} else if(row >= 5 && row <= 7) {
			var range = decodedReverse[row-5][sequence_length - bpi];
			putativeORF = {
				from : range.from,
				to : range.to,
				forward : false
			};
			decodePutativeORF();
			console.info("decode reverse on bpi: " + bpi + " row:" + row + " " + range.from + "-" + range.to);

		}
	}
}

function decodePutativeORF() {
	$('#decodedlabel').show();
	$('#decoded').show();
	var from = putativeORF.from;
	var to = putativeORF.to;
	var forward = putativeORF.forward;
	var sequence = $("#sequence").attr("value");
	sequence = trim(sequence);
	if(!forward) {
		sequence = reverseComplementString(sequence);
	}
	var decoded = '';
	for(var bpi = from + 3; bpi < to; bpi += 3) {
		var str = sequence.substring(bpi, bpi + 3);
		var codon = CodonMap[str];

		if(!decode3Letter) {
			decoded += AminoAcids[codon].shortName;
		} else {
			decoded += codon + ' ';

		}
	}
	$('#decoded').html(decoded);
	$('#allORFs').html('');
}

function decode(sequence, minLength) {
	var ret = {};
	for(var f = 0; f < 3; f++) {
		ret[f] = {};
		var lastStop = 0;
		var foundStop = false;
		for(var bpi = f; bpi < sequence.length; bpi += 3) {
			var str = sequence.substring(bpi, bpi + 3);
			var codon = CodonMap[str];
			if(codon == 'STOP') {
				if((bpi - lastStop) >= (minlen * 3)) {
					var range = {
						from : lastStop,
						to : bpi
					};
					for(var dec = lastStop; dec <= bpi; dec++) {
						ret[f][dec] = range;
					}
				}
				lastStop = bpi;
				foundStop = true;
			} else if(!foundStop && codon == 'MET') {
				lastStop = bpi;
				foundStop = true;
			}
		}
	}
	return ret;
}

function calculateAllORFs() {
	$('#decodedlabel').hide();
	$('#decoded').hide();

	var html = '';
	var sequence = $("#sequence").attr("value");
	sequence = trim(sequence);
	var rf = calculateAllORFs_internal(sequence);
	var rb = calculateAllORFs_internal(reverseComplementString(sequence));
	html += '<div style="background-color:rgb(225,255,225);font-weight:bold;font-size:18px;">Forward decoding</div><div style="width:100%;word-break:break-all">';
	for(i in rf ) {
		var item = rf[i];
		var link = 'http://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=' + item.l1;
		html += "<span style='width:600px'><b>Forward " + item.from + "-" + item.to + "</b></span> <a class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' target='blast' style='height:20px;width:125px' href='" + link + "'><span  style='font-size:12px;width:50px'> Run Blast search </span></a><br>" + ( decode3Letter ? item.l3 : item.l1) + "<br>";
	}
	html += '</div>';
	html += '<div style="background-color:rgb(225,255,225);font-weight:bold;font-size:18px;">Reverse decoding</div><div style="width:100%;word-break:break-all">';

	for(i in rb ) {
		var item = rb[i];
		var link = 'http://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=' + item.l1;
		html += "<span style='width:600px'><b>Reverse " + item.from + "-" + item.to + "</b></span> <a class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' target='blast' style='height:20px;width:125px' href='" + link + "'><span  style='font-size:12px;width:50px'> Run Blast search </span></a><br>" + ( decode3Letter ? item.l3 : item.l1) + "<br>";
	}
	$('#allORFs').html(html);
}

function calculateAllORFs_internal(sequence) {
	var ret = [];
	for(var f = 0; f < 3; f++) {
		var lastStop = 0;
		var foundStop = false;
		for(var bpi = f; bpi < sequence.length; bpi += 3) {
			var str = sequence.substring(bpi, bpi + 3);
			var codon = CodonMap[str];
			if(codon == 'STOP') {
				if((bpi - lastStop) >= (minlen * 3)) {
					var from = lastStop;
					var to = bpi;
					var l1 = '';
					var l3 = '';
					for(var bpi = from + 3; bpi < to; bpi += 3) {
						var str = sequence.substring(bpi, bpi + 3);
						var codon = CodonMap[str];
						l1 += AminoAcids[codon].shortName;
						l3 += codon + ' ';
					}
					ret.push({
						from : lastStop,
						to : bpi,
						l3 : l3,
						l1 : l1
					});
				}
				lastStop = bpi;
				foundStop = true;
			} else if(!foundStop && codon == 'MET') {
				lastStop = bpi;
				foundStop = true;
			}
		}
	}
	return ret;
}
});
