import Component from 'components/component.js';

function setScale(val){
  this.sprite.scale.set(val, val);
}

var props = {
  scale: 1
};

var ScaleComponent = new Component(setScale, props);
export default ScaleComponent;
