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
    this.x;
    this.y;
    this.sprite.x = x || 0;
    this.sprite.y = y || 0;
    this.addComponent(MoveComponent);
    this.addComponent(DragComponent);
    this.addDragHandler(this.checkOrbCollisions);
    this.addReleaseHandler(this.snapOrb);
    this.addMousedownHandler(this.saveStartPosition);
  }

  assertIntersectPoint(point){
    /* For a given point (Xp, Yp), circle center (Xc, Yc), and circle radius r
    The point is inside the circle when (Xp - Xc)^2 + (Yp - Yc)^2 < r^2 */

    var Xp = point.x;
    var Yp = point.y;
    var Xc = this.sprite.x + ((this.sprite.width) / 2);
    var Yc = this.sprite.y + ((this.sprite.height) / 2);

    var D = Math.pow(Xp - Xc, 2) + Math.pow(Yp - Yc, 2);

    // texture should be square so width is fine
    var r = Math.pow(this.sprite.width/2, 2);

    return D < r;
  }

  checkOrbCollisions(e){
    var point = e.data.global;
    for(let i = 0; i < this.parent.Orbs2D.length; i++){
      for(let j = 0; j < this.parent.Orbs2D[i].length; j++){
        if(!this.parent.Orbs2D[i][j]._drag_held &&
          this.parent.Orbs2D[i][j].assertIntersectPoint(point)){
          this.swapWith(this.parent.Orbs2D[i][j]);
        }
      }
    }
  }

  swapWith(orb){
    var temp = {};
    temp.x = orb.x;
    temp.y = orb.y;

    orb.x = this.x;
    orb.y = this.y;

    this.x = temp.x;
    this.y = temp.y;

    temp = new PIXI.Point(orb.sprite.x, orb.sprite.y);

    orb.sprite.x = this.old.x;
    orb.sprite.y = this.old.y;

    this.old.x = temp.x;
    this.old.y = temp.y;
  }

  snapOrb(){
    this.sprite.anchor.set(0, 0);
    this.sprite.x = this.old.x;
    this.sprite.y = this.old.y;
  }

  saveStartPosition(){
    this.old = new PIXI.Point(this.sprite.x, this.sprite.y);
    this.sprite.anchor.set(0.5, 0.5);
  }

}

export default Orb;
