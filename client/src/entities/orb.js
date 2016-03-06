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

    temp.x = orb.sprite.x;
    temp.y = orb.sprite.y;

    orb.sprite.x = this._drag_old.x;
    orb.sprite.y = this._drag_old.y;

    this._drag_old.x = temp.x;
    this._drag_old.y = temp.y;
  }

  snapOrb(){
    this.sprite.x = this._drag_old.x;
    this.sprite.y = this._drag_old.y;
    this.sprite.anchor.set(0, 0);
  }

}

export default Orb;
