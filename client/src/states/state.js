class State {

  constructor(...args){
    args.map(method => {
      this[method.name] = method;
    });
  }

  setup(){

  }

  tick(){

  }

  cleanup(){

  }
  
}

export default State;
