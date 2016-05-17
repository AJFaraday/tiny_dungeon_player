TDP.data.named_tiles = {
  skull: "\uD83D\uDC80",
  // scenery
  wall: "\u2b1b",
  floor: "\u2b1c",
  // not a door
  passage: "\uD83C\uDFFE",
  // food
  beer: "\uD83C\uDF7A",
  cheese: "\uD83E\uDDC0",
  chocolate: "\uD83C\uDF6B",
  fruit: "\uD83C\uDF51",
  meat: "\uD83C\uDF56",
  mushroom: "\uD83C\uDF44",
  pizza: "\uD83C\uDF55",
  // items
  bag_of_holding: "\uD83D\uDC5D",
  book: "\uD83D\uDCD5",
  boots: "\uD83D\uDC62",
  bow_arrow: "\uD83C\uDFF9",
  brass_torch: "\uD83D\uDD26",
  camera: "\uD83D\uDCF7",
  candle: "\uD83D\uDD6F",
  crown: "\uD83D\uDC51",
  chest: "\uD83C\uDF81",
  credit_card: "\uD83D\uDCB3",
  crossed_swords: "\u2694",
  crystal_ball: "\uD83D\uDD2E",
  dagger: "\uD83D\uDDE1",
  gem: "\uD83D\uDC8E",
  hat: "\uD83C\uDFA9",
  helmet: "\u26d1",
  horn: "\uD83D\uDCEF",
  key: "\uD83D\uDDDD",
  magic_marker: "\uD83D\uDD8D",
  money_bag: "\uD83D\uDCB0",
  pack: "\uD83C\uDF92",
  pick_axe: "\u26cf",
  potion: "\u2697",
  prayer_beads: "\uD83D\uDCFF",
  ring: "\uD83D\uDC8D",
  scroll: "\uD83D\uDCDC",
  shield: "\uD83D\uDEE1",
  shirt: "\uD83D\uDC55",
  shirt2: "\uD83C\uDFBD",
  // monuments
  bath: "\uD83D\uDEC1",
  shrine: "\u26e9",
  statue: "\uD83D\uDDFF",
  temple: "\uD83C\uDFDB",
  web: "\uD83D\uDD78",
  fire: "\uD83D\uDD25",
  // monsters
  ant: "\uD83D\uDC1C",
  bee: "\uD83D\uDC1D",
  bug: "\uD83D\uDC1B",
  croc: "\uD83D\uDC0A",
  dragon: "\uD83D\uDC09",
  dust_vortex: "\uD83C\uDF2A",
  elephant: "\uD83D\uDC18",
  ghost: "\uD83D\uDC7B",
  imp: "\uD83D\uDC7F",
  monkey: "\uD83D\uDC12",
  ogre: "\uD83D\uDC79",
  ox: "\uD83D\uDC02",
  poo: "\uD83D\uDCA9",
  rat: "\uD83D\uDC00",
  scorpion: "\uD83E\uDD82",
  snake: "\uD83D\uDC0D",
  sheep: "\uD83D\uDC0F",
  unicorn: "\uD83E\uDD84",
  w_buffalo: "\uD83D\uDC03",
  // Pets - TODO one day add pets. with the help of @swartzCR
  egg: "\uD83D\uDC23",
  cat: "\uD83D\uDC08",
  dog: "\uD83D\uDC15",
  horse: "\uD83D\uDC0E",
  // Players
  thinking: "\uD83E\uDD14",
  worried: "\uD83D\uDE25",
  dizzy: "\uD83D\uDE35",
  grimace: "\uD83D\uDE2C",
  berserk: "\uD83D\uDE21"
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
  ],

  floors: [
    named_tiles.floor,
    named_tiles.passage
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

var build_classification = function (collection, name) {
  jQuery.each(
    collection,
    function (i, emoji) {
      TDP.data.tiles.classifications[emoji] = name;
    }
  );
};

build_classification(TDP.data.tiles.players, 'player');
build_classification(TDP.data.tiles.pets, 'pet');
build_classification(TDP.data.tiles.floors, 'floor');
build_classification(TDP.data.tiles.items, 'item');
build_classification(TDP.data.tiles.food, 'food');
build_classification(TDP.data.tiles.monuments, 'monument');
build_classification(TDP.data.tiles.monsters, 'monster');

delete named_tiles;