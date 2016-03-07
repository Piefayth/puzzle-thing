import Entity from 'entities/entity.js';
import MoveComponent from 'components/move.js';
import AnimateComponent from 'components/animate.js';
import DragComponent from 'components/drag.js';
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
    this.addComponent(DragComponent);
    this.addComponent(AnimateComponent);
    this.addMousedownHandler(this.clickOrb);
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

  checkOrbCollisions(dragEvent){
    // On each drag event
    var board = this.parent.Orbs2D;
    var point = { x: this.sprite.x, y: this.sprite.y };

    for(let i = Math.max(this.x - 1, 0); i < Math.min(this.x + 2, board.length); i++){
      for(let j = Math.max(this.y - 1, 0); j < Math.min(this.y + 2, board[i].length); j++){
        // If we are not already colliding with this orb
        if(this.collidedOrb.x != i || this.collidedOrb.y != j){
          // But we are colliding with it
          if(board[i][j].assertIntersectPoint(point)){
            // End the animation for the previous orb
            if(Object.keys(this.collidedOrb).length > 0) {
              this.collidable = true;
              this.collidedOrb.snapOrb();
            }
            // Update the orb we are colliding with
            this.collidedOrb = board[i][j];
            this.swapWith(board[i][j]);
          }
        }

      }
    }


  }

  swapWith(orb){
    var temp = {};
    // `this` is being held
    // `orb` is being swapped to the position of `this`

    temp.x = this.x;
    temp.y = this.y;

    this.x = orb.x;
    this.y = orb.y;

    orb.x = temp.x;
    orb.y = temp.y;

    this.parent.Orbs2D[orb.x][orb.y] = orb;
    this.parent.Orbs2D[this.x][this.y] = this;

    var home = this.calculateHomePosition(orb.x, orb.y)
    orb.animateTo(home.x, home.y, this.swapTime, () => {
      if(this.collidedOrb.id === orb.id){
        this.collidedOrb = false;
      }
    });

  }

  clickOrb(){
    this.sprite.anchor.set(0.5, 0.5);
    this.addDragHandler(this.checkOrbCollisions);
  }

  snapOrb(){
    this.sprite.anchor.set(0, 0);
    this.removeAllAnimations();
    this.removeDragHandler();
    var home = this.calculateHomePosition(this.x, this.y);
    this.sprite.x = home.x;
    this.sprite.y = home.y;
  }

  calculateHomePosition(x, y){
    var newx = ((this.parent.Orbs2D[x][y].sprite.width + this.parent.Orbs2D[x][y].paddingx) * x + (this.parent.Orbs2D[x][y].offsetx));
    var newy = ((this.parent.Orbs2D[x][y].sprite.height + this.parent.Orbs2D[x][y].paddingy) * y) + ((this.parent.parent.GAME_HEIGHT / 2) + this.parent.Orbs2D[x][y].offsety);
    return {x: newx, y: newy};
  }

}

export default Orb;
