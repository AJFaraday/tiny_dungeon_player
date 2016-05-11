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
    this.main.append('<br clear="both"/>');
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

  buildButton: function (label, url, id, button_panel) {
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
    this.end_game_title.html('You won!'); // TODO systematically decide
    this.overlay.append(this.end_game_title);

    var button_panel = $('<div/>');
    button_panel.addClass('TDP_end_game_button_panel');
    this.overlay.append(button_panel);

    this.buildButton('Back', '#', 'back_button', button_panel);
    this.buildButton('Restart', '#', 'restart_button', button_panel);
    this.buildButton('Next', '#', 'next_button', button_panel);

    this.main.append(this.overlay);
  },

  initMarkup: function () {
    this.buildStatusBar();
    this.buildBoard();
    this.buildReadout();
    this.buildEndGameOverlay();
  }

};

