import Component from 'components/component.js';

function move(dx, dy){
  var dt = PIXI.ticker.shared.deltaTime;

  this.sprite.x += dx * dt;
  this.sprite.y += dy * dt;
}

var MoveComponent = new Component(move);
export default MoveComponent;
