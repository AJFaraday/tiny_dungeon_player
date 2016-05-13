TDP.data.monster_types = {
  default: {
    attack_chance: 2,
    health: 2,
    damage: 1,
    score_value: 10
  }
};

var define_monster = function(emoji, attributes) {
  TDP.data.monster_types[emoji] = $.extend(
    {},
    TDP.data.monster_types.default,
    attributes
  );
};

define_monster(
  TDP.data.named_tiles.dragon,
  {damage: 2, health: 4, attack_chance: 4, score_value: 30}
);

// TODO some more specific monster definitions


delete define_monster;
