import Component from 'components/component.js';

function setScale(x, y){
  if(!y) y = x;
  this.sprite.scale.set(x, y);

  // when a sprite is rescaled it needs to be relocated to stay in the same relative position
  this.sprite.y = this.sprite.y / this.sprite.scale.y;
  this.sprite.x = this.sprite.x / this.sprite.scale.x;

  // store it at the entity level because the sprite only has relative scale (i.e. "1")
  this.scale = this.sprite.scale;
}

function init(){

  // Whenever a child is added to this Entity,
  // set its scale to that of the parent
  this.addChildHandlers.push(child => {
    if(child.parent.parent){
      let scale = new PIXI.Point(child.parent.scale);
      child.scale = scale;
      child.sprite.scale = scale;
    }
  })

}

var ScaleComponent = new Component(init, setScale);
export default ScaleComponent;
