function Bonus(){
  this.x = random(width);
  this.y = random(height);
  this.smallradius = 10;//random(10, 30);
  this.largeradius = 30;//random(10, 30);
  this.speed = -3;
  this.acceleration = -0.00;
  this.color =  color(255, 206, 15)   

  this.move = function() {
    if (this.y <= 0) {
      this.y = height;
      this.x = random(width);
      this.speed = -3;
    } else if (this.y >=height){
      this.y = 0;
      this.x = random(width);
      this.speed = -3;
    }
    this.y -= this.speed;//random(-this.speed, this.speed);
    this.speed += this.acceleration;
  };

  this.display = function() {
    fill(this.color);
    star(this.x, this.y, this.smallradius, this.largeradius,5);

  }  
 
  this.crash = function(){
      this.y = 0;
      this.x = random(width);
      this.speed = -3;
  }   
  
  this.stop = function(){
    this.speed = 0;
  }
}
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
