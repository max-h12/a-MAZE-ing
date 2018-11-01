/*Canvas Declarations*/

var cM = canvasMaze.getContext("2d");

var canvasPlayer = document.getElementById('canvasPlayer');
var cP = canvasPlayer.getContext("2d");

var mazeDrawn = false;

//set canvas size to size of webpage
cM.canvas.width = window.innerWidth;
cM.canvas.height = window.innerHeight;

cP.canvas.width = window.innerWidth;
cP.canvas.height = window.innerHeight;

/*Player Declarations*/
var speed = 1;
var maxSpeed = 20;
var minSpeed = 1;

var playerSize = 20;
var sz = playerSize + 18;

var xPlayer = 0;
var yPlayer = 0;

/*Maze Declarations*/

var mazeWidth = 20;
var mazeHeight = 20;

var actualMazeWidth = (mazeWidth - 1) * sz;
var actualMazeHeight = (mazeHeight - 1) * sz;

var maxX =  cP.canvas.width*.5 + (actualMazeWidth*.5) - 2*sz;
var minX = cP.canvas.width*.5 - (actualMazeWidth * .5) + sz ;
var maxY =  cP.canvas.height*.5 + (actualMazeHeight * .5) - 2*sz;
var minY =  cP.canvas.height*.5 - (actualMazeHeight * .5) + sz;

var marginX = ((cP.canvas.width) - (mazeWidth*sz))/2;
var marginY = ((cP.canvas.height) - (mazeHeight*sz))/2 + cP.canvas.height/50;



/*Image Declarations*/
var playerU = new Image();
playerU.src = "img/mouse/mouseU.png";

var playerD = new Image();
playerD.src = "img/mouse/mouseD.png";

var playerR = new Image();
playerR.src = "img/mouse/mouseR.png";

var playerL = new Image();
playerL.src = "img/mouse/mouseL.png";

var goal = new Image();
goal.src = "img/mouse/cheese.png";

/*Goal and Game Player Declarations*/
var wonGame = false;
var numberOfItems = 10;
var numberCaught = 0;
var endX=[];
var endY=[];

/*Key Press Declarations*/
var left = '37';
var right = '39';
var up = '38';
var down = '40';
var plus = '187';
var minus = '189';

var startTime = new Date().getTime();
var timeLimit = 30;
