import EntityStorage from 'util/entitystorage.js';

class Game {

  constructor(){
    this.entityStorage = new EntityStorage();
  }

  set state(state){
    if(this._state) {
      this._state.cleanup();
    }
    state.setup();
    this._state = state;
  }

  get state(){
    return this._state;
  }

  get entities(){
    return this.entityStorage;
  }

};

const $GAME = new Game();
export default $GAME;
