import Entity from 'entities/entity.js';

class FpsDisplay extends Entity {
  constructor(x, y){
    super();
    this.sprite = new PIXI.Text('FPS:', {
      font : 'bold 12px Verdana, Geneva, Sans-Serif',
      fill : 0xff1010,
      align : 'left'
    });
    this.sprite.x = x;
    this.sprite.y = y;
  }

  update(){
    this.sprite.text = "FPS: " + Math.floor(PIXI.ticker.shared.FPS);
  }
}

export default FpsDisplay;
