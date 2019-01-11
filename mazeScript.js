
window.onload = function(){
  setPlayerImage("dory");
  getUrlVars();
  drawMaze();
  randomPlaceGoals();
  drawImage("right");
}

document.onkeydown = checkKey;

var x = setInterval(function() {

  checkForTheWin();

  if(!wonGame){
      var curTime = new Date().getTime();
      var remaining = numberOfItems-numberCaught;
      timeLeft = Math.round(Math.round((timeLimit - (0.001*(curTime - startTime)))*100)/100);
    }

    if(timeLeft > 0 && !wonGame){
      document.getElementById("time").innerHTML = "TIME LEFT: " + timeLeft;
      document.getElementById("score").innerHTML = "REMINING GOALS: " + remaining;
      document.getElementById("speed").innerHTML = "SPEED: " + speed;
    }
    else if(timeLeft < 0 && !wonGame){
        document.getElementById("time").innerHTML = "TIME LEFT: " + 0;

        wonGame = true;
        cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
        cM.clearRect(0, 0, canvasMaze.width, canvasMaze.height);
        document.getElementById("title").innerHTML = "You Didn't Get Them All.";
        document.getElementById("score").innerHTML = "Score: " + calculateScore();
    }
}, 100);
