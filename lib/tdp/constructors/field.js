// Source - The contents of a tiny dungeons tweet
TDP.constructors.Field = function(source) {

  this.class = 'Field';
  this.source = source;

  this.rows = [];
  
  this.tileAt = function(x,y) {
    this.rows[x,y];
  };
  
  this.positionOF = function(tile) {
    // TODO Ridiculous amount of TODOing here TODO
    return [0, 0]
  };

  this.addTile = function(tile, x, y) {
    this.rows[x][y] = tile;
  };
  
  

};
