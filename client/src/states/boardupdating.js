import $GAME from 'entities/game.js';
import State from 'states/state.js';
import BOARD_READY from 'states/boardready.js';
import Orb from 'entities/orb.js';

function setup(){
  for(let id in $GAME.Boards){
    // TODO: Multiplayer support
    this.board = $GAME.Boards[id]
  }

  removeMatches.call(this, this.board.matches);


}

function tick(){
  this.board.each("Orb", orb => orb.animate());
}

function cleanup(){

}

function removeMatches(matches){

  matches.forEach((match, matchIndex) => {

    window.setTimeout(() => {
      match.forEach(point => {
        let sx = this.board.Orbs2D[point.x][point.y].sprite.x;
        let sy = this.board.Orbs2D[point.x][point.y].sprite.y;
        $GAME.destroy(this.board.Orbs2D[point.x][point.y]);
        delete this.board.Orbs2D[point.x][point.y];
      })

      if(matchIndex === matches.length - 1){
        window.setTimeout(() => {
          gravityBoard.call(this);
          this.board.boardDebug();
        }, 300)
      }

    }, 300 * matchIndex + 1);
  });
}

function gravityBoard(){
  for(var i = 0; i < this.board.width; i++){
    for(var j = this.board.height - 1; j >= 0; j--){
      if(!this.board.Orbs2D[i][j]){
        let k = j - 1;
        while(!this.board.Orbs2D[i][k] && k > -1){
          k--;
        }

        if(k > -1){ // there is an orb above this one
          this.board.Orbs2D[i][j] = this.board.Orbs2D[i][k];
          this.board.Orbs2D[i][j].y = j;
          var x = ((this.board.Orbs2D[i][j].sprite.width + this.board.Orbs2D[i][j].paddingx) * i + (this.board.Orbs2D[i][j].offsetx));
          var y = ((this.board.Orbs2D[i][j].sprite.height + this.board.Orbs2D[i][j].paddingy) * j) + (($GAME.GAME_HEIGHT / 2) + this.board.Orbs2D[i][j].offsety);
          this.board.Orbs2D[i][j].animateTo(x, y, 600);
          delete this.board.Orbs2D[i][k];
          //j++;
        } else {  // there is not an orb above this one
          console.log('adding orb at ' + i + ', ' + j);
          this.board.Orbs2D[i][j] = new Orb(i, j)
          this.board.addChild(this.board.Orbs2D[i][j]);
          var x = ((this.board.Orbs2D[i][j].sprite.width + this.board.Orbs2D[i][j].paddingx) * i + (this.board.Orbs2D[i][j].offsetx));
          var y = ((this.board.Orbs2D[i][j].sprite.height + this.board.Orbs2D[i][j].paddingy) * j) + (($GAME.GAME_HEIGHT / 2) + this.board.Orbs2D[i][j].offsety);
          this.board.Orbs2D[i][j].animateTo(x, y, 600);
          this.board.Orbs2D[i][j].addReleaseHandler(e => {
            console.log('released');
            this.board.matches = this.board.analyzeBoard();
            if(this.board.matches){
              $GAME.state = BOARD_UPDATING;
            }
          })
        }

      }
    }
  }
}

const BOARD_UPDATING = new State(setup, tick, cleanup);
export default BOARD_UPDATING;
