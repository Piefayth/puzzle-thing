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
    this.Orbs2D = [];
  }

  setup($GAME){
    for(let i = 0; i < this.width; i++){
      let row = [];
      for(let j = 0; j < this.height; j++){
        let tempOrb = new Orb(0, 0, Math.floor(Math.random() * 6));
        this.addChild(tempOrb);
        tempOrb.sprite.scale.set(0.225, 0.225);

        tempOrb.offsety = 35;
        tempOrb.offsetx = 8;
        tempOrb.paddingx = 2;
        tempOrb.paddingy = 2;
        tempOrb.sprite.x = ((tempOrb.sprite.width + tempOrb.paddingx) * i + (tempOrb.offsetx));
        tempOrb.sprite.y = ((tempOrb.sprite.height + tempOrb.paddingy) * j) + (($GAME.GAME_HEIGHT / 2) + tempOrb.offsety);

        tempOrb.x = i;
        tempOrb.y = j;
        row.push(tempOrb);
      }
      this.Orbs2D.push(row);
    }
  }


}

export default Board;
