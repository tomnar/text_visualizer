$(document).ready(function(){
/*
var text2 = "this is a test. this too. yea test";
var modifier = 1;

var d=document.getElementById("myCanvas");
var ctx=d.getContext("2d");
var x = d.width/2;
var y = d.height/2;
ctx.moveTo(x,y);

var mode = 0;
for(var i = 0; i < text2.length; i++)
{
    var c = text2.charAt(i);
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

//resizing
micanvas = document.getElementById('myCanvas');
ww = micanvas.width;
wh = micanvas.height;
ctx = micanvas.getContext('2d');

//WE GET ALL CANVAS PIXELDATA
imageData = ctx.getImageData(0, 0, ww, wh);

/* WE INITIALIZE THE VARIABLES WHERE WE'LL STORE THE DIMENSIONS
OF THE CANVAS RECTANGLE WE HAVE RELEVANT DATA, IE NON-EMPTY
PIXELS*/

/* WE INICIALIZE TOP LEFT CORNER FAR IN THE RIGHT SIDE */
var topLeftCorner = {};
topLeftCorner.x = 15000;
topLeftCorner.y = 15000;

/* WE INICIALIZE BOTTOM LEFT CORNER OUTSIDE THE CANVAS
BELOW WE'LL SEE WHY :) */
var bottomRightCorner = {};
bottomRightCorner.x = -1;
bottomRightCorner.y = -1;                             

/* NOW WE RUN TROUGHT ALL THE IMAGES'S PIXELS CHECKING IF THERE IS SOTHING ON THEM */
for (y = 0; y < wh; y++) {
    for (x = 0; x < ww; x++) {

        var pixelPosition = (x * 4) + (y * wh * 4);

        /* EACH PIXEL HAS 4 "BYTES" OF DATA CORRESPONDING TO red, green, blue AND alpha*/
        //r = imageData.data[pixelPosition]; //red
        //g = imageData.data[pixelPosition+1]; //green
        //b = imageData.data[pixelPosition+2]; //blue
        
        /* I'M ONLY INTERESTED IN ALPHA COMPONENT, IF SOMETHING IS PRESENT IN THAT PIXEL ALPHA (a) VALUE MUST BE > 0*/
        a = imageData.data[pixelPosition+3]; //alpha

        /* I IGNORE THE r,g,b COMPONENT, ONLY CHECK IF alpha > 0 */
        if (a > 0) {
            
            /* HERE I GET THE TOP MOST LEFT PIXEL, AND THE BOTTOM MOST RIGHT ONE */
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

/* HERE WE HAVE THE COORDINATES OF THE RECTANGLE CONTAINING SOMETHING DROWN */
console.log(topLeftCorner);
console.log(bottomRightCorner);

/* NOW WE SAVE THE REGION WE WANT TO TRIM TO  A VARIABLE */
/* (x, y, width, heigth) */
relevantData = ctx.getImageData(topLeftCorner.x, topLeftCorner.y, bottomRightCorner.x -topLeftCorner.x, bottomRightCorner.y - topLeftCorner.y);

/* RESIZE OUR ORIGINAL CANVAS TO TE SIZE WE NEED */
micanvas.width = bottomRightCorner.x - topLeftCorner.x;
micanvas.height = bottomRightCorner.y - topLeftCorner.y;
ww = micanvas.width;
wh = micanvas.height;

/* NOW WE CLEAN THE CANVAS*/
ctx.clearRect(0,0,ww,wh);

/* FINALLY WE "PASTE" BACK THE RELEVANT CONTENT AT 0,0 */
ctx.putImageData(relevantData, 0, 0);

//transferring to image
// save canvas image as data url (png format by default)
      var dataURL = d.toDataURL();

      // set canvasImg image src to dataURL
      // so it can be saved as an image
      document.getElementById('canvasImg').src = dataURL;
});