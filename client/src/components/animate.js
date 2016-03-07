import Component from 'components/component.js';
import UUID from 'utils/uuid.js';

function animate(){
  for(var key in this.animations){
    this.animations[key].call(this);
  }
}

function animateTo(x, y, duration, callback){

  callback = callback || function(){};
  var id = UUID();

  var distanceBetweenTwoPoints = function(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  var angleBetweenTwoPoints = function(x1, y1, x2, y2){
    return Math.atan2(x2 - x1, y2 - y1) * (180 / Math.PI);
  }


  var distance = distanceBetweenTwoPoints(this.sprite.x, this.sprite.y, x, y);
  var angle = angleBetweenTwoPoints(this.sprite.x, this.sprite.y, x, y);
  var speed = distance / duration;
  var toleranceXhigh = x + ((speed * 10) / 2);
  var toleranceXlow = x - ((speed * 10) / 2);
  var toleranceYhigh = y + ((speed * 10) / 2);
  var toleranceYlow = y - ((speed * 10) / 2);

  this.animations[id] = () => {

    this.moveDirection(angle, speed);

    if(this.sprite.x < toleranceXhigh &&
      this.sprite.x > toleranceXlow &&
      this.sprite.y < toleranceYhigh &&
      this.sprite.y > toleranceYlow){
      this.sprite.x = x;
      this.sprite.y = y;
      callback();
      delete this.animations[id];
    }
  }

}

function init(){
  this.animations = {};
}

var AnimateComponent = new Component(init, animate, animateTo);
export default AnimateComponent;
