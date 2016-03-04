import $GAME from 'entities/game.js';

// This is just $GAME.entities.(*);
class EntityStorage {
  constructor(){
    this.entities = {};
  }

  add(entity){
    var entityType = entity.constructor.name + 's';
    this.entities[entityType] = this.entities[entityType] || [];
    this.entities[entityType].push(entity);
    $GAME.stage.addChild(entity.sprite);
  }

  all(n){
    if(!n) return this.entities;
    return this.entities[n];
  }
}

export default EntityStorage;
