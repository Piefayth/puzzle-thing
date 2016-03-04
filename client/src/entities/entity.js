class Entity {

  addComponent(component){
    Object.assign(this, component(this));
  }

}

export default Entity;
