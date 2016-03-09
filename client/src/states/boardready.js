import $GAME from 'entities/game.js';
import State from 'states/state.js';
import BOARD_HOLDING from 'states/boardholding.js';

function setup(){
  for(let id in $GAME.Boards){
    this.board = $GAME.Boards[id]
  }

  this.board.each("Orb", orb => {
    orb.sprite.interactive = true
    orb.sprite.on('mousedown', e => {
      $GAME.heldOrb = orb;
      $GAME.heldOrb.sprite.position.set(e.data.global.x, e.data.global.y);
      $GAME.heldOrb.sprite.anchor.set(0.5, 0.5);
      $GAME.state = BOARD_HOLDING;
    })
  });
}

function tick(){
  this.board.each("Orb", orb => orb.animate())
  $GAME.each("FpsDisplay", fps => fps.update());
}

function cleanup(){
  this.board.each("Orb", orb => {
    orb.sprite.interactive = false
    orb.sprite.off('mousedown');
  });
}

const BOARD_READY = new State(setup, tick, cleanup);
export default BOARD_READY;
