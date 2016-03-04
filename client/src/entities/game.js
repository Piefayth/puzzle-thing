import Entity from 'entities/entity.js';

class Game extends Entity {

  constructor(){
    super();
    this.toBeDestroyed = [];
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

  // override entity's implementation. we will never destroy a Game
  destroy(entity){
    this.toBeDestroyed.push(entity);
  }

};

const $GAME = new Game();
export default $GAME;
