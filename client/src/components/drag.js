import Component from 'components/component.js';

function init(){
  this.sprite.interactive = true;
  this.sprite.buttonMode = true;
  this.sprite.defaultCursor = 'auto';

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
      this.sprite.x = e.data.global.x;
      this.sprite.y = e.data.global.y;
    } else if(this._drag_held){
      this.releaseHandlers.forEach(handler => handler.call(this, e));
      this._drag_held = false;
    }
  });

  this.sprite.on('mouseup', e => {
    if(this._drag_held){
      this.releaseHandlers.forEach(handler => handler.call(this, e));
      this._drag_held = false;
    }
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

function addMousedownHandler(f){
  this.mousedownHandlers = this.mousedownHandlers || [];
  this.mousedownHandlers.push(f);
}

var DragComponent = new Component(init, addDragHandler, addReleaseHandler, addMousedownHandler);
export default DragComponent;
