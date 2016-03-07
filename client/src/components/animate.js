import Component from 'components/component.js';
import UUID from 'utils/uuid.js';

function animate(){
  for(var key in this.animations){
    this.animations[key].call(this);
  }
}

function animateTo(x, y, duration){
  var id = UUID();

  var distanceBetweenTwoPoints = function(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  var angleBetweenTwoPoints = function(x1, y1, x2, y2){
    return Math.atan2(x2 - x1, y2 - y1) * (180 / Math.PI);
  }

  var animateFunction = function(){
    var dt = PIXI.ticker.shared.deltaTime;
    // the distance between this.sprite.x, this.sprite.y and x, y
    // we need to move distance / (duration * dt)
    var angle = angleBetweenTwoPoints(this.sprite.x, this.sprite.y, x, y);
    var distance = distanceBetweenTwoPoints(this.sprite.x, this.sprite.y, x, y);
    this.moveDirection(angle, distance/2);

    if(Math.abs(this.sprite.x - x) < 0.1 && Math.abs(this.sprite.y - y) < 0.1){
      delete this.animations[id];
    }
  }

  this.animations[id] = animateFunction;

}

function init(){
  this.animations = {};
}

var AnimateComponent = new Component(init, animate, animateTo);
export default AnimateComponent;
