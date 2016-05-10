var TDP = {
  constructors: {},
  data: {},
  commands: {},
  tile_components: {},

  init: function (tweet) {
    TDP.commands.keyEvents.init();
    TDP.UI.init();
    this.fieldInit(tweet);
  },

  fieldInit: function (tweet) {
    this.field = new TDP.constructors.Field(tweet);
    this.getPlayer();
    this.getMonsters();
    this.set_health(10);
    this.set_turns(0);
    this.set_score(0);
  },

  getMonsters: function () {
    this.monsters = [];
    $.each(
      this.field.rows,
      function (i, row) {
        $.each(
          row,
          function (i, tile) {
            if (tile.type == 'monster') {
              TDP.monsters = TDP.monsters.concat(tile);
            }
          }
        )
      }
    )
  },

  getPlayer: function () {
    $.each(
      this.field.rows,
      function (i, row) {
        $.each(
          row,
          function (i, tile) {
            if (tile.type == 'player') {
              TDP.player = tile;
            }
          }
        );
      }
    );
  },

  set_health: function (health) {
    this.health = health;
    TDP.status_bar.set_health(health);
    if (health <= 0) {
      this.player.source = '💀';
      TDP.field.drawBoard();
    } else {
      this.player.resetEmoji();
    }
  },

  set_turns: function (turns) {
    this.turns = turns;
    TDP.status_bar.set_turns(turns)
  },

  new_turn: function () {
    this.set_turns(this.turns + 1);
    $.each(
      this.monsters,
      function (i, monster) {
        monster.turnAction();
      }
    );
    if ((this.turns % 5) == 0) {
      this.change_score(-1)
    }
    TDP.field.drawBoard();
  },

  change_score: function(points) {
    this.set_score(this.score + points);
  },

  set_score: function (score) {
    this.score = score;
    TDP.status_bar.set_score(score)
  }

};


