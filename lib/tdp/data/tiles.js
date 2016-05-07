TDP.data.named_tiles = {
  // scenery
  wall: "\u{2b1b}",
  floor: "\u{2b1c}",
  door: "\u{1f6aa}",
  // food
  beer: "\u{1f37a}",
  cheese: "\u{1f9c0}",
  chocolate: "\u{1f36b}",
  fruit: "\u{1f351}",
  meat: "\u{1f356}",
  mushroom: "\u{1f344}",
  pizza: "\u{1f355}",
  // items
  bag_of_holding: "\u{1f45d}",
  book: "\u{1f4d5}",
  boots: "\u{1f462}",
  bow_arrow: "\u{1f3f9}",
  brass_torch: "\u{1f526}",
  camera: "\u{1f4f7}",
  candle: "\u{1f56f}",
  crown: "\u{1f451}",
  chest: "\u{1f381}",
  credit_card: "\u{1f4b3}",
  crossed_swords: "\u{2694}",
  crystal_ball: "\u{1f52e}",
  dagger: "\u{1f5e1}",
  gem: "\u{1f48e}",
  hat: "\u{1f3a9}",
  helmet: "\u{26d1}",
  horn: "\u{1f4ef}",
  key: "\u{1f5dd}",
  magic_marker: "\u{1f58d}",
  money_bag: "\u{1f4b0}",
  pack: "\u{1f392}",
  pick_axe: "\u{26cf}",
  potion: "\u{2697}",
  prayer_beads: "\u{1f4ff}",
  ring: "\u{1f48d}",
  scroll: "\u{1f4dc}",
  shield: "\u{1f6e1}",
  shirt: "\u{1f455}",
  shirt2: "\u{1f3bd}",
  // monuments
  bath: "\u{1f6c1}",
  shrine: "\u{26e9}",
  statue: "\u{1f5ff}",
  temple: "\u{1f3db}",
  web: "\u{1f578}",
  fire: "\u{1f525}",
  // monsters
  ant: "\u{1f41c}",
  bee: "\u{1f41d}",
  bug: "\u{1f41b}",
  croc: "\u{1f40a}",
  dragon: "\u{1f409}",
  dust_vortex: "\u{1f32a}",
  elephant: "\u{1f418}",
  ghost: "\u{1f47b}",
  imp: "\u{1f47f}",
  monkey: "\u{1f412}",
  ogre: "\u{1f479}",
  ox: "\u{1f402}",
  rat: "\u{1f400}",
  scorpion: "\u{1f982}",
  snake: "\u{1f40d}",
  sheep: "\u{1f40f}",
  unicorn: "\u{1f984}",
  w_buffalo: "\u{1f403}",
  // Pets
  egg: "\u{1f423}",
  cat: "\u{1f408}",
  dog: "\u{1f415}",
  horse: "\u{1f40e}",
  // Players
  thinking: "\u{1f914}",
  worried: "\u{1f625}",
  dizzy: "\u{1f635}",
  grimace: "\u{1f62c}",
  berserk: "\u{1f621}"
};

named_tiles = TDP.data.named_tiles;

TDP.data.tiles = {

  /* all possible tiles at
   https://github.com/SwartzCr/tinydungeon/blob/master/_dungeon_helper.py

   "\U0001f423" > "\u{1f423}"

   * replace upper case U with lower case u
   * wrap the rest in curly braces { }
   * Remove leading zeros
   */

  // These tiles are inert, and will not change
  background: [
    named_tiles.wall,
    named_tiles.floor
  ],

  // objects may act when a player steps on to them
  doors: [
    named_tiles.door
  ],

  // The emoji a player controls
  players: [
    named_tiles.berserk,
    named_tiles.dizzy,
    named_tiles.grimace,
    named_tiles.thinking,
    named_tiles.worried
  ],

  // Food will up the players health
  // Maybe score, too
  food: [
    named_tiles.beer,
    named_tiles.cheese,
    named_tiles.chocolate,
    named_tiles.fruit,
    named_tiles.meat,
    named_tiles.mushroom,
    named_tiles.pizza
  ],

  // Items will up the players score.
  // (lets keep it simple for now)
  items: [
    named_tiles.bag_of_holding,
    named_tiles.book,
    named_tiles.boots,
    named_tiles.bow_arrow,
    named_tiles.brass_torch,
    named_tiles.camera,
    named_tiles.candle,
    named_tiles.chest,
    named_tiles.credit_card,
    named_tiles.crossed_swords,
    named_tiles.crown,
    named_tiles.crystal_ball,
    named_tiles.dagger,
    named_tiles.gem,
    named_tiles.hat,
    named_tiles.helmet,
    named_tiles.horn,
    named_tiles.key,
    named_tiles.magic_marker,
    named_tiles.money_bag,
    named_tiles.pack,
    named_tiles.pick_axe,
    named_tiles.potion,
    named_tiles.prayer_beads,
    named_tiles.ring,
    named_tiles.scroll,
    named_tiles.shield,
    named_tiles.shirt,
    named_tiles.shirt2
  ],

  // Monuments are probably just impassible scenery for now
  monuments: [
    named_tiles.bath,
    named_tiles.fire,
    named_tiles.shrine,
    named_tiles.statue,
    named_tiles.temple,
    named_tiles.web
  ],

  // Monsters will attack the player
  monsters: [
    named_tiles.ant,
    named_tiles.bee,
    named_tiles.bug,
    named_tiles.croc,
    named_tiles.dragon,
    named_tiles.dust_vortex,
    named_tiles.elephant,
    named_tiles.ghost,
    named_tiles.imp,
    named_tiles.monkey,
    named_tiles.ogre,
    named_tiles.ox,
    named_tiles.rat,
    named_tiles.scorpion,
    named_tiles.sheep,
    named_tiles.snake,
    named_tiles.unicorn,
    named_tiles.w_buffalo
  ],

  pets: [
    named_tiles.egg,
    named_tiles.cat,
    named_tiles.dog,
    named_tiles.horse
  ]

}
;

// Nope, we can't walk here...
TDP.data.tiles.impassable = [named_tiles.wall];
TDP.data.tiles.impassable = TDP.data.tiles.impassable.concat(TDP.data.tiles.monuments);
TDP.data.tiles.impassable = TDP.data.tiles.impassable.concat(TDP.data.tiles.monsters);
TDP.data.tiles.impassable = TDP.data.tiles.impassable.concat(TDP.data.tiles.pets);

TDP.data.tiles.classifications = {};

TDP.data.tiles.classifications[TDP.data.named_tiles.wall] = 'wall';
TDP.data.tiles.classifications[TDP.data.named_tiles.floor] = 'floor';
TDP.data.tiles.classifications[TDP.data.named_tiles.door] = 'door';

var build_classification = function (collection, name) {
  jQuery.each(
    collection,
    function (i, emoji) {
      TDP.data.tiles.classifications[emoji] = name;
    }
  );
};

build_classification(TDP.data.tiles.players, 'player');
build_classification(TDP.data.tiles.pet, 'pet');
build_classification(TDP.data.tiles.items, 'item');
build_classification(TDP.data.tiles.food, 'food');
build_classification(TDP.data.tiles.monuments, 'monuments');
build_classification(TDP.data.tiles.monsters, 'monsters');

delete named_tiles;