import $GAME from 'entities/game.js';
import State from 'states/state.js';
import BOARD_READY from 'states/boardready.js';
import Orb from 'entities/orb.js';
import delayfor from 'utils/delayfor.js';

function setup(){
  this.GRAVITY_DELAY = 100;
  this.FALL_DURATION = 100;
  this.COMBO_DELAY = 125;
  this.SKYFALL_MATCH_DELAY = 300;

  for(let id in $GAME.Boards){
    // TODO: Multiplayer support
    this.board = $GAME.Boards[id]
    this.totalMatches = 0;
    this.luckyMatches = 0;  // TODO
  }

  this.board.each("Orb", orb => orb.sprite.interactive = false);

  removeMatches.call(this, this.board.matches);
}

function tick(){
  if(this.board){
    this.board.each("Orb", orb => {
      orb.animate()
    });
    $GAME.each("FpsDisplay", fps => fps.update());
  }
}

function cleanup(){

}

function removeMatches(matches){
  this.totalMatches += matches.length;  // 1 Match? 1 Combo
  matches.forEach((match, matchIndex) => {          // For EVERY match
    delayfor(this.COMBO_DELAY * matchIndex + 1).then(() => {
      match.forEach(orb => {  // destroy every orb in match
        $GAME.destroy(this.board.Orbs2D[orb.x][orb.y]);
        delete this.board.Orbs2D[orb.x][orb.y];
      });
      // If this is the last match
      if(matchIndex === matches.length - 1){
        skyfall.call(this);
      }
    });
  });
}

function skyfall(){
  delayfor(this.GRAVITY_DELAY).then(() => {
    gravityBoard.call(this);
    return delayfor(this.SKYFALL_MATCH_DELAY);
  }).then(() => {
    this.board.matches = this.board.analyzeBoard();
    if(this.board.matches){
      removeMatches.call(this, this.board.matches);
    } else {
      $GAME.state = BOARD_READY;
    }
  });
}

function gravityBoard(){
  for(var i = 0; i < this.board.width; i++){
    for(var j = this.board.height - 1; j >= 0; j--){
      if(!this.board.Orbs2D[i][j]){ // if an orb is missing
        let k = j - 1;  // decrement y (move up) until we find one or hit a wall
        while(!this.board.Orbs2D[i][k] && k > -1){
          k--;
        }

        if(k > -1){ // there is an orb above this one
          this.board.Orbs2D[i][j] = this.board.Orbs2D[i][k];
          this.board.Orbs2D[i][j].y = j;
          var point = this.board.Orbs2D[i][j].calculateHomePosition(i, j);
          this.board.Orbs2D[i][j].animateTo(point.x, point.y, this.FALL_DURATION);
          delete this.board.Orbs2D[i][k];
        } else {  // there is not an orb above this one
          this.board.Orbs2D[i][j] = new Orb(i, j);
          this.board.Orbs2D[i][j].sprite.interactive = false;
          this.board.addChild(this.board.Orbs2D[i][j]);
          var point = this.board.Orbs2D[i][j].calculateHomePosition(i, j);
          this.board.Orbs2D[i][j].animateTo(point.x, point.y, this.FALL_DURATION * 2);
        }
      }
    }
  }
}

const BOARD_UPDATING = new State(setup, tick, cleanup);
export default BOARD_UPDATING;
