import $GAME from 'entities/game.js';

// $GAME.entities.(*);
class EntityStorage {

  add(entity){
    var entityType = entity.constructor.name + 's';
    this[entityType] = this[entityType] || [];
    this[entityType].push(entity);
    $GAME.stage.addChild(entity.sprite);
  }

}

export default EntityStorage;
