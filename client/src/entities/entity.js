import UUID from 'utils/uuid.js';

class Entity {

  constructor(){
    this.children = {};
    this.addChildHandlers = [];
    this.id = UUID();
  }

  addComponent(component){
    Object.assign(this, component.generate(this));
  }

  addChild(child){
    this.children[child.id] = child;
    child.parent = this;
    if(this.stage){
      child.stage = this.stage;
    }

    // Ensure easy access to children by name
    // ex. $GAME.Orbs
    var entityType = child.constructor.name + 's';
    this[entityType] = this[entityType] || {};
    this[entityType][child.id] = child;

    if (this.stage && child.sprite){
      this.stage.addChild(child.sprite);
    }

    this.addChildHandlers.forEach(handler => handler(child));
  }

  // Entity.each("Orb", orb => orb.move());
  each(type, f){
    type = type + 's';
    for(var id in this[type]){
      f(this[type][id], id);
    }
  }

  eachChild(f){
    for(var id in this.children){
      f(id, this.children[id]);
    }
  }

  destroy(){
    this.eachChild(this.removeChild);

    if(this.parent){
      this.parent.removeChild(this.id);
    }
  }

  // This needs to remove EVERY reference to the child.
  removeChild(id,  child){
    // Let you pass in the literal entity instead
    if(typeof id !== "string"){
      id = id.id
    }

    if(!this.children[id]){
      throw new Error('attempted to remove a child not parented to "this"');
    }

    var child = this.children[id];
    if(child && child.sprite){
      this.stage.removeChild(child.sprite);
      child.sprite.destroy();
    }

    delete this[child.constructor.name + 's'][id];  // ex. $GAME.Orbs[id]
    delete this.children[id];
  }

  tick(){

  }

}

export default Entity;
