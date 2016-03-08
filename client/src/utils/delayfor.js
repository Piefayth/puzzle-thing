var delayfor = {};
delayfor = function(ms){

  var counter;
  var promise = new Promise(delayedAction);
  function delayedAction(resolve, reject){
    counter = function(dt){
      ms -= (dt * 10);
      if(ms < 0){
        PIXI.ticker.shared.remove(counter);
        resolve();
      }
    }
  }

  PIXI.ticker.shared.add(counter);
  return promise;
}

export default delayfor;
