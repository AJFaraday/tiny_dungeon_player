TDP.commands.touchScreenEvents = {

  event_mappings: {
    'swiperight': 'moveRight',
    'swipeleft': 'moveLeft',
    'swipedown': 'moveDown',
    'swipeup': 'moveUp',
    'tap': 'specialAttack'
  },

  init: function() {
    var action;
    if (this.onMobile()) {
      $.each(
        Object.keys(this.event_mappings),
        function(i, event_name) {
          action = this.event_mappings[event_name];
          TDP.UI.board.off(event_name);
          TDP.UI.board.on(
            event_name,
            function(e){
              e.preventDefault();
              TDP.player[action]();
            }
          )
        }
      )
    }
  },

  onMobile: function() {
    return $.support.touch;
  }

};

