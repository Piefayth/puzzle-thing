import Entity from 'entities/entity.js';
import Orb from 'entities/orb.js';
import MoveComponent from 'components/move.js';

class Board extends Entity {

  constructor(width, height){
    super();
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources['img/board.png'].texture
    );
    this.width = width;
    this.height = height;
    this.Orbs2D = [];
  }

  setup($GAME){
    for(let i = 0; i < this.width; i++){
      let row = [];
      for(let j = 0; j < this.height; j++){
        let tempOrb = new Orb(0, 0, Math.floor(Math.random() * 6));
        this.addChild(tempOrb);
        tempOrb.setScale(0.225);

        let scaledHeight = tempOrb.sprite.texture.height * tempOrb.scale.y;
        let scaledWidth = tempOrb.sprite.texture.width * tempOrb.scale.x;

        tempOrb.offsety = 35; //padding
        tempOrb.offsetx = 5;
        tempOrb.paddingx = 2;
        tempOrb.paddingy = 2;
        tempOrb.sprite.x = ((scaledWidth + tempOrb.paddingx) * i + (tempOrb.offsetx));
        tempOrb.sprite.y = ((scaledHeight + tempOrb.paddingy) * j) + (($GAME.GAME_HEIGHT / 2) + tempOrb.offsety);

        tempOrb.x = i;
        tempOrb.y = j;
        row.push(tempOrb);
      }
      this.Orbs2D.push(row);
    }
  }


}

export default Board;
