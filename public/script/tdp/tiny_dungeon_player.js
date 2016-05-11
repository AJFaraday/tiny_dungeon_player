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

  startFromSource: function (tweet) {
    this.fieldInit(tweet);
    this.UI.readout.html('');
    this.field.drawBoard();
  },

  restart: function() {
    this.startFromSource(this.source);
  },

  fieldInit: function (tweet) {
    this.source = tweet;
    this.field = new TDP.constructors.Field(tweet);
    this.getPlayer();
    this.getMonsters();
    this.setHealth(10);
    this.setTurns(0);
    this.setScore(0);
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

  setHealth: function (health) {
    this.health = health;
    TDP.status_bar.setHealth(health);
    if (health <= 0) {
      this.player.source = '💀';
      TDP.field.drawBoard();
    } else {
      this.player.resetEmoji();
    }
  },

  setTurns: function (turns) {
    this.turns = turns;
    TDP.status_bar.setTurns(turns)
  },

  newTurn: function () {
    this.setTurns(this.turns + 1);
    $.each(
      this.monsters,
      function (i, monster) {
        monster.turnAction();
      }
    );
    if ((this.turns % 5) == 0) {
      this.changeScore(-1)
    }
    TDP.field.drawBoard();
  },

  changeScore: function(points) {
    this.setScore(this.score + points);
  },

  setScore: function (score) {
    this.score = score;
    TDP.status_bar.setScore(score)
  },
  
  
  lost: function() {
    return TDP.player.isDead();
  },
  
  won: function() {
    return (TDP.monsters.length == 0);
  },
  
  finished: function() {
    return (this.lost() || this.won());
  }

};


