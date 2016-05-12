TDP.end_game_panel = {

  init: function() {
    this.initButton('back_button', this.backFunction);
    this.initButton('restart_button', this.restartFunction);
    this.initButton('next_button', this.nextFunction);
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
  
  nextFunction: function() {
    console.log('fetching next (earlier) tweet');
    $.get(
      '/tweet/next',
      TDP.data.fromAPI,
      function(response) {
        TDP.initFromApi(response);
      },
      'json'
    )
  },

  backFunction: function() {
    console.log('fetching previous (later) tweet');
    $.get(
      '/tweet/back',
      TDP.data.fromAPI,
      function(response) {
        TDP.initFromApi(response);
      },
      'json'
    ).fail(function(){
      TDP.console.log("You're on the first tweet!", "Try clicking 'Next'");
    });
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