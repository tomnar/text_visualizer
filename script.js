var modifier = 1;

$(document).ready(function(){

	$("button").click(function(){
		var text = $("textarea").val();
		
		var canvas = $("canvas").get(0);
		var ctx=canvas.getContext("2d");		
		var ww = canvas.width;
		var wh = canvas.height;
		var x = canvas.width/2;
		var y = canvas.height/2;
		ctx.moveTo(x,y);
		
		//removing elements
		//todo: make it possible to enter new text again without reloading
		$("textarea").remove();
		$("button").remove();
		$(".loader").show();

		var mode = 0;
		for(var i = 0; i < text.length; i++){
			var c = text.charAt(i);
			if (c == "."){
				mode++;
				ctx.lineTo(x,y);
				ctx.stroke();
				if (mode == 4) {mode = 0;}
			}
			switch(mode){
			case 0:
				x = x + modifier;
				break;
			case 1:
				y = y + modifier;
				break;
			case 2:
				x = x - modifier;
				break;
			case 3:
				y = y - modifier;
				break;
			}
		}

		//Resizing of the canvas element

		//GET ALL CANVAS PIXELDATA
		imageData = ctx.getImageData(0, 0, ww, wh);

		/* INICIALIZE TOP LEFT CORNER FAR IN THE RIGHT SIDE */
		var topLeftCorner = {};
		topLeftCorner.x = 15000;
		topLeftCorner.y = 15000;

		/* INICIALIZE BOTTOM LEFT CORNER OUTSIDE THE CANVAS */
		var bottomRightCorner = {};
		bottomRightCorner.x = -1;
		bottomRightCorner.y = -1;                             

		/* RUN TROUGHT ALL THE IMAGES'S PIXELS CHECKING IF THERE IS SOTHING ON THEM */
		for (y = 0; y < wh; y++) {
			for (x = 0; x < ww; x++) {

				var pixelPosition = (x * 4) + (y * wh * 4);

				/* EACH PIXEL HAS 4 "BYTES" OF DATA CORRESPONDING TO red, green, blue AND alpha, alpha IS +3*/
				a = imageData.data[pixelPosition+3];

				/* IGNORE THE COMPONENT if a == 0 (IT'S EMPTY) */
				if (a > 0) {
					
					/* GET THE TOP MOST LEFT PIXEL, AND THE BOTTOM MOST RIGHT ONE */
					if (x < topLeftCorner.x) {
						topLeftCorner.x = x;
					}
					if (y < topLeftCorner.y) {
						topLeftCorner.y = y;
					}
					if (x > bottomRightCorner.x) {
						bottomRightCorner.x = x;
					}
					if (y > bottomRightCorner.y) {
						bottomRightCorner.y = y;
					}
				}
			}
		}

		/* SAVE THE REGION WE WANT TO TRIM TO  A VARIABLE (x, y, width, heigth) */
		relevantData = ctx.getImageData(topLeftCorner.x, topLeftCorner.y, bottomRightCorner.x -topLeftCorner.x, bottomRightCorner.y - topLeftCorner.y);

		/* RESIZE OUR ORIGINAL CANVAS TO NEEDED SIZE */
		canvas.width = bottomRightCorner.x - topLeftCorner.x;
		canvas.height = bottomRightCorner.y - topLeftCorner.y;

		/* CLEAN THE CANVAS*/
		ctx.clearRect(0,0,canvas.width,canvas.height);

		/* "PASTE" BACK THE RELEVANT CONTENT AT 0,0 */
		ctx.putImageData(relevantData, 0, 0);

		//transferring to image as data url
		var dataURL = canvas.toDataURL();

		// set canvasImg image src to dataURL
		document.getElementById('canvasImg').src = dataURL;
		
		//SHOW THE IMAGE
		$("img").show();
	});
});