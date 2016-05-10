TDP.tile_components.item_components = function() {
  
  // TODO some decision making process here
  this.score_value = 5;
  
  if (TDP.commands.item_effects[this.source]) {
    this.effect = TDP.commands.item_effects[this.source]
  } else {
    this.effect = TDP.commands.item_effects.default;
  }
  
};