TDP.status_bar = {

  init: function() {
    var status_bar = TDP.UI.status_bar;
    status_bar.append(this.init_health_element());
    status_bar.append(this.init_turns_element());
    status_bar.append(this.init_score_element());
  },

  set_health: function(health) {
    if (health <= 0) {
      this.health_element.html('😵');
    } else {
      this.health_element.html('Health: ' + health);
    }
  },
  
  set_turns: function(turns) {
    if (turns == 1) {
      this.turns_element.html('1 turn');
    } else {
      this.turns_element.html(turns + ' turns');
    }
  },
  
  set_score: function(score) {
    this.score_element.html('Score: ' + score);
  },
  
  
  init_health_element: function() {
    var element = $('<span>');
    element.addClass('TDP_sb_element');
    element.addClass('TDP_sb_health');
    element.html('init value');
    this.health_element = element;
    return element;
  },

  init_turns_element: function() {
    var element = $('<span>');
    element.addClass('TDP_sb_element');
    element.addClass('TDP_sb_turns');
    element.html('init value');
    this.turns_element = element;
    return element;
  },

  init_score_element: function() {
    var element = $('<span>');
    element.addClass('TDP_sb_element');
    element.addClass('TDP_sb_score');
    element.html('init value');
    this.score_element = element;
    return element;
  }

};