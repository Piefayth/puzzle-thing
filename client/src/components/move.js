import Component from 'components/component.js';

function moveDirection(angle, distance){
  var dt = PIXI.ticker.shared.deltaTime;
  angle *= (Math.PI / 180);

  this.sprite.x += Math.sin(angle) * distance * dt;
  this.sprite.y += Math.cos(angle) * distance * dt;
}

function moveXy(x, y){
  var dt = PIXI.ticker.shared.deltaTime;

  this.sprite.position.set(
    this.sprite.x + (x * dt),
    this.sprite.y + (y * dt)
  );
}

var MoveComponent = new Component(moveDirection, moveXy);
export default MoveComponent;
