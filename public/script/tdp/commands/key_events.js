TDP.commands.keyEvents = {

  // e.key in event definitions
  // mapped to the function in commands
  keys: {
    32: 'specialAttack',  // space
    38: 'moveUp',         // up arrow
    40: 'moveDown',       // down arrow
    37: 'moveLeft',       // guess these two
    39: 'moveRight'
  },

  init: function () {
    var keys = TDP.commands.keyEvents.keys;
    var actions = TDP.commands.keyEvents.actions;

    $(document).off('keydown');
    $(document).on(
      'keydown',
      function (e) {
        var action = keys[e.keyCode];
        if (action) {
          e.preventDefault();
          TDP.player[action]();
        }
      }
    )
  }

}
;
