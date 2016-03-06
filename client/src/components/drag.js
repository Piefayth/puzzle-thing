import Component from 'components/component.js';

function init(){
  this.sprite.interactive = true;

  this.sprite.on('mousedown', e => {
    this._drag_held = true;
    this.sprite.anchor.set(0.5, 0.5);
    this._drag_old = new PIXI.Point(this.sprite.x, this.sprite.y);
    this.sprite.x = e.data.global.x;
    this.sprite.y = e.data.global.y;
  });

  this.sprite.on('mousemove', e => {
    if(this._drag_held){
      this.sprite.x = e.data.global.x;
      this.sprite.y = e.data.global.y;
      this.dragHandlers.forEach(handler => handler.call(this, e));
    }
  });

  this.sprite.on('mouseup', e => {
    this.releaseHandlers.forEach(handler => handler.call(this, e));
    this._drag_held = false;
  });
}

function addDragHandler(f){
  this.dragHandlers = this.dragHandlers || [];
  this.dragHandlers.push(f);
}

function addReleaseHandler(f){
  this.releaseHandlers = this.releaseHandlers || [];
  this.releaseHandlers.push(f);
}

var DragComponent = new Component(init, addDragHandler, addReleaseHandler);
export default DragComponent;
