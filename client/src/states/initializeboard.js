import $GAME from 'entities/game.js';
import State from 'states/state.js';
import Board from 'entities/board.js';
import Orb from 'entities/orb.js';
import FpsDisplay from 'entities/fps.js';

function setup(){
  this.board = new Board(8, 6);

  this.board.setScale(
    $GAME.GAME_WIDTH / this.board.sprite.texture.width,
    $GAME.GAME_HEIGHT / this.board.sprite.texture.height
  );

  // order matters
  $GAME.addChild(this.board);
  $GAME.addChild(new FpsDisplay(5, 5));

  for(let i = 0; i < this.board.width; i++){
    for(let j = 0; j < this.board.height; j++){
      let tempOrb = new Orb(0, 0);
      this.board.addChild(tempOrb);
    }
  }

}

function tick(){
  $GAME.each("FpsDisplay", fps => fps.update());
}

function cleanup(){

}

const INITIALIZE_BOARD = new State(setup, tick, cleanup);
export default INITIALIZE_BOARD;
