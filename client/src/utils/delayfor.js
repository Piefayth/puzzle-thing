function delayfor(ms, fn){

  var counter = function(dt){
    ms -= (dt * 10);
    if(ms < 0){
      fn();
      PIXI.ticker.shared.remove(counter);
    }
  }

  PIXI.ticker.shared.add(counter);
}

export default delayfor;
