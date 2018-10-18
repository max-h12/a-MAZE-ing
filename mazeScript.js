/*Possible Additions:
*Add rotation to image based on arrows
*/


//define canvas
var canvasMaze = document.getElementById('canvasMaze');
var cM = canvasMaze.getContext("2d");

var canvasPlayer = document.getElementById('canvasPlayer');
var cP = canvasPlayer.getContext("2d");

var mazeDrawn = false;


//set canvas size to size of webpage
cM.canvas.width = window.innerWidth;
cM.canvas.height = window.innerHeight;

cP.canvas.width = window.innerWidth;
cP.canvas.height = window.innerHeight;

var speed = 1;
var maxSpeed = 20;
var minSpeed = 1;

var playerSize = 20;

var sz = playerSize + 18;

var player = new Image();
player.src = "mouse.png";
var goal = new Image();
goal.src = "cheese.png";

//player position
var xPlayer = 0;
var yPlayer = 0;

var mazeWidth = 20;
var mazeHeight = 20;

//position of goal image.  530, 35
var endX = 10;
var endY = 10;

//define keypresses
var left = '37';
var right = '39';
var up = '38';
var down = '40';


var marginX = ((cP.canvas.width) - (mazeWidth*sz))/2; //(canvasMaze.width - (mazeWidth * sz)) / 2 ;
var marginY = ((cP.canvas.height) - (mazeHeight*sz))/2;//(canvasMaze.heigth - (mazeHeight * sz)) / 2 ;


document.onkeydown = checkKey;


/* Draws all images that are fixed within canvas
*This includeds the main board and goal */
function drawImage(){
        if( Math.abs(yPlayer - endY) <= 5 && Math.abs(xPlayer - endX) <= 5)
        {
            cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
            cM.clearRect(0, 0, canvasMaze.width, canvasMaze.height);
            document.getElementById("title").innerHTML = "YOU WON!!! YOU ARE A-MAZE-ING!!!";
            var winner = new Image();
            winner.src = "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimages.hellogiggles.com%2Fuploads%2F2016%2F12%2F09032937%2FSuccess-Kid.jpg&w=700&c=sc&poi=face&q=85";
            cP.drawImage(winner,(canvasPlayer.width-winner.width)/2, (canvasPlayer.height-winner.height)/2);
            return true;
        }
        else
        {
            cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
            cP.drawImage(goal, endX, endY, playerSize, playerSize);
            cP.drawImage(player, xPlayer, yPlayer, playerSize, playerSize);
        }
}

function randomVal(max, min)
{
    return Math.floor(Math.random() * (max - min) ) + min;
}

function randomEnd(){  //0 is end, 1 is player

    var tempEndX;
    var tempEndY;

    while(canMoveThere(tempEndX,tempEndY) == 1)
    {
        tempEndX = Math.floor(Math.random()*((mazeWidth*sz) + marginX)) + marginX;
        tempEndY = Math.floor(Math.random()*((mazeHeight*sz) + marginY)) + marginY;
    }

      endX = tempEndX;
      endY = tempEndY;
}

function drawMaze(){


    cM.fillStyle = "white";
    cM.fillRect(0, 0, canvasMaze.width, canvasMaze.height);
    cM.fillStyle = "black";


    var maze = require('maze');
    var m = new maze.Backtracker(mazeWidth, mazeHeight);
    m.reset();
    m.generate();
    for (var r = 0; r < m.height; r++) {
         for (var c = 0; c < m.width; c++) {
            if (m.get(r, c)) {
                    cM.fillRect((c * sz) + marginX, (r * sz) + marginY, sz, sz);
                }
             }
         }

}


/*Returns 1 (can't move) or 0 (can move) based on wheter a player
*can move to any given x and y */
function canMoveThere(x, y)
{
    var collision = 0;
    //x > marginX+sz && y > marginY+sz
    if( x < (mazeWidth*sz)-sz  && y < (mazeHeight*sz)-sz){
        var color = cM.getImageData(x, y, playerSize, playerSize);
        var p = color.data;
        var n = p.length;
        for(var i = 0; i<n; i+=4){
            if(p[i] === 0)
            {
                 collision = 1;
            }
        }
    }
    else{
        collision = 1;
    }
    return collision;

}



/*Check key press of event listener key down and utilitzes move(x,y)*/
function checkKey(e)
{
    e = e || window.event;
    collision = 0;

    if(e.keyCode == left)
    {
        e.preventDefault();
        for(var i = 0; i<speed; i++)
        {
            xPlayer = xPlayer--;
            if(canMoveThere(xPlayer, yPlayer) == 0)
            {
              drawImage();
            }
            else {
              xPlayer++;
            }
        }
    }

    if(e.keyCode == right)
    {
        e.preventDefault();
        for(var i = 0; i<speed; i++)
        {
            xPlayer = xPlayer--;
            if(canMoveThere(xPlayer, yPlayer) == 0)
            {
              drawImage();
            }
            else {
              xPlayer++;
            }
        }
    }
    if(e.keyCode == up)
    {
        e.preventDefault();
        for(var i = 0; i<speed; i++)
        {
            xPlayer = xPlayer--;
            if(canMoveThere(xPlayer, yPlayer) == 0)
            {
              drawImage();
            }
            else {
              xPlayer++;
            }
        }
    }
    if(e.keyCode == down)
    {
        e.preventDefault();
        for(var i = 0; i<speed; i++)
        {
            xPlayer = xPlayer--;
            if(canMoveThere(xPlayer, yPlayer) == 0)
            {
              drawImage();
            }
            else {
              xPlayer++;
            }
        }
    }

    if(e.keyCode == 187)
    {
        speed+= 1;
        if(speed > maxSpeed)
        {
          speed -= 1;
        }
    }
    if(e.keyCode == 189)
    {
        speed-= 1;
        if(speed > minSpeed)
        {
          speed += 1;
        }
    }


    document.getElementById("speed").innerHTML = "SPEED: " + speed;


    if(!mazeDrawn)
    {
        drawMaze();
        randomEnd();

        cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
        drawImage();
        mazeDrawn = true;
    }

}
