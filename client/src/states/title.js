import $GAME from 'entities/game.js';
import State from 'states/state.js';
import Orb from 'entities/orb.js';

function setup(){
  $GAME.addChild(new Orb());
  $GAME.addChild(new Orb(0, 50));
  $GAME.addChild(new Orb(0, 250));
  $GAME.Orbs[0].addChild(new Orb(15, 15));
}

function tick(dt){
  $GAME.Orbs[0].move(1, 0);
  $GAME.Orbs[1].move(1, 1);
  $GAME.Orbs[2].move(0, 1);
  $GAME.Orbs[0].Orbs.forEach(orb => {
    orb.move(3, 0);
  })
}

function cleanup(){
  console.log('cleaning up title state');
}

const TITLE_STATE = new State(setup, tick, cleanup);
export default TITLE_STATE;
