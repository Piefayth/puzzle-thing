import Entity from 'entities/entity.js';
import MoveComponent from 'components/move.js';
import AnimateComponent from 'components/animate.js';
import delayfor from 'utils/delayfor.js'

class Orb extends Entity {

  constructor(x, y, sx, sy){
    super();
    this.type = Math.floor(Math.random() * 6);
    this.swapTime = 60;
    this.types = [
      'img/GreenOrb.png',
      "img/MagentaOrb.png",
      "img/PurpleOrb.png",
      "img/RedOrb.png",
      "img/BlueOrb.png",
      "img/YellowOrb.png"
    ];
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources[this.types[this.type]].texture
    );
    this.x = x;
    this.y = y;
    sx = sx || 0;
    sy = sy || 0;
    this.sprite.scale.set(0.225, 0.225);
    this.sprite.position.set(sx, sy);
    this.offsety = 35;
    this.offsetx = 8;
    this.paddingx = 2;
    this.paddingy = 2;
    this.collidedOrb = {};
    this.addComponent(MoveComponent);
    this.addComponent(AnimateComponent);
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

  calculateHomePosition(x, y){
    var newx = ((this.parent.Orbs2D[x][y].sprite.width + this.parent.Orbs2D[x][y].paddingx) * x + (this.parent.Orbs2D[x][y].offsetx));
    var newy = ((this.parent.Orbs2D[x][y].sprite.height + this.parent.Orbs2D[x][y].paddingy) * y) + ((this.parent.parent.GAME_HEIGHT / 2) + this.parent.Orbs2D[x][y].offsety);
    return new PIXI.Point(newx, newy);
  }

  ownHome(){
    var newx = ((this.sprite.width + this.paddingx) * this.x + (this.offsetx));
    var newy = ((this.sprite.height + this.paddingy) * this.y) + ((this.parent.parent.GAME_HEIGHT / 2) + this.offsety);
    return new PIXI.Point(newx, newy);
  }

  snapOrb(){
    var point = this.ownHome();
    this.sprite.position.set(point.x, point.y);
  }

}

export default Orb;
