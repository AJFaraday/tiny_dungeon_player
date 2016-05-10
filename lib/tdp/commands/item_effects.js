TDP.commands.item_effects = {

  default: function(item, player) {
    TDP.console.log(
      "You picked up the " + item.source,
      'You scored ' + item.score_value + ' points.'
    );
    TDP.set_score(TDP.score += item.score_value );
  }

};