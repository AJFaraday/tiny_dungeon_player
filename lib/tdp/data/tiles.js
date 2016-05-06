TDP.data.tiles = {

  /* all possible tiles at
   https://github.com/SwartzCr/tinydungeon/blob/master/_dungeon_helper.py

   "\U0001f423" > "\u{1f423}"

   * replace upper case U with lower case u
   * wrap the rest in curly braces { }
   * Remove leading zeros
   */
  named: {
    wall: "\u{2b1b}",
    floor: "\u{2b1c}",
    door: "\u{1f6aa}"
  },

  // These tiles are inert, and will not change
  background: [
    this.named.wall,
    this.named.floor
  ],
  
  // objects may act when a player steps on to them
  objects: [
    this.named.door
  ],
  
  // The emoji a player controls
  players: [
    
  ],

  // Creatures will attack the player
  creatures: [
    
  ]
  
  
}