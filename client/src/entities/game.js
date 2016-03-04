import Entity from 'entities/entity.js';
import EntityStorage from 'components/entitystorage.js';

class Game extends Entity {

  constructor(){
    super();
    this.addComponent(EntityStorage);
  }

  // convenience setter for state cleanups
  set state(state){
    if(this._state) {
      this._state.cleanup();
    }
    state.setup();
    this._state = state;
  }

  // have to alias state so we can set it in the setter
  get state(){
    return this._state;
  }

};

const $GAME = new Game();
export default $GAME;
