import $GAME from 'entities/game.js';
import State from 'states/state.js';

function setup(){
  for(let id in $GAME.Boards){
    this.board = $GAME.Boards[id]
  }
  this.board.each("Orb", orb => orb.sprite.interactive = true);
}

function tick(){
  this.board.each("Orb", orb => orb.animate())
  $GAME.each("FpsDisplay", fps => fps.update());
}

function cleanup(){

}

const BOARD_READY = new State(setup, tick, cleanup);
export default BOARD_READY;
