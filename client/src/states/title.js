import $GAME from 'entities/game.js';
import State from 'states/state.js';
import Orb from 'entities/orb.js';
import FpsDisplay from 'entities/fps.js';

function setup(){
  this.specialOrb = new Orb();
  $GAME.addChild(this.specialOrb);
  this.specialOrb.addChild(new Orb(0, 300));
  $GAME.addChild(new Orb(0, 50));
  $GAME.addChild(new Orb(100, 0));
  $GAME.addChild(new FpsDisplay(5, 5));
  setTimeout(() => {
    $GAME.state = TITLE_STATE;
  }, 3000);
}

function tick(){
  this.specialOrb.move(90, 5);
  $GAME.each("Orb", orb => orb.move(0, 5));
  $GAME.each("FpsDisplay", fps => fps.update());
}

function cleanup(){
  $GAME.eachChild((id, child) => {
    child.destroy();
  });
}


const TITLE_STATE = new State(setup, tick, cleanup);
export default TITLE_STATE;
