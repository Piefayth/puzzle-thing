import UUID from 'utils/uuid.js';

class Entity {

  constructor(){
    this.children = {};
    this.id = UUID();
  }

  addComponent(component){
    Object.assign(this, component.generate(this));
  }

  addChild(child){
    this.children[child.id] = child;
    child.parent = this;

    // But also ensure easy access to children by name
    // ex. $GAME.Orbs[0].Orbs
    var entityType = child.constructor.name + 's';
    this[entityType] = this[entityType] || {};
    this[entityType][child.id] = child;

    // Add the child sprite to the parent sprite (if exists) or the stage.
    if (this.sprite && child.sprite) {
      this.sprite.addChild(child.sprite);
    } else if (this.stage && child.sprite){
      this.stage.addChild(child.sprite);
    }
  }

  destroy(){
    for(var id in this.children){
      this.removeChild(id);
    }

    if(this.parent){
      this.parent.removeChild(this.id);
    }
  }

  // This needs to remove EVERY reference to the child.
  removeChild(id){
    // Let you pass in the literal entity instead
    if(typeof id !== "string"){
      id = id.id
    }

    if(!this.children[id]){
      throw new Error('attempted to remove a child not parented to "this"');
    }

    var child = this.children[id];
    if(child && child.sprite){
      if(this.stage){   // Top level parent
        this.stage.removeChild(child.sprite);
        delete this[child.constructor.name + 's'][id];  // ex. $GAME.Orbs[id]
      } else {
        this.sprite.removeChild(child);
      }
      child.sprite.destroy();
    }
    delete this.children[id];
  }

}

export default Entity;
