var balloon,balloonImage1,balloonImage2,bg;
var database,height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup(){
  database = firebase.database();
  createCanvas(1500,700);

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showError);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.addAnimation("hotAirBalloon1",balloonImage2);
  balloon.scale=0.5;
}

function draw(){
  background(bg);

  if(height !== undefined){

  if(keyDown(LEFT_ARROW)){
    update(-10,0);
    balloon.changeAnimation("hotAirBalloon1",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    update(10,0);
    balloon.changeAnimation("hotAirBalloon1",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    update(0,-10);
    balloon.changeAnimation("hotAirBalloon1",balloonImage2);
    balloon.scale = balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    update(0,10);
    balloon.changeAnimation("hotAirBalloon1",balloonImage2);
    balloon.scale = balloon.scale+0.01;
  }
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  drawSprites();
 }
}
  
function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
 }

 function updateHeight(x,y){
  database.ref('balloon/height').set({
      'x':height.x+x,
      'y':height.y+y
  })
}

function showError(){
  console.log("Error in writing to the database");
}
  
function update(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}