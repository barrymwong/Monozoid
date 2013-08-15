(function($){

	var global = {
		glyphs : '0123456789|ABCDEFGHIJKLMNOPQRSTUVWXYZ|abcdefghijklmnopqrstuvwxyz|~!@#$%^&*()_+{}?"/\[]\'.,',
		glyphsCount : 0,
		lastRand : -1
	};
	
	var init = function() {
		printGlyphs();
	
		$(document).on('click', '.btn', function(){
			var text = $(this).html(),
				int = $('#typer').val();
			if(int.length < 10){
				$('#typer').val(int + text);
			}
			$('#typer').focus();
		});
		
		$(document).on('submit', 'form#add', function(e){
			e.preventDefault();
			addNewInventory();
		});
		
		makeDevice();
		$('#typer').focus();
	};
	
	var getRand = function (min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	var printGlyphs = function() {
		var btn, keyset = 0;

		for( var i = 0; i <= global.glyphs.length-1; i++ ) {
			if( global.glyphs[i] !== '|' ) {
				btn = '<button id="' + i + '" class="btn keyset' + keyset + '">' +  global.glyphs[i] + '</button>';
				$('#glyph-buttons').append(btn);
			} else {
				keyset = keyset + 1;
				$('#glyph-buttons').append('<br>');
			}
		}
	};
	
	var labelDir = function() {
		if(global.glyphsCount % 2 === 0) {
			return 'r';
		}
	};
	
	var makeDevice = function() {
		var rand = getRand(1, 9),
			a;

		if(rand === global.lastRand) {
			rand--;
			if( rand <= 0 ) {
				rand = 8;
			}
			console.log(rand);
		}
		
			
		a = '<div class="device device0' + rand + ' ' + labelDir() + '"></div>';
		$('#device-new').html(a);
		global.lastRand = rand;
		global.glyphsCount++;
	};
	
	var addNewInventory = function() {
		var a = $('#typer').val();	
		
		if( !$('#devices').hasClass('devices') ){
			$('#devices').addClass('devices');
		}
		
		if (a !== '') {	
			$('#devices').prepend( $('#device-new').html() );
			$('#devices .device:eq(0)').html('<div class="label"><span class="num">' + global.glyphsCount + '</span> ' + a + '</div><div class="line"></div>');
			$('#typer').val('');
			$('#typer').focus();
		makeDevice();
		}
	};
	
	// run onload
	init();

})(jQuery);