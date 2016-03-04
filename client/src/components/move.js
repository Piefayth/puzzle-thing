import Component from 'components/component.js';

function move(dx, dy){
  this.sprite.x += dx;
  this.sprite.y += dy;
}

var MoveComponent = new Component(move);
export default MoveComponent;
