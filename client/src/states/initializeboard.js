import $GAME from 'entities/game.js';
import State from 'states/state.js';
import Board from 'entities/board.js';
import Background from 'entities/background.js';
import Orb from 'entities/orb.js';
import FpsDisplay from 'entities/fps.js';
import BOARD_READY from 'states/boardready.js';

function setup(){
  this.background = new Background();
  $GAME.addChild(this.background);
  this.background.sprite.width = $GAME.GAME_WIDTH;
  this.background.sprite.height = $GAME.GAME_HEIGHT;

  this.board = new Board(8, 6);
  this.board.sprite.height = 400;
  this.board.sprite.width = 497;
  this.board.sprite.y = 401;
  $GAME.addChild(this.board);

  this.board.setup($GAME);

  $GAME.addChild(new FpsDisplay(5, 5));

  $GAME.state = BOARD_READY;
}

function tick(){
  $GAME.each("FpsDisplay", fps => fps.update());
}

function cleanup(){

}

const INITIALIZE_BOARD = new State(setup, tick, cleanup);
export default INITIALIZE_BOARD;
