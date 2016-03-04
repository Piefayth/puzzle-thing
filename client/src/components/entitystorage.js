import Component from 'components/component.js';

var EntityStorage = function(context){
  var es = new Component(context);
  es.entities = {};
  es.entities.add = add.bind(context);
  return es;
}

function add(entity){
  var entityType = entity.constructor.name + 's';
  this.entities[entityType] = this.entities[entityType] || [];
  this.entities[entityType].push(entity);
  this.stage.addChild(entity.sprite);
}

export default EntityStorage;
