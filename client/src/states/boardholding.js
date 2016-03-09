import $GAME from 'entities/game.js';
import State from 'states/state.js';
import ANALYZE_BOARD from 'states/boardanalyzing.js';
import delayfor from 'utils/delayfor.js'

function setup(){
  for(let id in $GAME.Boards){
    this.board = $GAME.Boards[id]
  }

  $GAME.collidedOrb = {};

  this.board.sprite.on('mouseup', e => {
    turnEnd();
  });

  this.board.sprite.on('mousemove', e => {
    if(this.board.sprite.containsPoint(e.data.global)){
      if($GAME.heldOrb.lastAnimation){
        $GAME.heldOrb.removeAnimation($GAME.heldOrb.lastAnimation);
      }
      $GAME.heldOrb.lastAnimation = $GAME.heldOrb.animateTo(e.data.global.x, e.data.global.y, 10);
    } else {
      turnEnd();
    }
  });

  function turnEnd(){
    var pos = $GAME.heldOrb.ownHome();
    $GAME.heldOrb.sprite.position.set(pos.x, pos.y);
    $GAME.heldOrb.sprite.anchor.set(0.0, 0.0);
    $GAME.heldOrb.removeAllAnimations();
    $GAME.heldOrb = false;
    $GAME.state = ANALYZE_BOARD;
  }

}

function tick(){
  // Iterate over every orb within one space of our held orb.
  for(let i = Math.max($GAME.heldOrb.x - 1, 0); i < Math.min($GAME.heldOrb.x + 2, this.board.width); i++){
    for(let j = Math.max($GAME.heldOrb.y - 1, 0); j < Math.min($GAME.heldOrb.y + 2, this.board.height); j++){
      let orb = this.board.Orbs2D[i][j];
      orb.animate();
      // If the iterated orb intersects the center of the held orb
      if($GAME.heldOrb && orb.assertIntersectPoint($GAME.heldOrb.sprite.position)){
        // And we are not already colliding with that orb
        if($GAME.collidedOrb.id && $GAME.collidedOrb.id != orb.id){
          // End the previous Orb's animation immediately
          var point = $GAME.collidedOrb.ownHome();
          $GAME.collidedOrb.removeAllAnimations();
          $GAME.collidedOrb.sprite.position.set(point.x, point.y);
          $GAME.collidedOrb = orb;
          swapOrbs.call(this, $GAME.heldOrb, $GAME.collidedOrb);
        } else if(!$GAME.collidedOrb.id) {
          // If there was no previous collision
          $GAME.collidedOrb = orb;
          swapOrbs.call(this, $GAME.heldOrb, $GAME.collidedOrb);
        }
      }
    }
  }
  this.board.each("Orb", orb => {
    orb.animate();
    if($GAME.heldOrb && orb.assertIntersectPoint($GAME.heldOrb.sprite.position)){
      if($GAME.collidedOrb.id && $GAME.collidedOrb.id != orb.id){
        var point = $GAME.collidedOrb.ownHome();
        $GAME.collidedOrb.removeAllAnimations();
        $GAME.collidedOrb.sprite.position.set(point.x, point.y);
        $GAME.collidedOrb = orb;
        swapOrbs.call(this, $GAME.heldOrb, $GAME.collidedOrb);
      } else if(!$GAME.collidedOrb.id) {
        $GAME.collidedOrb = orb;
        swapOrbs.call(this, $GAME.heldOrb, $GAME.collidedOrb);
      }

    }
  })
  $GAME.each("FpsDisplay", fps => fps.update());
}

function cleanup(){
  this.board.sprite.off('mousemove');
  this.board.sprite.off('mouseup');
}

function swapOrbs(orb1, orb2){
  var temp = {};
  // Swap the X and Y grid positions on the orbs themselves, then
  // swap them in the board.

  temp.x = orb1.x;
  temp.y = orb1.y;

  orb1.x = orb2.x;
  orb1.y = orb2.y;

  orb2.x = temp.x;
  orb2.y = temp.y;

  this.board.Orbs2D[orb2.x][orb2.y] = orb2;
  this.board.Orbs2D[orb1.x][orb1.y] = orb1;

  var point = orb2.ownHome();
  orb2.animateTo(point.x, point.y, orb2.swapTime, () => {
    $GAME.collidedOrb = false;
  });
}

const BOARD_HOLDING = new State(setup, tick, cleanup);
export default BOARD_HOLDING;
