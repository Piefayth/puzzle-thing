class Component {

  constructor(...args){
    this.methodsAndObjects = args;
  }

  // A component file can export either a function or an object.
  // Note that 'this' here is the component itself.
  generate(context){
    this.methodsAndObjects.map((item, index) => {
      if(!index) {
        // init function
        item.call(context);
        return;
      }
      if(typeof item === 'function'){
        this[item.name] = item.bind(context);
      } else {
        for(var key in item){
          this[key] = item[key];
        }
      }
    });

    return this;
  }

}

export default Component;
