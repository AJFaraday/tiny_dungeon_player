TDP.tile_components.item_components = function() {
  
  // TODO some decision making process here
  this.score_value = 10;
  
  if (TDP.data.item_types[this.source]) {
    this.item_type = TDP.data.item_types[this.source];
  } else {
    this.item_type = 'default';
  }

  
  if (TDP.commands.item_effects[this.item_type]) {
    this.effect = TDP.commands.item_effects[this.item_type]
  } else {
    this.effect = TDP.commands.item_effects.default;
  }
  
};