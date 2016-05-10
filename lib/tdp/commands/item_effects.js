TDP.commands.item_effects = {

  weapon: function (item, player) {
    player.damage += 1;
    TDP.console.log(
      "You picked up the " + item.source,
      "You'll now cause " + player.damage + " damage."
    );
  },

  clothing: function (item, player) {
    var adjectives = ['warm','colourful','shiny','pretty','scratchy'];
    var adjective = adjectives[Math.floor(Math.random()*adjectives.length)];
    TDP.console.log(
      "You put on the " + item.source,
      "It's really " + adjective + '!'
    );
  },

  default: function (item, player) {
    TDP.console.log(
      "You picked up the " + item.source,
      'You scored ' + item.score_value + ' points.'
    );
  }

};