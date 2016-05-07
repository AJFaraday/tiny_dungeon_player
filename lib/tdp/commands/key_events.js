TDP.commands.keyEvents = {

  // e.key in event definitions
  // mapped to the function in commands
  keys: {
    ' ': 'specialAttack',
    'ArrowUp': 'moveUp',
    'ArrowDown': 'moveDown',
    'ArrowLeft': 'moveLeft',
    'ArrowRight': 'moveRight'
  },

  init: function () {
    var keys = TDP.commands.keyEvents.keys;
    var actions = TDP.commands.keyEvents.actions;

    $(document).on(
      'keydown',
      function (e) {
        var action = keys[e.key];
        if (action) {
          e.preventDefault();
          TDP.player[action]();
        }
      }
    )
  }

}
;
