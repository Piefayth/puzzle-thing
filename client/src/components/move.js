import Component from 'components/component.js';

function move(angle, distance){
  var dt = PIXI.ticker.shared.deltaTime;
  angle *= (Math.PI / 180);

  this.sprite.x += Math.sin(angle) * distance * dt;
  this.sprite.y += Math.cos(angle) * distance * dt;
}

var MoveComponent = new Component(move);
export default MoveComponent;
