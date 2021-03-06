import Component from 'components/component.js';

function moveDirection(angle, distance){
  var dt = PIXI.ticker.shared.deltaTime * 10;
  angle *= (Math.PI / 180);

  this.sprite.x += Math.sin(angle) * distance * dt;
  this.sprite.y += Math.cos(angle) * distance * dt;
}

function moveXy(x, y){
  var dt = PIXI.ticker.shared.deltaTime * 10;
  this.sprite.position.set(
    this.sprite.x + (x / dt),
    this.sprite.y + (y / dt)
  );
}

function init(){

}

var MoveComponent = new Component(init, moveDirection, moveXy);
export default MoveComponent;
