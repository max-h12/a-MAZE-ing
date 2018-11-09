
window.onload = function(){
  drawMaze();
  randomEnd();
  drawImage("right");
}
  document.onkeydown = checkKey;

var x = setInterval(function() {
    var curTime = new Date().getTime();
    var remaining = numberOfItems-numberCaught;
    timeLeft = Math.round((timeLimit - (0.001*(curTime - startTime)))*100)/100;

    if(timeLeft > 0){
      document.getElementById("time").innerHTML = "TIME LEFT: " + timeLeft;
    }
    else{
      document.getElementById("time").innerHTML = "TIME LEFT: " + 0;

        wonGame = true;
        cP.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
        cM.clearRect(0, 0, canvasMaze.width, canvasMaze.height);
        document.getElementById("title").innerHTML = "You Lose";
      
    }

    document.getElementById("score").innerHTML = "REMINING GOALS: " + remaining;
    document.getElementById("speed").innerHTML = "SPEED: " + speed;
}, 100);
