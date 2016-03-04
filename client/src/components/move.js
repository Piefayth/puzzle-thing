import Component from 'components/component.js';

var MoveComponent = function(context){
  var mc = new Component(context);
  mc.move = move;
  return mc;
}

function move(dx, dy){
  this.sprite.x += dx;
  this.sprite.y += dy;
}

export default MoveComponent;
