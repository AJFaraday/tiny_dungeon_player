// A tile interaction is the function that is fired
// when a player tries to step onto this tile.
//
// If the tile is passable, the player wil ALSO step onto that space.
//
TDP.commands.tile_interactions = {

  // The player attacks the monster.
  monster: function(monster, player) {
    if (player.willHit()) {
      monster.dealDamage(player.damage);
      var small_message = 'You did ' + player.damage + ' damage!';
      if (monster.isDead()) {
        small_message = small_message.concat(' You killed it!');
      } else {
        small_message = small_message.concat(' It has ' + monster.health + ' health left.');
      }
    } else {
      small_message = 'You missed!'
    }

    TDP.console.log(
      'Attacking ' + monster.source + '!',
      small_message
    );
  },

  // The player eats the food, gaining health.
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
