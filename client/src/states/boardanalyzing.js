import $GAME from 'entities/game.js';
import State from 'states/state.js';
import delayfor from 'utils/delayfor.js';
import BOARD_UPDATING from 'states/boardupdating.js';
import BOARD_READY from 'states/boardready.js';

function setup(){
  for(let id in $GAME.Boards){
    // TODO: Multiplayer support
    this.board = $GAME.Boards[id]
  }
  this.board.matches = this.board.analyzeBoard();

  delayfor(50)
  .then(() => {
    $GAME.state = this.board.matches ? BOARD_UPDATING : BOARD_READY;
  });

}

function tick(){
  this.board.each("Orb", orb => orb.animate())
  $GAME.each("FpsDisplay", fps => fps.update());
}

function cleanup(){

}

const BOARD_ANALYZING = new State(setup, tick, cleanup);
export default BOARD_ANALYZING;
