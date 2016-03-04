'use strict';

import $GAME from 'entities/game.js';
import TITLE_STATE from 'states/title.js';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;


$GAME.stage = new PIXI.Container();
$GAME.renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, {
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
        "img/YellowOrb.png"])
  .load(onAssetLoadComplete);

function onAssetLoadComplete(){
  $GAME.state = TITLE_STATE;

  PIXI.ticker.shared.minFPS = 0;
  PIXI.ticker.shared.add(deltaTime => {
    $GAME.state.tick();
    $GAME.renderer.render($GAME.stage);
  });
}
