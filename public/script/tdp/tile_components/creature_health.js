// Creature, in this case, can mean monster or pet
TDP.tile_components.creature_health = function () {

  this.isAlive = function () {
    return this.health > 0
  };

  this.isDead = function () {
    return this.health <= 0
  };

  this.dealDamage = function (amount) {
    this.health -= amount;
    if (this.isDead()) {
      this.replaceWith(this.last_tile);
      TDP.monsters.splice(TDP.monsters.indexOf(this), 1);
      TDP.field.drawBoard();
    }
  };

  this.heal = function (amount) {
    this.health += amount;
  };

};