TDP.end_game_panel = {

  init: function() {
    this.initButton('back_button', function(){});
    this.initButton('restart_button', this.restartFunction);
    this.initButton('next_button', function(){});
  },

  initButton: function(id, func) {
    var button = $('a#' + id);
    button.off('click');
    button.on(
      'click',
      function(e) {
        e.preventDefault();
        func();
      }
    )
  },

  restartFunction: function() {
    console.log('restarting');
    TDP.restart();
    TDP.UI.overlay.hide();
  },
  
  setTitle: function(title) {
    TDP.UI.end_game_title.html(title);
  },
  
  show: function() {
    TDP.UI.overlay.show();
  },
  
  hide: function() {
    TDP.UI.overlay.hide();
  }

};