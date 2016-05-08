TDP.tile_components.movement = function () {
  
  this.moveToPosition = function (position) {
    this.moveTo(position[0], position[1]);
  };

  this.moveTo = function (x, y) {
    var start_position = this.position();

    TDP.field.replaceTile(this, x, y);

    TDP.field.replaceTile(
      new TDP.constructors.Tile(
        TDP.data.named_tiles.floor
      ),
      start_position[0],
      start_position[1]
    );
    TDP.field.drawBoard();
  };
  
};