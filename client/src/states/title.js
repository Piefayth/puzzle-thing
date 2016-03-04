import $GAME from 'entities/game.js';
import Orb from 'entities/orb.js';

const TITLE_STATE = {

  setup: function(){
    $GAME.entities.add(new Orb());
    $GAME.entities.add(new Orb(0, 50));
    $GAME.entities.add(new Orb(0, 250));
  },

  tick: function(){
    $GAME.entities.Orbs[0].move(1, 0);
    $GAME.entities.Orbs[1].move(1, 1);
    $GAME.entities.Orbs[2].move(0, 1);
  },

  cleanup: function(){
    console.log('cleaning up title state');
  }

}

export default TITLE_STATE;
