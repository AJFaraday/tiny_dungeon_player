// A tile interaction is the function that is fired
// when a player tries to step onto this tile.
//
// If the tile is passable, the player wil ALSO step onto that space.
//
TDP.commands.tile_interactions = {
  
  monster: function(monster, player) {
    console.log('Attacking!');
  },

  food: function(food, player) {
    console.log('Mmmmmmm, ' + food.source);
    player.moveToPosition(food.position());
  }

};
