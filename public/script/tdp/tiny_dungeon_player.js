var TDP = {
  constructors: {},
  data: {},
  commands: {},
  tile_components: {},

  init: function (tweet) {
    TDP.commands.keyEvents.init();
    TDP.commands.touchScreenEvents.init();
    TDP.UI.init();
    this.initialised = true;
    this.fieldInit(tweet);
  },

  pageInit: function () {
    var url_analyis = /.*\/([0-9]+)$/.exec(window.location.href);
    var url;
    if (url_analyis && url_analyis[1]) {
      url = '/tweet/' + url_analyis[1]
    } else {
      url = '/tweet/latest';
    }
    $.get(
      url,
      function (response) {
        TDP.initFromApi(response);
      },
      'json'
    );
  },

  initFromApi: function (response) {
    if (this.initialised) {
      TDP.fieldInit(response.tweet);
    } else {
      TDP.init(response.tweet);
    }
    delete response['tweet'];
    TDP.data.fromAPI = response;
    TDP.console.clear();
    TDP.field.drawBoard();
    TDP.end_game_panel.hide();
  },

  startFromSource: function (tweet) {
    this.fieldInit(tweet);
    this.UI.readout.html('');
    this.field.drawBoard();
  },

  restart: function () {
    TDP.startFromSource(TDP.source);
  },

  fieldInit: function (tweet) {
    this.source = tweet;
    this.field = new TDP.constructors.Field(tweet);
    this.getPlayer();
    this.getMonsters();
    this.setHealth(this.health);
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
    this.endIfFinished();
  },

  endIfFinished: function () {
    var panel = TDP.end_game_panel;
    if (this.won()) {
      panel.setTitle('You won!');
      panel.show();
    } else if (this.lost()) {
      panel.setTitle('You lost!');
      panel.show();
    }
  },

  changeScore: function (points) {
    this.setScore(this.score + points);
  },

  setScore: function (score) {
    this.score = score;
    TDP.status_bar.setScore(score)
  },


  lost: function () {
    return TDP.player.isDead();
  },

  won: function () {
    return (TDP.monsters.length == 0);
  },

  finished: function () {
    return (this.lost() || this.won());
  }

};


