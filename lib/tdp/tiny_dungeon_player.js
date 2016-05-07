var TDP = {
  constructors: {},
  data: {},
  commands: {},
  
  init: function(tweet) {
    this.field = new TDP.constructors.Field(tweet);
    TDP.commands.keyEvents.init();
    TDP.UI.init();

    $.each(
      this.field.rows,
      function(i, row) {
        $.each(
          row,
          function(i, tile) {
            if (tile.type == 'player') {
              TDP.player = tile;
            }
          }
        );
      }
    );
  }
  
};


