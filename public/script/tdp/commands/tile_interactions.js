// A tile interaction is the function that is fired
// when a player tries to step onto this tile.
//
// If the tile is passable, the player wil ALSO step onto that space.
//
TDP.commands.tile_interactions = {

  // The player attacks the monster.
  monster: function(monster, player) {
    if (player.willHit()) {
      var monster_position = monster.position();
      monster.dealDamage(player.damage);
      var small_message = 'You did ' + player.damage + ' damage!';
      if (monster.isDead()) {
        TDP.changeScore(monster.score_value);
        var tile = TDP.field.tileAt(monster_position[0], monster_position[1]);
        tile.flash(TDP.data.overlays.player_kill);
        small_message = small_message.concat(' You killed it!');
      } else {
        monster.flash(TDP.data.overlays.player_attack);
        small_message = small_message.concat(' It has ' + monster.health + ' health left.');
      }
    } else {
      monster.flash(TDP.data.overlays.player_miss);
      small_message = 'You missed!';
    }

    TDP.console.log(
      'Attacking ' + monster.source + '!',
      small_message
    );
  },

  // The player eats the food, gaining health.
  food: function(food, player) {
    TDP.changeScore(food.score_value);
    TDP.setHealth(TDP.health + food.heal_value);
    TDP.console.log(
      ('Mmmmmmm, ' + food.source),
      'You gained ' + food.heal_value + ' health.'
    );
    TDP.changeScore(food.score_value);
    player.moveToPosition(food.position());
  },
  
  monument: function(monument, player) {
    if (!monument.found) {
      TDP.changeScore(monument.score_value);
      player.special_attacks += 1;
      monument.found = true;
      if (player.special_attacks == 1) {
        monument.flash(TDP.data.overlays.monument_find);
        TDP.console.log(
          "Hey look! It's a " + monument.source,
          'You found a special attack!'
        );
      } else {
        monument.flash(TDP.data.overlays.monument_find);
        TDP.console.log(
          "Hey look! It's a " + monument.source,
          "You found another special attack! Now you've got " + player.special_attacks
        );
      }
    } else {
      TDP.console.log(
        "Yaaaaawn, that " + monument.source + " again.",
        "You've already searched this " + monument.source
      );
    }
  },
  
  item: function(item, player) {
    item.effect(item, player);
    TDP.changeScore(item.score_value);
    player.moveToPosition(item.position());
  }

};
