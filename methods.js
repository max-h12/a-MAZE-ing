/* Redraws the goals and the player after every round.
* Checks if the player got a goal piece and if the player won*/
function drawImage(pos){
    for(var n = 0; n<numberOfItems; n++){
          if( Math.abs(yPlayer - endY[n]) <= 10 && Math.abs(xPlayer - endX[n]) <= 10 && xPlayer>0 && yPlayer>0)
          {
              numberCaught++;
              endX[n] = -100;
              endY[n] = -100;
          }
          else
          {
              cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
              for(var i = 0; i<numberOfItems; i++)
              {
                cP.drawImage(goal, endX[i], endY[i], playerSize, playerSize);
              }
              var player;
              if(pos == "left")
              {
                player = playerL;
              }
              if(pos == "right")
              {
                player = playerR;
              }
              if(pos == "up")
              {
                player = playerU;
              }
              if(pos == "down")
              {
                player = playerD;
              }

              cP.drawImage(player, xPlayer, yPlayer, playerSize, playerSize);
          }
        }
        if(numberOfItems == numberCaught){
          wonGame = true;
          cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
          cM.clearRect(0, 0, canvasMaze.width, canvasMaze.height);
          document.getElementById("title").innerHTML = "You Got Them ALL! Click The ENTER Key To Continue";
          document.getElementById("score").innerHTML = "Score: " + calculateScore();
          var winner = new Image();
          winner.onload = function()
          {
            cM.drawImage(winner,(canvasMaze.width-winner.width)/2, (canvasMaze.height-winner.height)/2);
          }
          winner.src = "img/win.jpg";
        }
}

function calculateScore()
{
  var score;
  if(numberCaught == 0)
  {
    score = 0;
  }
  else {
    score = (numberOfItems/numberCaught) * (timeLimit-timeLeft) * 100;
  }
  return score;
}

/*Places the goal random in the maze*/
function randomEnd(){  //0 is end, 1 is player
  for(var i = 0; i<numberOfItems; i++){
    tempEndX = Math.floor(Math.random()*(maxX-minX)) + minX;
    tempEndY = Math.floor(Math.random()*(maxY-minY)) + minY;
      while(!canMoveThereGoal(tempEndX,tempEndY))
      {
          tempEndX = Math.floor(Math.random() *(maxX-minX))+minX;
          tempEndY = Math.floor(Math.random() *(maxY-minY)) + minY
      }

        endX[i] = tempEndX;
        endY[i] = tempEndY;
      }
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

/*Returns true or false based on wheter a player
*can move to any given x and y */
function canMoveThere(x, y)
{
    var canBeThere = true;
    if(x > 0 && y > 0){
        var color = cM.getImageData(x, y, playerSize, playerSize);
        var p = color.data;
        var n = p.length;
        for(var i = 0; i<n; i+=4){
            if(p[i] === 0)
            {
                 canBeThere = false;
            }
        }
      }
      else if(x < 0 || y < 0)
      {
        console.log(x + "," + y);
        canBeThere = false;
      }
    return canBeThere;
}

/*Checks if a goal can be placed at x,y
True if yes.  False if no.*/
function canMoveThereGoal(x, y)
{
    var canBeThere = true;
    //don't ask me why this works
    if(x < maxX && x > minX && y < maxY && y > minY){
        var color = cM.getImageData(x, y, playerSize, playerSize);
        var p = color.data;
        var n = p.length;
        for(var i = 0; i<n; i+=4){
            if(p[i] === 0)
            {
                 canBeThere = false;
            }
        }
    }
    else{
      canBeThere = false;
    }
    return canBeThere;
}



/*Check key press of event listener key down and utilitzes move(x,y)*/
function checkKey(e)
{
    e = e || window.event;

    if(e.keyCode == left)
    {
        e.preventDefault();
        for(var i = 0; i<speed; i++)
        {
            xPlayer--;
            if(canMoveThere(xPlayer, yPlayer))
            {
              drawImage("left");
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
              drawImage("right");
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
              drawImage("up");
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
            yPlayer++;
            if(canMoveThere(xPlayer, yPlayer))
            {
              drawImage("down");
            }
            else {
              yPlayer--;
            }
        }
    }

    if(e.keyCode == 13 && wonGame == true)
    {

        e.preventDefault();

        numberCaught = 0;

        document.getElementById("title").innerHTML = "The A-MAZE-ing Game";

        cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
        cM.clearRect(0, 0, canvasMaze.width, canvasMaze.height);

        xPlayer = 0;
        yPlayer = 0;
        wonGame = false;
        timeLeft = timeLimit;
        console.log("Enter");

        drawMaze();

        randomEnd();
        drawImage("right");
    }

    if(e.keyCode == plus)
    {
        speed++;
        if(speed > maxSpeed)
        {
          speed--;
        }
    }

    if(e.keyCode == minus)
    {
        speed--;
        if(speed < minSpeed)
        {
          speed++;
        }
    }
}

function getUrlVars()
{
    var urlParams = new URLSearchParams(window.location.search);
    var r = [urlParams.get('items'),urlParams.get('size')];

  mazeWidth = r[1];

  numberOfItems  = r[0];

  actualMazeWidth = (mazeWidth - 1) * sz;
  actualMazeHeight = (mazeHeight - 1) * sz;

  maxX =  cP.canvas.width*.5 + (actualMazeWidth*.5) - 2*sz;
  minX = cP.canvas.width*.5 - (actualMazeWidth * .5) + sz ;
  maxY =  cP.canvas.height*.5 + (actualMazeHeight * .5) - 2*sz;
  minY =  cP.canvas.height*.5 - (actualMazeHeight * .5) + sz;

  marginX = ((cP.canvas.width) - (actualMazeWidth))/2;
  marginY = ((cP.canvas.height) - (actualMazeHeight))/2;
}
