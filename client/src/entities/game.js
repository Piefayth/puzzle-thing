import EntityStorage from 'util/entitystorage.js';

class Game {

  constructor(){
    this.entityStorage = new EntityStorage();
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

  // alias for entityStorage
  get entities(){
    return this.entityStorage;
  }

};

const $GAME = new Game();
export default $GAME;
