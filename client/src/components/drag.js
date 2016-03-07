import Component from 'components/component.js';

function init(){
  this.sprite.interactive = true;
  this.dragHandlers = [];
  this.releaseHandlers = [];
  this.mousedownHandlers = [];
  this.lastAnimationId = null;

  this.sprite.on('mousedown', e => {
    if(!this._drag_held){
      this.mousedownHandlers.forEach(handler => handler.call(this, e));
      this._drag_held = true;
      this.sprite.x = e.data.global.x;
      this.sprite.y = e.data.global.y;
    }
  });

  this.sprite.on('mousemove', e => {
    // if we are dragging something and our current position is still inside the parent
    if(this._drag_held && this.parent.sprite.containsPoint(e.data.global)){
      this.dragHandlers.forEach(handler => handler.call(this, e));
      this.removeAnimation(this.lastAnimationId);
      this.lastAnimationId = this.animateTo(e.data.global.x, e.data.global.y, 20);
    } else if(this._drag_held) {
      this.releaseHandlers.forEach(handler => handler.call(this, e));
      this._drag_held = false;
    }
  });

  this.sprite.on('mouseup', e => {
    if(this._drag_held){
      this.removeAllAnimations();
      this.releaseHandlers.forEach(handler => handler.call(this, e));
      this._drag_held = false;
    }
  });
}

function addDragHandler(f){
  this.dragHandlers.push(f);
}

function addReleaseHandler(f){
  this.releaseHandlers.push(f);
}

function addMousedownHandler(f){
  this.mousedownHandlers.push(f);
}

function removeDragHandler(){
  this.dragHandlers = [];
}

var DragComponent = new Component(init, addDragHandler, addReleaseHandler, addMousedownHandler, removeDragHandler);
export default DragComponent;
