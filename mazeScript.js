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

var actualMazeWidth = (mazeWidth - 1) * sz;
var actualMazeHeight = (mazeHeight - 1) * sz;


//position of goal image.  530, 35
var endX = 10;
var endY = 10;

//define keypresses
var left = '37';
var right = '39';
var up = '38';
var down = '40';
var plus = '187';
var minus = '189';


console.log("Width: " + actualMazeWidth);


var marginX = ((cP.canvas.width) - (mazeWidth*sz))/2;
var marginY = ((cP.canvas.height) - (mazeHeight*sz))/2;


document.onkeydown = checkKey;
document.onmousemove = function()
{
  console.log("P:" + event.clientX + "," + event.clientY);
}


/* Draws all images that are fixed within canvas
*This includeds the main board and goal */
function drawImage(){
        if( Math.abs(yPlayer - endY) <= 5 && Math.abs(xPlayer - endX) <= 5 && xPlayer>0 && yPlayer>0)
        {
          console.log("test");
            cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
            cM.clearRect(0, 0, canvasMaze.width, canvasMaze.height);
            document.getElementById("title").innerHTML = "YOU WON!!! YOU ARE A-MAZE-ING!!!";
            var winner = new Image();
            winner.src = "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimages.hellogiggles.com%2Fuploads%2F2016%2F12%2F09032937%2FSuccess-Kid.jpg&w=700&c=sc&poi=face&q=85";
            cP.drawImage(winner,(canvasPlayer.width-winner.width)/2, (canvasPlayer.height-winner.height)/2);
        }
        else
        {

            cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
            cP.drawImage(goal, endX, endY, playerSize, playerSize);
            cP.drawImage(player, xPlayer, yPlayer, playerSize, playerSize);
        }
}

/*Places the goal random in the maze*/
function randomEnd(){  //0 is end, 1 is player

  console.log(marginX);
  //I have no idea how to randomly place the chese
  var maxX =  cP.canvas.width*.5 + (actualMazeWidth*.5);
  var minX = cP.canvas.width*.5 - (actualMazeWidth * .5);
  var maxY =  cP.canvas.height*.5 + (actualMazeHeight * .5);
  var minY =  cP.canvas.height*.5 - (actualMazeHeight * .5);
  console.log(minX +  " to " +  maxX);
  console.log(minY +  " to " +  maxY);
  tempEndX = Math.floor(Math.random()*(maxX-minX))+minX;
  tempEndY = Math.floor(Math.random()*(maxY-minY)) + minY;

    while(!canMoveThere(tempEndX,tempEndY))
    {
        console.log("run");
        maxX = cP.canvas.width*.5 + (actualMazeWidth*.5) - sz;
        minX = cP.canvas.width*.5 - (actualMazeWidth * .5) + sz;
        maxY =  cP.canvas.height*.5 + (actualMazeHeight * .5) - sz;
        minY =  cP.canvas.height*.5 - (actualMazeHeight * .5) + sz;
        console.log(minX +  " to " +  maxX)
        tempEndX = Math.floor(Math.random()*(maxX-minX))+minX;
        tempEndY = Math.floor(Math.random()*(maxY-minY)) + minY;
        console.log(tempEndX);
        console.log(tempEndY);
    }

      endX = tempEndX;
      endY = tempEndY;
}
/*Draw the main maze*/
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
    var collision = true;
    //x > marginX+sz && y > marginY+sz
    if(x>0 && y>0){
        var color = cM.getImageData(x, y, playerSize, playerSize);
        var p = color.data;
        var n = p.length;
        for(var i = 0; i<n; i+=4){
            if(p[i] === 0)
            {
                 collision = false;
            }
        }
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
            xPlayer++;
            if(canMoveThere(xPlayer, yPlayer))
            {
              drawImage();
            }
            else {
              xPlayer--;
            }
        }
    }
    if(e.keyCode == up)
    {
        e.preventDefault();
        for(var i = 0; i<speed; i++)
        {
            yPlayer--;
            if(canMoveThere(xPlayer, yPlayer))
            {
              drawImage();
            }
            else {
              yPlayer++;
            }
        }
    }
    if(e.keyCode == down)
    {
        e.preventDefault();
        for(var i = 0; i<speed; i++)
        {
            yPlayer--;
            if(canMoveThere(xPlayer, yPlayer))
            {
              drawImage();
            }
            else {
              yPlayer++;
            }
        }
    }

    if(e.keyCode == plus)
    {
        speed+= 1;
        if(speed > maxSpeed)
        {
          speed -= 1;
        }
    }
    if(e.keyCode == minus)
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
