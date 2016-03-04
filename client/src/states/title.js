import $GAME from 'entities/game.js';
import State from 'states/state.js';
import Orb from 'entities/orb.js';
import FpsDisplay from 'entities/fps.js';

function setup(){
  $GAME.addChild(new Orb());
  $GAME.addChild(new Orb());
  $GAME.addChild(new Orb());
  $GAME.addChild(new FpsDisplay(5, 5));
}

function tick(){
  $GAME.Orbs[0].move(0, 5);
  $GAME.Orbs[1].move(90, 5);
  $GAME.Orbs[2].move(45, 5);
  $GAME.FpsDisplays.map(fps => fps.update());
}

function cleanup(){
  console.log('cleaning up title state');
}


const TITLE_STATE = new State(setup, tick, cleanup);
export default TITLE_STATE;
