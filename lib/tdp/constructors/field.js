// Source - The contents of a tiny dungeons tweet
TDP.constructors.Field = function (source) {

  var field = this;

  this.class = 'Field';
  this.source = source;

  this.rows = [];


  $.each(this.source.split("\n"),
    function (i, source_row) {
      var row = [];
      $.each(source_row.split(''),
        function (i, source_emoji) {
          //if (TDP.utils.reverse(TDP.data.named_tiles)[source_emoji]) {
            row = row.concat(new TDP.constructors.Tile(source_emoji));
          //}
        }
      );
      if (row.length > 0) {
        field.rows = field.rows.concat([row]);
      }
    }
  );

  this.height = this.rows.length;
  this.width = this.rows[0].length;

  this.tileAt = function (x, y) {
    return this.rows[x][y];
  };

  this.positionOf = function (tile) {
    var field = this,
      position = null;
    $.each(
      field.rows,
      function (i, row) {
        if (row.indexOf(tile) >= 0) {
          position = [i, row.indexOf(tile)];
        }
      }
    );

    if (position == null) {
      throw("Tile not in grid")
    } else {
      return position
    }
  };

  this.addTile = function (tile, x, y) {
    this.rows[x][y] = tile;
  };

  // Just for debugging purposes
  // TODO perhaps get rid of this when it's displaying in the UI
  this.display = function () {
    var output = '';
    $.each(
      this.rows,
      function (i, row) {
        $.each(
          row,
          function (i, tile) {
            output = output.concat(tile.source);
          }
        );
        output = output.concat("\n");
      }
    );
    console.log(output);
  };

};
