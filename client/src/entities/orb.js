import Entity from 'entities/entity.js';
import MoveComponent from 'components/move.js';
import AnimateComponent from 'components/animate.js';
import DragComponent from 'components/drag.js';
import delayfor from 'utils/delayfor.js'

class Orb extends Entity {

  constructor(x, y, sx, sy){
    super();
    this.type = Math.floor(Math.random() * 6);
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
    this.addComponent(MoveComponent);
    this.addComponent(DragComponent);
    this.addComponent(AnimateComponent);
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
            if(!this.parent.Orbs2D[i][j].swapping){

              this.parent.Orbs2D[i][j].swapping = true;
              this.queue(this.swapWith, this.parent.Orbs2D[i][j]);
            }
          }
        }
      }

  }

  queue(fn, ...args){
    this.q = this.q || [];

    args.push(() => {
      this.q.shift();
      if(this.q.length){
        this.q[0]();
      }
    })
    fn.apply(this, args)
  }

  swapWith(orb, cb){
    var temp = {};
    cb = cb || function(){};

    temp.x = orb.x;
    temp.y = orb.y;

    orb.x = this.x;
    orb.y = this.y;

    this.x = temp.x;
    this.y = temp.y;

    temp = new PIXI.Point(orb.sprite.x, orb.sprite.y);

    //orb.sprite.x = this.old.x;
    //orb.sprite.y = this.old.y;

    orb.animateTo(this.old.x, this.old.y, 50, () => {
      orb.swapping = false;
      cb();
    });

    this.old.x = temp.x;
    this.old.y = temp.y;

    temp = this.parent.Orbs2D[orb.x][orb.y];
    this.parent.Orbs2D[orb.x][orb.y] = this.parent.Orbs2D[this.x][this.y];
    this.parent.Orbs2D[this.x][this.y] = temp;


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
