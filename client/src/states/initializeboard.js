import $GAME from 'entities/game.js';
import State from 'states/state.js';
import Board from 'entities/board.js';
import Background from 'entities/background.js';
import Orb from 'entities/orb.js';
import FpsDisplay from 'entities/fps.js';
import BOARD_READY from 'states/boardready.js';

function setup(){
  this.background = new Background();

  this.background.setScale(
    $GAME.GAME_WIDTH / this.background.sprite.texture.width,
    $GAME.GAME_HEIGHT / this.background.sprite.texture.height
  );

  $GAME.addChild(this.background);

  this.board = new Board(8, 6);
  this.board.setScale(this.background.scale);
  $GAME.addChild(this.board);

  this.board.sprite.y = ($GAME.GAME_HEIGHT / 2) * this.board.scale.y;
  this.board.sprite.x = ($GAME.GAME_WIDTH * (8/5) * this.board.scale.x);
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
