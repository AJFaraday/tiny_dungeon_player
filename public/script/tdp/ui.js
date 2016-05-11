TDP.UI = {

  init: function () {
    this.main = $('div#TDP');

    this.initMarkup();

    TDP.status_bar.init();
    TDP.end_game_panel.init();
  },

  buildStatusBar: function () {
    this.status_bar = $('<div>');
    this.status_bar.attr('id', 'TDP_status_bar');
    this.main.append(this.status_bar);
  },

  buildControlBar: function () {
    var button;
    this.control_bar = $('<div>');
    this.control_bar.attr('id', 'TDP_control_bar');

    $.each(
      TDP.data.buttons,
      function (i, button_data) {
        button = $('<span>');
        button.addClass('TDP_control_bar_button');
        button.html(button_data.icon);
        button.attr('title', button_data.tooltip);
        button.on('click', function(e){
          TDP.player[button_data.action]();
        });
        TDP.UI.control_bar.append(button);
      }
    );

    this.main.append(this.control_bar);
  },

  buildBoard: function () {
    this.board = $('<div>');
    this.board.attr('id', 'TDP_board');
    this.main.append(this.board);
  },

  buildReadout: function () {
    this.readout = $('<div>');
    this.readout.attr('id', 'TDP_readout');
    this.main.append(this.readout);
  },

  buildEndGameButton: function (label, url, id, button_panel) {
    var button = $('<div/>');
    button.addClass('TDP_end_game_button');
    button.html(label);

    var link = $('<a/>');
    link.addClass('TDP_end_game_button');
    link.attr('href', url);
    link.attr('id', id);

    link.append(button);
    button_panel.append(link);
    return button;
  },

  buildEndGameOverlay: function () {
    this.overlay = $('<div/>');
    this.overlay.attr('id', 'TDP_end_game');

    this.end_game_title = $('<h1/>');
    this.end_game_title.addClass('TDP_end_game_title');
    this.overlay.append(this.end_game_title);

    var button_panel = $('<div/>');
    button_panel.addClass('TDP_end_game_button_panel');
    this.overlay.append(button_panel);

    this.buildEndGameButton('Back', '#', 'back_button', button_panel);
    this.buildEndGameButton('Restart', '#', 'restart_button', button_panel);
    this.buildEndGameButton('Next', '#', 'next_button', button_panel);

    this.main.append(this.overlay);
  },

  initMarkup: function () {
    this.buildStatusBar();
    this.buildControlBar();

    this.main.append('<br clear="both"/>');
    this.buildBoard();
    this.buildReadout();
    this.buildEndGameOverlay();
  }

};

