'use strict';

import $GAME from 'entities/game.js';
import TITLE_STATE from 'states/title.js';
import INITIALIZE_BOARD from 'states/initializeboard.js';

$GAME.GAME_WIDTH = 800;
$GAME.GAME_HEIGHT = 800;

$GAME.stage = new PIXI.Container();

$GAME.renderer = PIXI.autoDetectRenderer($GAME.GAME_WIDTH, $GAME.GAME_HEIGHT, {
  antialiasing: false,
  transparent: false,
  resolution: window.devicePixelRatio,
  autoResize: true
});

document.body.appendChild($GAME.renderer.view);

PIXI.loader
  .add(["img/GreenOrb.png",
        "img/MagentaOrb.png",
        "img/PurpleOrb.png",
        "img/RedOrb.png",
        "img/BlueOrb.png",
        "img/YellowOrb.png",
        "img/board.png",
        "img/background.png"])
  .load(onAssetLoadComplete);

function onAssetLoadComplete(){
  $GAME.state = INITIALIZE_BOARD;

  PIXI.ticker.shared.minFPS = 0;
  PIXI.ticker.shared.add(gameLoop);
}

function gameLoop(){
  $GAME.toBeDestroyed.forEach(entity => {
    entity.destroy();
  })
  $GAME.toBeDestroyed = [];
  $GAME.state.tick();
  $GAME.renderer.render($GAME.stage);
}
