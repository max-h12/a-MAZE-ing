/*Canvas Declarations*/

var cM = canvasMaze.getContext("2d");

var canvasPlayer = document.getElementById('canvasPlayer');
var cP = canvasPlayer.getContext("2d");

var mazeDrawn = false;

//set canvas size to size of webpage
cM.canvas.width = window.outerWidth;
cM.canvas.height = window.outerHeight;

cP.canvas.width = window.outerWidth;
cP.canvas.height = window.outerHeight;

var actualMazeWidth;
var actualMazeHeight;

/*Player Declarations*/
var speed = 10;
var maxSpeed = 20;
var minSpeed = 1;

var playerSize = 30;
var sz = playerSize + 18;

var xPlayer = 0;
var yPlayer = 0;

var maxX;
var minX;
var maxY;
var minY;

var marginY;
var marginX;

/*Maze Declarations*/

var mazeWidth = 20;
var mazeHeight = window.outerWidth/90; //can we make this dynmic


/*Image Declarations*/
var playerU = new Image();


var playerD = new Image();


var playerR = new Image();


var playerL = new Image();


var goal = new Image();
goal.src = "img/mouse/win.png";

var picturePath = "";
var picture = new Image();

/*Goal and Game Player Declarations*/
var wonGame = false;
var numberOfItems = 1;
var numberCaught = 0;
var endX=[];
var endY=[];

var startTime = new Date().getTime();
var timeLimit = 120;
var curTime;
var timeLeft;

/*Key Press Declarations*/
var left = '37';
var right = '39';
var up = '38';
var down = '40';
var plus = '187';
var minus = '189';
