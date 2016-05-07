// Source - a single emoji character
TDP.constructors.Tile = function (source) {

  this.class = 'Field';
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
  
};
