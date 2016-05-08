TDP.tile_components.creature_health = function () {

  // TODO do this by config and/or monster graduation
  this.health = 2;

  this.isAlive = function () {
    return this.health > 0
  };

  this.isDead = function () {
    return this.health <= 0
  };

  this.damage = function (amount) {
    this.health -= amount;
    if (this.isDead()) {
      this.replaceWith(new TDP.constructors.Tile(TDP.data.named_tiles.floor));
    }
  };

  this.heal = function (amount) {
    this.health += amount;
  };

};