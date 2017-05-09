var opponent_cars = [];
var number_of_opponents = 7;
var your_car;
var safe_distance;
var countdown = 100;
var opponent_index = 0;
var speed = -3;
var background_shift = -999;
var number_of_bonus = 3;
var bonus = [];

var car_dist_x;
var car_dist_y;
var gameover = false;
var score = 0;
var keycheckfeq=10;


var yours_img;
var opponent_img;


function preload(){
  yours_img = loadImage('images/yours.png');
  opponent_img = loadImage('images/opponent.png');
  road_img = loadImage('images/road-1.png');
}


function setup() {
  createCanvas(400, 600);
  //image(yours_img, 0, 0, 100, 100, 0, 0, 100, 100);
/*  for ( var i = 0; i < num; i++ ) {*/
    //ax[i] = width / 2;
    //ay[i] = height / 2;
  //}
  /*frameRate(30);*/
  your_car = new Car();
  your_car.x = width/2-your_car.width/2;
  your_car.y= height/2+your_car.height*3;
  your_car.opponent = false;
  for (var i=0; i<number_of_bonus; i++){
    bonus[i] = new Bonus();
  }
  safe_distance = dist(0,0,your_car.width, your_car.height);
}

function draw() {
  //frameRate(0.1);
  background(170);
  image(road_img,0, background_shift, 400, 1600);
  background_shift -= 3*speed;
  if (background_shift == 0) background_shift=-999;
  
  if (countdown == 100 && opponent_index <number_of_opponents){
    opponent_cars[opponent_index] = new Car();
    opponent_cars[opponent_index].color = color(0,0,255);
    opponent_cars[opponent_index].opponent = true;
    //opponent_cars[opponent_index].speed = speed;
    opponent_index++;
    countdown--;
  } else if (countdown == 0){
    countdown = 101;
  } else {
    countdown--;
  }


  checkPressedKey();

  if(your_car){
  //your_car.move();
  your_car.display();
  }
  for (var i=0; i<opponent_cars.length; i++){
    opponent_cars[i].display();
    opponent_cars[i].move();
  }    
  for (var i=0; i<bonus.length; i++){
    bonus[i].display();
    bonus[i].move();
  }  
  gameover = CarCrash();
  if (GetBonus()) score++;
  if(gameover){
     for (var i=0; i<opponent_cars.length; i++){
      opponent_cars[i].stop();
      
    } 
    for (var j=0; j<bonus.length; j++) {
      bonus[j].stop();
    }
    background_shift = 0;
    fill(155,0,0,103);
    rect(0,0,width,height);
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(255,255,255);
    text("GAMEOVER!!!", width/2, height/2);
  }

  DisplayScore();
}
function mousePressed() {
  if (gameover){
    your_car.stop();
  } else  if (your_car.x < mouseX) {
    your_car.turn(10);
  } else if (your_car.x > mouseX) {
    your_car.turn(-10);
  }

}
function checkPressedKey() {
  if (gameover){
    your_car.stop();
  }else if (keyIsPressed && keyCode == LEFT_ARROW) {
    your_car.turn(-2);
  } else if (keyIsPressed && keyCode == RIGHT_ARROW) {
    your_car.turn(2);
  } else if (keyIsPressed && keyCode == UP_ARROW){
    your_car.acceleration +=0.01;
  } else if (keyIsPressed && keyCode == DOWN_ARROW){
    your_car.acceleration -=0.01;
  }  
  return false; // prevent default
}


function CarCrash(){
  for (var i=0; i<opponent_cars.length; i++){
    car_dist_x = dist(opponent_cars[i].x,0,your_car.x, 0);
    car_dist_y = dist(0,opponent_cars[i].y,0, your_car.y);
    if (car_dist_x < your_car.width && car_dist_y < your_car.height){
      your_car.crash();
      return true;
    }
  }
  return false;
}

function GetBonus(){
  for (var i=0; i<bonus.length; i++){
    var  bonus_dist = dist(bonus[i].x,bonus[i].y,your_car.x+your_car.width/2,your_car.y);
    if (bonus_dist < bonus[i].largeradius){
      bonus[i].crash();
      return true;
    }
  }
  return false;
}

function DisplayScore(){
  fill(0);
  rect(0,height-30,width,30);
  textSize(28);
  textAlign(LEFT,CENTER);
  fill(255);
  text("SCORE: "+str(score), 10,  height-15);
}