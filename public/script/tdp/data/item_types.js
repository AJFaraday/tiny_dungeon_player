TDP.data.item_types = {};

var set_item_type = function(emoji, type) {
  TDP.data.item_types[emoji] = type;
};

set_item_type(TDP.data.named_tiles.bow_arrow, 'weapon');
set_item_type(TDP.data.named_tiles.crossed_swords, 'weapon');
set_item_type(TDP.data.named_tiles.pick_axe, 'weapon');
set_item_type(TDP.data.named_tiles.dagger, 'weapon');

set_item_type(TDP.data.named_tiles.boots, 'clothing');
set_item_type(TDP.data.named_tiles.hat, 'clothing');
set_item_type(TDP.data.named_tiles.ring, 'clothing');
set_item_type(TDP.data.named_tiles.shirt, 'clothing');
set_item_type(TDP.data.named_tiles.shirt2, 'clothing');
