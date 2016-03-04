import $GAME from 'entities/game.js';
import MOVE_COMPONENT from 'components/move.js';

class Orb {

  constructor(x, y, type){
    this.type = type || 0;
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources['img/GreenOrb.png'].texture
    );
    this.sprite.x = x || 0;
    this.sprite.y = y || 0;
    this.move = MOVE_COMPONENT(this);
  }

}

export default Orb;
