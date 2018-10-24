
window.onload = function(){
  drawMaze();
  randomEnd();
  drawImage("right");
}

document.onkeydown = checkKey;
