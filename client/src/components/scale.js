import Component from 'components/component.js';

function setScale(x, y){
  if(!y) y = x;
  this.sprite.scale.set(x, y);
  this.scale = this.sprite.scale;
}

function init(){
  // Whenever a child is added to this Entity,
  // set its scale to that of the parent
  this.addChildHandlers.push(child => {
    if(this.parent){
      child.scale = child.parent.scale;
    }
  })
}

var ScaleComponent = new Component(init, setScale);
export default ScaleComponent;
