// A tile interaction is the function that is fired
// when a player tries to step onto this tile.
//
// If the tile is passable, the player wil ALSO step onto that space.
//
TDP.commands.tile_interactions = {
  
  monster: function(monster, player) {
    TDP.console.log(
      'Attacking ' + monster.source + '!',
      '' // TODO report what happens
    );
  },

  food: function(food, player) {
    TDP.set_health(TDP.health + food.heal_value);
    TDP.console.log(
      ('Mmmmmmm, ' + food.source),
      'You gained ' + food.heal_value + ' health.'
    );
    player.moveToPosition(food.position());
  },
  
  monument: function(monument, player) {
    TDP.console.log(
      "Hey look! It's a " + monument.source,
      '' // TODO report what happens
    );
  },

  door: function(door, player) {
    TDP.console.log("Opening the door", '');
    player.moveToPosition(door.position());
  }

};
