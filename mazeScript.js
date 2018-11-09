
window.onload = function(){
  drawMaze();
  randomEnd();
  drawImage("right");
}
  document.onkeydown = checkKey;

var x = setInterval(function() {
    var curTime = new Date().getTime();
    var timeLeft = Math.round((timeLimit - (0.001*(curTime - startTime)))*100)/100;
    var remaining = numberOfItems - numberCaught;
    document.getElementById("score").innerHTML = "REMINING GOALS: " + remaining;
    document.getElementById("time").innerHTML = "TIME LEFT: " + timeLeft;
    document.getElementById("speed").innerHTML = "SPEED: " + speed;
}, 100);
