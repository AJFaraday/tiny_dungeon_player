TDP.commands.touchScreenEvents = {

  event_mappings: {
    'swiperight': 'moveRight',
    'swipeleft': 'moveLeft',
    'swipedown': 'moveDown',
    'swipeup': 'moveUp'//,
    //'taphold': 'specialAttack'
  },

  init: function () {
    if (this.onMobile()) {
      $.each(
        Object.keys(this.event_mappings),
        function (i, event_name) {
          var action_name = TDP.commands.touchScreenEvents.event_mappings[event_name];
          $(document).on(
            event_name,
            '.TDP_board_inner, #TDP_readout',
            function (e) {
              e.preventDefault();
              TDP.player[action_name]();
              TDP.commands.touchScreenEvents.suppressSpecial=true;
              setTimeout(
                function(){
                  TDP.commands.touchScreenEvents.suppressSpecial=false;
                },
                1000
              )
            }
          );
        }
      );
      $(document).on(
        'taphold',
        '.TDP_board_inner, #TDP_readout',
        function (e) {
          e.preventDefault();
          if (!TDP.commands.touchScreenEvents.suppressSpecial) {
            TDP.player.specialAttack();
          }
        }
      );

      $.event.special.tap.tapholdThreshold = 1000;
    }
  },

  onMobile: function () {
    return $.support.touch;
  }

};

