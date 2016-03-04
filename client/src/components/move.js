function MOVE_COMPONENT(context){
  return (dx, dy) => {
    // TODO: FPS Independent movement
    context.sprite.x += dx;
    context.sprite.y += dy;
  }
}

export default MOVE_COMPONENT;
