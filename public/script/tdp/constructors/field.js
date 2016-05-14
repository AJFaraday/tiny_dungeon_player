// Source - The contents of a tiny dungeons tweet
TDP.constructors.Field = function (source) {

  var field = this;

  this.class = 'Field';
  this.source = source;

  this.rows = [];
  var ignore_flag = false;
  $.each(this.source.split("\n"),
    function (i, source_row) {
      var row = [];
      $.each(source_row.split(''),
        function (i, source_emoji) {
          if (!ignore_flag) {
            if (TDP.utils.reverse(TDP.data.named_tiles)[source_emoji]) {
              row = row.concat(new TDP.constructors.Tile(source_emoji));
            } else {
              row = row.concat(new TDP.constructors.Tile(source_emoji + source_row[i + 1]));
              ignore_flag = true;
            }
          } else {
            ignore_flag = false;
          }
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
    var row = this.rows[y];
    if (row) {
      return row[x];
    }
  };

  this.positionOf = function (tile) {
    var field = this,
      position = null;
    $.each(
      field.rows,
      function (i, row) {
        if (row.indexOf(tile) >= 0) {
          position = [row.indexOf(tile), i];
        }
      }
    );

    if (position == null) {
      throw("Tile not in grid: " + tile.type)
    } else {
      return position
    }
  };

  this.replaceTile = function (tile, x, y) {
    this.rows[y][x] = tile;
  };

  this.drawBoard = function () {
    var content = $('<div>');
    content.addClass('TDP_board_inner');
    $.each(
      this.rows,
      function (i, row) {
        content.append(field.drawRow(row));
        content.append($('<br clear="both"/>'));
      }
    );
    TDP.UI.board.html(content);
    return content;
  };

  this.drawRow = function (row) {
    var html_row = $('<div>');
    html_row.addClass('TDP_board_row');
    $.each(
      row,
      function (i, tile) {
        html_row.append(field.drawTile(tile));
      }
    );
    return html_row;
  };

  this.drawTile = function (tile) {
    var html_tile = $('<div>');
    html_tile.addClass('TDP_board_tile');
    html_tile.html(TDP.emoji.get(tile.source));

    var overlay = $('<div/>');
    overlay.addClass('TDP_board_tile_overlay');

    html_tile.append(overlay);

    return html_tile
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
