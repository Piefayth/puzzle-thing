import Component from 'components/component.js';

function enableDrag(){
  this.sprite.interactive = true;

  this.sprite.on('mousedown', e => {
    this._drag_held = true;
    this.sprite.anchor.set(0.5, 0.5);

    this.sprite.x = e.data.global.x;
    this.sprite.y = e.data.global.y;
  });

  this.sprite.on('mousemove', e => {
    if(this._drag_held){
      this.sprite.x = e.data.global.x;
      this.sprite.y = e.data.global.y;
    }
  });

  this.sprite.on('mouseup', e => {
    this._drag_held = false;
  });
}

function init(){

}

var DragComponent = new Component(init, enableDrag);
export default DragComponent;
