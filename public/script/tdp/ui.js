TDP.UI = {

  init: function() {
    this.main = $('div#TDP');
    
    this.init_markup();
    TDP.status_bar.init();

  },
  
  init_markup: function() {
    this.status_bar = $('<div>');
    this.status_bar.attr('id', 'TDP_status_bar');
    this.main.append(this.status_bar);

    this.main.append('<br clear="both"/>');

    this.board = $('<div>');
    this.board.attr('id', 'TDP_board');
    this.main.append(this.board);
    
    this.readout = $('<div>');
    this.readout.attr('id', 'TDP_readout');
    this.main.append(this.readout);

  }
  
};