import $GAME from 'entities/game.js';
import State from 'states/state.js';
import Orb from 'entities/orb.js';
import FpsDisplay from 'entities/fps.js';

function setup(){
  $GAME.addChild(new FpsDisplay(5, 5));
  for(let i = 0; i < 12; i++){
    var orb = new Orb(0, 15 + (i * 100));
    orb.setScale(0.25);
    $GAME.addChild(orb);
  }

  setTimeout(() => {
    $GAME.state = TITLE_STATE;
  }, 3000);

}

function tick(){
  //$GAME.each("Orb", orb => orb.moveDirection(90, 5));
  $GAME.each("FpsDisplay", fps => fps.update());
}

function cleanup(){
  $GAME.eachChild((id, child) => {
    child.destroy();
  });
}


const TITLE_STATE = new State(setup, tick, cleanup);
export default TITLE_STATE;
