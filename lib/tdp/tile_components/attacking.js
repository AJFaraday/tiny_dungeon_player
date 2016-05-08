TDP.tile_components.attacking = function() {
  
  // one in attack_chance will miss
  this.willHit = function() {
    return (Math.floor(Math.random() * this.attack_chance) != 0);
  };
  
};
