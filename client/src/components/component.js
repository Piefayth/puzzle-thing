class Component {

  constructor(...args){
    this.methods = args;
  }

  generate(context){
    this.methods.map(method => {
      this[method.name] = method.bind(context);
    });
    return this;
  }

}

export default Component;
