function MOVE_COMPONENT(sprite){
  return move;

  function move(dx, dy){
    // TODO: FPS Independent movement
    sprite.x += dx;
    sprite.y += dy;
  }
}

export default MOVE_COMPONENT;
