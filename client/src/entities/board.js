import Entity from 'entities/entity.js';
import Orb from 'entities/orb.js';

class Board extends Entity {

  constructor(width, height){
    super();
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources['img/board.png'].texture
    );
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.defaultCursor = "none";
    this.sprite.x = 0;
    this.sprite.y = 0;
    this.width = width;
    this.height = height;
    this.Orbs2D = [];
  }

  analyzeBoard(){
    var matches = this.getMatches();
    if(matches.length){
      return matches;
    } else {
      return false;
    }
  }

  getMatches(){
    var checked = [];
    for(let i = 0; i < this.width; i++){
      checked[i] = [];
      for(let j = 0; j < this.height; j++){
        checked[i][j] = false;
      }
    }

    var type = 0;
    var matches = [];
    var match = [];

    for(let i = 0; i < this.width; i++){
      for(let j = 0; j < this.height; j++){
        if(checked[i][j] !== true){
          match = [];
          type = this.Orbs2D[i][j].type
          recur.call(this, i, j);
          if(match.length) matches.push(match);
        }
      }
    }

    return matches;

    function recur(x, y){
      if(checked[x][y] === true) {
        return;
      }
      if(isOrbPartOfMatch.call(this, x, y)){
        checked[x][y] = true;
        match.push({x: x, y: y});
        if(x < this.width - 1) {
          recur.call(this, x + 1, y);
        }
        if(y < this.height - 1) recur.call(this, x, y + 1);
        if(y > 0) recur.call(this, x, y - 1);
      }
    }

    function isOrbPartOfMatch(x, y){
      if(this.Orbs2D[x][y].type !== type) return;

      // Match right (XOO)?
      if( x < this.width - 2 &&
        this.Orbs2D[x + 1][y].type === type &&
        this.Orbs2D[x + 2][y].type === type){
          return true;
      }

      // Match two down? (X)
      //                 (0)
      //                 (0)

      if(y < this.height - 2 &&
        this.Orbs2D[x][y + 1].type === type &&
        this.Orbs2D[x][y + 2].type === type){
          return true;
      }

      // Match horizontally middle (OXO)
      if(x > 0 && x < this.width - 1 &&
        this.Orbs2D[x + 1][y].type === type &&
        this.Orbs2D[x - 1][y].type === type){
          return true;
      }

      // Match vertically middle
      if(y > 0 && y < this.height - 1 &&
        this.Orbs2D[x][y + 1].type === type &&
        this.Orbs2D[x][y - 1].type === type){
          return true;
      }

      // Match left (OOX)?
      if(x > 1 &&
        this.Orbs2D[x - 1][y].type === type &&
        this.Orbs2D[x - 2][y].type === type){
          return true;
      }

      // Match two up
      if(y > 1 &&
        this.Orbs2D[x][y - 1].type === type &&
        this.Orbs2D[x][y - 2].type === type){
        return true;
      }

      return false;
    }

  }

  boardDebug(){
    console.log('---------------------');
    for(let i = 0; i < this.height; i++){
      var out = "";
      for(let j = 0; j < this.width; j++){
        out += '(' + this.Orbs2D[j][i].x + ', ' + this.Orbs2D[j][i].y + ') ';
      }
      console.log(out + '\n');
    }
    console.log('---------------------');
  }


}

export default Board;
