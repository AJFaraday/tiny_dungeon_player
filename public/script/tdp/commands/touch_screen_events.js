TDP.commands.touchScreenEvents = {

  event_mappings: {
    'swiperight': 'moveRight',
    'swipeleft': 'moveLeft',
    'swipedown': 'moveDown',
    'swipeup': 'moveUp',
    'tap': 'specialAttack'
  },

  init: function () {
    if (this.onMobile()) {
      $.each(
        Object.keys(this.event_mappings),
        function (i, event_name) {
          var action_name = TDP.commands.touchScreenEvents.event_mappings[event_name];
          console.log(event_name);
          console.log(action_name);
          $(document).on(
            event_name,
            'body',
            function (e) {
              e.preventDefault();
              TDP.player[action_name]();
            }
          );
        }
      );
    }
  },

  onMobile: function () {
    return $.support.touch;
  }

};

