import Entity from 'entities/entity.js';
import MoveComponent from 'components/move.js';
import DragComponent from 'components/drag.js';

class Orb extends Entity {

  constructor(x, y, type){
    super();
    this.type = type || 0;
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources['img/GreenOrb.png'].texture
    );
    this.sprite.x = x || 0;
    this.sprite.y = y || 0;
    this.addComponent(MoveComponent);
    this.addComponent(DragComponent);
    this.enableDrag();
  }

}

export default Orb;
