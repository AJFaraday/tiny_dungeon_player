TDP.commands.player_actions = function () {

  this.moveToTile = function (tile) {
    if (tile) {
      if (tile.hasInteraction) {
        tile.interaction(tile, this);
      } else if (tile.passable) {
        this.moveToPosition(tile.position());
      } else {
        console.log("You can't go there!")
      }
    } else {
      console.log("You can't go there! edge of the map!")
    }
  };

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

  this.moveUp = function () {
    this.moveToTile(this.neighbourUp());
  };

  this.moveDown = function () {
    this.moveToTile(this.neighbourDown());
  };

  this.moveLeft = function () {
    this.moveToTile(this.neighbourLeft());
  };

  this.moveRight = function () {
    this.moveToTile(this.neighbourRight());
  };

  this.specialAttack = function () {
    console.log("What special attack?")
  };

};
