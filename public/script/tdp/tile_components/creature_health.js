// Creature, in this case, can mean monster or pet
TDP.tile_components.creature_health = function () {

  // TODO a decision making process here
  this.health = 2;

  this.isAlive = function () {
    return this.health > 0
  };

  this.isDead = function () {
    return this.health <= 0
  };

  this.dealDamage = function (amount) {
    this.health -= amount;
    if (this.isDead()) {
      this.replaceWith(new TDP.constructors.Tile(TDP.data.named_tiles.floor));
      TDP.monsters.splice(TDP.monsters.indexOf(this), 1);
      TDP.field.drawBoard();
    }
  };

  this.heal = function (amount) {
    this.health += amount;
  };

};