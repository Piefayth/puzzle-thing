import Entity from 'entities/entity.js';
import Orb from 'entities/orb.js';

class Board extends Entity {

  constructor(width, height){
    super();
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources['img/board.png'].texture
    );
    this.sprite.x = 0;
    this.sprite.y = 0;
    this.width = width;
    this.height = height;
  }

}

export default Board;
