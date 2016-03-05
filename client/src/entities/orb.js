import Entity from 'entities/entity.js';
import MoveComponent from 'components/move.js';
import DragComponent from 'components/drag.js';

class Orb extends Entity {

  constructor(x, y, type){
    super();
    this.type = type || 0;
    this.types = [
      'img/GreenOrb.png',
      "img/MagentaOrb.png",
      "img/PurpleOrb.png",
      "img/RedOrb.png",
      "img/BlueOrb.png",
      "img/YellowOrb.png"
    ];
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources[this.types[type]].texture
    );
    this.sprite.x = x || 0;
    this.sprite.y = y || 0;
    this.addComponent(MoveComponent);
    this.addComponent(DragComponent);
    this.enableDrag();
  }

}

export default Orb;
