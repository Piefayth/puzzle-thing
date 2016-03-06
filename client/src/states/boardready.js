import $GAME from 'entities/game.js';
import State from 'states/state.js';

function setup(){
  for(let id in $GAME.Boards){
    this.board = $GAME.Boards[id]
  }
}

function tick(){
  $GAME.each("FpsDisplay", fps => fps.update());
}

function cleanup(){

}

const BOARD_READY = new State(setup, tick, cleanup);
export default BOARD_READY;
