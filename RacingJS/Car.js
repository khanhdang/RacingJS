function Car() {
  this.x = random(15,width-15);
  this.y = -30;
  this.width = 30;//random(10, 30);
  this.height = 45;//random(10, 30);
  this.speed = -3;
  this.acceleration = -0.001;
  this.color =  color(129, 206, 15,0)
  this.opponent = false;

  this.stop = function() {
    this.speed = 0;
    this.acceleration = 0;
  }
  this.move = function() {
    //if (this.y <= 0) {
    //  this.y = height;
    //  this.x = random(width);
    //} else
    if (this.y >=height){
      this.y = -30;
      this.x = random(15,width-15);
    }
    this.y -= this.speed;//random(-this.speed, this.speed);
    //this.y += random(-this.speed, this.speed);
    this.speed += this.acceleration;
  };

  this.display = function() {
    noStroke();
    noFill();
    rect(this.x, this.y, this.width, this.height);
    if (this.opponent) {
      image(opponent_img,this.x, this.y, this.width, this.height);
    } else {
      image(yours_img,this.x, this.y, this.width, this.height);
    }
  }

  this.turn = function(i){
    this.x +=i;
  }

  this.crash = function(){
    // I need to improve this function
    // First, the crash car will be rotated
    // After 3/4 circle, it turns as normal
    
    this.color =  color(255, 15, 15)
    this.speed = 0;
    this.acceleration = 0;
  }
};