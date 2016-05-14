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

  switch (this.type) {
    case 'player':
      TDP.tile_components.player_components.apply(this);
      break;
    case 'monster':
      TDP.tile_components.monster_components.apply(this);
      break;
    case 'food':
      TDP.tile_components.food_components.apply(this);
      break;
    case 'monument':
      TDP.tile_components.monument_components.apply(this);
      break;
    case 'item':
      TDP.tile_components.item_components.apply(this);
      break;
  }

  this.is = function (type) {
    return this.type == type
  };

  this.hasInteraction = TDP.utils.contains(
    ['item', 'food', 'door', 'monument', 'monster'],
    this.type
  );

  if (this.hasInteraction) {
    if (TDP.commands.tile_interactions[this.type]) {
      this.interaction = TDP.commands.tile_interactions[this.type];
    } else {
      this.interaction = function () {
        console.log('Interaction not implmented yet')
      };
    }
  }

  this.replaceWith = function (new_tile) {
    var position = TDP.field.positionOf(this);
    TDP.field.replaceTile(new_tile, position[0], position[1]);
  };

  this.position = function () {
    return TDP.field.positionOf(this);
  };

  this.neighbourUp = function () {
    var position = this.position();
    return TDP.field.tileAt(position[0], (position[1] - 1))
  };

  this.neighbourDown = function () {
    var position = this.position();
    return TDP.field.tileAt(position[0], (position[1] + 1))
  };

  this.neighbourLeft = function () {
    var position = this.position();
    return TDP.field.tileAt((position[0] - 1), position[1])
  };

  this.neighbourRight = function () {
    var position = this.position();
    return TDP.field.tileAt((position[0] + 1), position[1])
  };

  this.distanceTo = function (target) {
    var target_position = target.position();
    var position = this.position();

    var x_distance = Math.abs(position[0] - target_position[0]);
    var y_distance = Math.abs(position[1] - target_position[1]);
    return (x_distance + y_distance);
  };

  this.adjacentTo = function (target) {
    return (this.distanceTo(target) == 1);
  };

  this.distanceToPosition = function (x, y) {
    var position = this.position();

    var x_distance = Math.abs(position[0] - x);
    var y_distance = Math.abs(position[1] - y);
    return (x_distance + y_distance);
  };

  // Range is based on how far you can get in horizontal/vertial
  // steps. Returns:
  //
  // monsters: monster type tiles in range
  // tiles: all tiles but walls, doors and monuments in range
  this.monstersAndTilesInRange = function (range) {
    var output = {
      tiles: [],
      monsters: [],
      doors: [],
      monuments: []
    };
    var tile;
    var player = this;
    var position = this.position();
    $.each(
      TDP.field.rows,
      function (row_index, row) {
        $.each(
          row,
          function (tile_index, tile) {
            if (player.distanceToPosition(tile_index, row_index) <= range) {
              if (tile_index != position[0] || row_index != position[1]) {
                if (['wall', 'monument'].indexOf(tile.type) == -1) {
                  output.tiles = output.tiles.concat(tile);
                }
                if (tile.is('monster')) {
                  output.monsters = output.monsters.concat(tile);
                }
                if (tile.is('door')) {
                  output.doors = output.doors.concat(tile);
                }
                if (tile.is('monument')) {
                  output.monuments = output.monuments.concat(tile);
                }
              }
            }
          }
        )
      }
    );
    return output;
  };


  this.startEmoji = this.source;

  this.resetEmoji = function () {
    this.source = this.startEmoji;
  };

  this.html_tile = function () {
    var position = this.position();
    var row = $(TDP.UI.board.children('div.TDP_board_inner').children('div.TDP_board_row')[position[1]]);
    return $(row.children('div.TDP_board_tile')[position[0]]);
  };

  this.flash = function (character) {
    var me = this;
    setTimeout(function () {
      try {
        var tile = me.html_tile();
        var overlay = tile.children('.TDP_board_tile_overlay');
        overlay.html(TDP.emoji.get(character));
        overlay.removeClass('flashing');
        overlay.addClass('flashing');
      } catch (er) {
        console.log("Couldn't flash: " + er.message)
      }
    }, 1)
  };

};



