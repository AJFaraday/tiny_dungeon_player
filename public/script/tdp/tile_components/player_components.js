TDP.tile_components.player_components = function () {

  TDP.tile_components.movement.apply(this);
  TDP.tile_components.attacking.apply(this);

  // TODO a decision making process here 
  this.damage = 1;             // How much damanage it'll do to monsters
  this.attack_chance = 3;      // 1 in this many will miss the monster.

  this.special_attacks = 0;    // should be found at monuments
  this.special_attack_range = 2;
  this.special_attack_damage = 3;

  this.moveToTile = function (tile) {
    if (TDP.player.isAlive()) {
      if (TDP.won()) {
        TDP.console.log('You won! Stop moving!')
      } else {
        if (tile) {
          if (tile.hasInteraction) {
            tile.interaction(tile, this);
            TDP.new_turn();
          } else if (tile.passable) {
            this.moveToPosition(tile.position());
            TDP.new_turn();
          } else {
            TDP.console.log("You can't go there!", "It's a wall.")
          }
        } else {
          TDP.console.log("You can't go there!", 'Edge of the map.')
        }
      }
    } else {
      TDP.console.log("You're dead. Stay there!")
    }
  };

  function specialAttackFlash(entities) {
    $.each(entities.tiles, function (i, tile) {
      tile.flash(TDP.data.overlays.special_attack);
    });
  }

  function specialAttackDoors(entities) {
    var new_tile;
    var new_tiles = []; // doors have been replaced with these tiles
    $.each(entities.doors, function (i, door) {
      new_tile = new TDP.constructors.Tile(TDP.data.named_tiles.floor);
      door.replaceWith(new_tile);
    });
  }

  function specialAttackMonsters(entities, monster_emoji) {
    var monster_emoji = [];
    $.each(entities.monsters, function (i, monster) {
      monster.dealDamage(TDP.player.special_attack_damage);
      TDP.change_score(monster.score_value);
      monster_emoji = monster_emoji.concat(monster.source);
    });
    return monster_emoji;
  }

  this.specialAttack = function () {
    if (this.special_attacks == 0) {
      TDP.console.log("What special attack?", '')
    } else {
      this.special_attacks -= 1;
      var entities = this.monstersAndTilesInRange(this.special_attack_range);
      specialAttackDoors(entities);
      var monster_emoji = specialAttackMonsters(entities, monster_emoji);
      specialAttackFlash(this.monstersAndTilesInRange(this.special_attack_range));
      if (monster_emoji.length == 1) {
        TDP.console.log(
          "Wow! Look at that!",
          "It engulfed the " + monster_emoji
        );
      } else if (monster_emoji.length > 1) {
        TDP.console.log(
          "Wow! Look at that!",
          "It engulfed all these monsters " + monster_emoji.join(', ')
        );
      } else {
        TDP.console.log(
          "Wow! Look at that!",
          "You missed all the monsters, tho."
        );
      }
      TDP.new_turn();
    }
  };

  this.isDead = function () {
    return TDP.health <= 0
  };

  this.isAlive = function () {
    return TDP.health > 0
  };

  this.health = function () {
    return TDP.health;
  };

  this.dealDamage = function (amount) {
    TDP.set_health(TDP.health - amount);
  };

  this.heal = function (amount) {
    TDP.set_health(TDP.health + amount);
  };
};
