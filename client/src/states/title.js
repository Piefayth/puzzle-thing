import $GAME from 'entities/game.js';
import State from 'states/state.js';
import Orb from 'entities/orb.js';
import FpsDisplay from 'entities/fps.js';

function setup(){
  var specialOrb = new Orb();
  $GAME.addChild(specialOrb);
  specialOrb.addChild(new Orb(0, 300));
  $GAME.addChild(new Orb(0, 50));
  $GAME.addChild(new Orb(100, 0));
  $GAME.addChild(new FpsDisplay(5, 5));
  setTimeout(() => {
    $GAME.destroy($GAME.Orbs[Object.keys($GAME.Orbs)[0]]);
  }, 1000);
}

function tick(){
  for(var orb in $GAME.Orbs){
    $GAME.Orbs[orb].move(0, 5);
  }

  for(var fps in $GAME.FpsDisplays){
    $GAME.FpsDisplays[fps].update();
  }
}

function cleanup(){
  console.log('cleaning up title state');
}


const TITLE_STATE = new State(setup, tick, cleanup);
export default TITLE_STATE;
