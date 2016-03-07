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

  var calcTrajectory = function(x, y, angle){

  }

  var orig = { x: this.sprite.x, y: this.sprite.y };
  var distance = distanceBetweenTwoPoints(this.sprite.x, this.sprite.y, x, y);
  var angle = angleBetweenTwoPoints(this.sprite.x, this.sprite.y, x, y);
  var speed = distance / duration;
  var tolerance = speed * 10;

  this.animations[id] = () => {

    this.moveDirection(angle, speed);

    if(distanceBetweenTwoPoints(this.sprite.x, this.sprite.y, x, y) < tolerance){
      this.sprite.x = x;
      this.sprite.y = y;
      if(this.animations[id]){
        callback();
        delete this.animations[id];
      }
    }
  }

  return id;

}

function removeAllAnimations(){
  this.animations = {};
}

function removeAnimation(id){
  delete this.animations[id];
}

function init(){
  this.animations = {};
}

var AnimateComponent = new Component(init, animate, animateTo, removeAllAnimations, removeAnimation);
export default AnimateComponent;
