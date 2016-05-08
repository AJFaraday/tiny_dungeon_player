TDP.tile_components.movement = function () {

  // Note, this is overridden in specific classes
  // in order to make movement decisions.
  this.moveToTile = function (tile) {
    this.moveToPosition(tile.position());
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

  ///////////////////////////////
  //      move towards         //
  ///////////////////////////////
  this.XFirst = (Math.floor(Math.random() * 2) == 0);

  this.moveTowardsTile = function(tile) {
    this.moveTowardsPosition(tile.position());
  };

  this.moveTowardsPosition = function(position) {
    this.moveTowards(position[0], position[1]);
  };
  
  this.moveTowards = function (x, y) {
    var moved;
    if (this.XFirst) {
      moved = this.moveTowardsX(x);
      if (!moved) {
        this.moveTowardsY(y);
      }
    } else {
      moved = this.moveTowardsY(y);
      if (!moved) {
        this.moveTowardsX(x);
      }      
    }
    this.toggleXFirst();
  };

  this.toggleXFirst = function () {
    this.XFirst = !this.XFirst;
  };

  this.moveTowardsX = function (x) {
    if (x > this.position()[0]) {
      this.moveRight();
      return true;
    } else if (x < this.position()[0]) {
      this.moveLeft();
      return true;
    } else {
      return false;
    }
  };

  this.moveTowardsY = function (y) {
    if (y > this.position()[1]) {
      this.moveDown();
      return true;
    } else if (y < this.position()[1]) {
      this.moveUp();
      return true;
    } else {
      return false;
    }
  };

};