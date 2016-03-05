import Entity from 'entities/entity.js';

class Background extends Entity {

  constructor(){
    super();
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources['img/background.png'].texture
    );
  }

}

export default Background;
