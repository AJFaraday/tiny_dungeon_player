TestData = {


  // this displays awfully here...
  // from https://twitter.com/TinyDungeons/status/728622670582001665
  source: "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n" +
         "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n" +
         "⬛⬛⬛⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛\n" +
         "⬛⬛⬛⬜⬜🍕⬜⬜⬜⬛⬛⬛⬛\n" +
         "⬛⬛⬛⬛🏾⬛⬛🏾⬛⬛⬛⬛⬛\n" +
         "⬜⬜👻⬜🐘⬛⬛🏾⬛⬛⬛⬛⬛\n" +
         "🐘🐘⬜⬜👻🏾🏾⬜⬜⬜⬛⬛⬛\n" +
         "⬜⬜⬜⬜⬜🏾🏾🏾🏾🏾🏾⬜⬜\n" +
         "⬛⬛⬛⬛⬛⬛⬛🤔⬜⬜⬛⬜⬜\n" +
         "⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜🏾⬜⬜\n",

    wall_tile: new TDP.constructors.Tile(TDP.data.named_tiles.wall),
    floor_tile: new TDP.constructors.Tile(TDP.data.named_tiles.floor),
    door_tile: new TDP.constructors.Tile(TDP.data.named_tiles.door),
    player_tile:new TDP.constructors.Tile(TDP.data.named_tiles.worried),
    food_tile:new TDP.constructors.Tile(TDP.data.named_tiles.cheese),
    item_tile:new TDP.constructors.Tile(TDP.data.named_tiles.book),
    monuments_tile:new TDP.constructors.Tile(TDP.data.named_tiles.statue),
    monster_tile:new TDP.constructors.Tile(TDP.data.named_tiles.ogre),

}
;

TDP.init(TestData.source);
