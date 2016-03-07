import Component from 'components/component.js';
import UUID from 'utils/uuid.js';

function animate(){
  for(var key in this.animations){
    this.animations[key].call(this);
  }
}

function animateTo(x, y, duration, callback){
  console.log('animate');
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

  this.animations[id] = () =>{
    var speed = distance / duration;
    this.moveDirection(angle, speed);

    if(Math.abs(this.sprite.x - x) < 0.5 && Math.abs(this.sprite.y - y) < 0.5){
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
