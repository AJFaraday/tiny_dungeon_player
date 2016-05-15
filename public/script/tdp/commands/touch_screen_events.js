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
          action = TDP.commands.touchScreenEvents.event_mappings[event_name];
          $(document).off(
            event_name,
            '#TDP_board'
          );
          $(document).on(
            event_name,
            '#TDP_board',
            function(e){
              e.preventDefault();
              TDP.player[action]();
            }
          )
        }
      );
    }
  },

  onMobile: function() {
    return $.support.touch;
  }

};

