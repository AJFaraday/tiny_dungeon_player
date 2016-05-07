// A tile interaction is the function that is fired
// when a player tries to step onto this tile.
//
// If the tile is passable, the player wil ALSO step onto that space.
//
TDP.commands.tile_interactions = {
  
  monster: function(monster, player) {
    console.log('Attacking ' + monster.source + '!');
  },

  food: function(food, player) {
    console.log('Mmmmmmm, ' + food.source);
    player.moveToPosition(food.position());
  },
  
  monument: function(monument, player) {
    console.log("Hey look! It's a " + monument.source)
  },

  door: function(door, player) {
    console.log("Opening the door")
    player.moveToPosition(door.position());
  }

};
