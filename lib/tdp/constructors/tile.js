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

  if (this.type == 'player') {
    // add functions from TDP.commands.player_actions
    TDP.commands.player_actions.apply(this)
  }
  this.is = function (type) {
    return this.type == type
  };

  this.hasInteraction = TDP.utils.contains(
    ['item', 'food', 'monument', 'monster'],
    this.type
  );

  if (this.hasInteraction) {
    if (TDP.commands.tile_interactions[this.type]) {
      this.interaction = TDP.commands.tile_interactions[this.type];
    } else {
      this.interaction = function() {
        console.log('Interaction not implmented yet')
      };
    }
  }

  this.replaceWith = function(new_tile) {
    var position = TDP.field.positionOf(this);
    TDP.field.replaceTile(new_tile, position[0], position[1]);
  };

  this.position = function() {
    return TDP.field.positionOf(this);
  };

  this.neighbourUp = function() {
    var position = this.position();
    return TDP.field.tileAt(position[0], (position[1] - 1))
  };

  this.neighbourDown = function() {
    var position = this.position();
    return TDP.field.tileAt(position[0], (position[1] + 1))
  };

  this.neighbourLeft = function() {
    var position = this.position();
    return TDP.field.tileAt((position[0] - 1), position[1])
  };

  this.neighbourRight = function() {
    var position = this.position();
    return TDP.field.tileAt((position[0] + 1), position[1])
  };

};



