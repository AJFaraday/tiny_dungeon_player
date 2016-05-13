TDP.tile_components.player_components = function () {

  TDP.tile_components.movement.apply(this);
  TDP.tile_components.attacking.apply(this);

  var attrs;
  if (TDP.data.player_types[this.source]) {
    attrs = TDP.data.player_types[this.source];
  } else {
    attrs = TDP.data.player_types.default;
  }
  $.extend(this, attrs);
  TDP.health = attrs.health;

  this.moveToTile = function (tile) {
    if (TDP.player.isAlive()) {
      if (TDP.won()) {
        TDP.console.log('You won! Stop moving!')
      } else {
        if (tile) {
          if (tile.hasInteraction) {
            tile.interaction(tile, this);
            TDP.newTurn();
          } else if (tile.passable) {
            this.moveToPosition(tile.position());
            TDP.newTurn();
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
    $.each(entities.doors, function (i, door) {
      new_tile = new TDP.constructors.Tile(TDP.data.named_tiles.floor);
      door.replaceWith(new_tile);
    });
  }

  function specialAttackMonuments(entities) {
    var new_tile;
    $.each(entities.monuments, function (i, monument) {
      new_tile = new TDP.constructors.Tile(TDP.data.named_tiles.floor);
      monument.replaceWith(new_tile);
    });
  }


  function specialAttackMonsters(entities) {
    var monster_emoji = [];
    $.each(entities.monsters, function (i, monster) {
      monster.dealDamage(TDP.player.special_attack_damage);
      TDP.changeScore(monster.score_value);
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
      specialAttackMonuments(entities);
      var monster_emoji = specialAttackMonsters(entities);
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
      TDP.newTurn();
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
    TDP.setHealth(TDP.health - amount);
  };

  this.heal = function (amount) {
    TDP.setHealth(TDP.health + amount);
  };
  
  this.restart = TDP.restart;
  
};
