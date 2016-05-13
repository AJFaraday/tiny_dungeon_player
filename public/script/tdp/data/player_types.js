TDP.data.player_types = {
  default: {
    damage: 1,
    attack_chance: 3,
    health: 10,
    special_attacks: 0,
    special_attack_range: 2,
    special_attack_damage: 3
  }
};

var define_player = function(emoji, attributes) {
  TDP.data.player_types[emoji] = $.extend(
    {},
    TDP.data.player_types.default,
    attributes
  );
};

define_player(
  TDP.data.named_tiles.berserk,
  {damage: 3, health: 5}
);

define_player(
  TDP.data.named_tiles.worried,
  {special_attack_range: 3}
);

define_player(
  TDP.data.named_tiles.thinking,
  {attack_chance: 10}
);

// TODO some more specific player definitions


delete define_player;
