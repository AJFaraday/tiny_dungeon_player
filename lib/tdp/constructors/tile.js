// Source - a single emoji character
TDP.constructors.Tile = function (source) {

  this.class = 'Tile';
  this.source = source;

  this.impassable = TDP.utils.contains(
    TDP.data.tiles.impassable,
    this.source
  );
  this.passable = !this.impassable;

  this.type = TDP.data.tiles.classifications[this.source];

  this.is = function (type) {
    return this.type == type
  };

  this.hasInteraction = TDP.utils.contains(
    ['item', 'food', 'monument', 'door', 'monster'],
    this.type
  );

  if (this.hasInteraction) {
    this.interaction = TDP.commands.tile_interactions[this.type]
  }

  this.replaceWith = function(new_tile) {
    var position = TDP.field.positionOf(this);
    TDP.field.addTile(new_tile, position[0], position[1]); 
    delete this;
  }

};

