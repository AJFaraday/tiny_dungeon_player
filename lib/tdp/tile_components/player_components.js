TDP.tile_components.player_components = function () {

  TDP.tile_components.movement.apply(this);
  TDP.tile_components.attacking.apply(this);
  
  this.moveToTile = function (tile) {
    if (TDP.player.isAlive( )) {
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
    } else {
      TDP.console.log("You're dead. Stay there!")
    }
  };
  
  this.specialAttack = function () {
    TDP.console.log("What special attack?", '')
  };

  this.isDead = function () {
    return TDP.health <= 0
  };
  
  this.isAlive = function () {
    return TDP.health > 0
  };

  // TODO a decision making process here 
  this.damage = 1;             // How much damanage it'll do to monsters
  this.attack_chance = 3;      // 1 in this many will miss the monster.
  
};
