class Entity {

  constructor(){
    this.children = [];
  }

  addComponent(component){
    Object.assign(this, component.generate(this));
  }

  addChild(child){
    // Maintain an array of all children
    this.children.push(child);
    child.parent = this;

    // But also ensure easy access to children by name
    // ex. $GAME.Orbs[0].Orbs
    var entityType = child.constructor.name + 's';
    this[entityType] = this[entityType] || [];
    this[entityType].push(child);

    // Add the child sprite to the parent sprite (if exists) or the stage.
    if (this.sprite && child.sprite) {
      this.sprite.addChild(child.sprite);
    } else if (this.stage && child.sprite){
      this.stage.addChild(child.sprite);
    }
  }

}

export default Entity;
