QUnit.module('TDP.status_bar');

// All init has been done already, testing the result

QUnit.test(
  'should have health element',
  function (assert) {
    assert.equal(
      TDP.UI.status_bar.find('.TDP_sb_health').length,
      1,
      'should be exactly 1 health element'
    );

    assert.equal(
      TDP.status_bar.health_element[0],
      TDP.UI.status_bar.find('.TDP_sb_health')[0],
      'TDP.status_bar should know about it'
    );
  }
);

QUnit.test(
  'should have turns element',
  function (assert) {
    assert.equal(
      TDP.UI.status_bar.find('.TDP_sb_turns').length,
      1,
      'should be exactly 1 turns element'
    );

    assert.equal(
      TDP.status_bar.turns_element[0],
      TDP.UI.status_bar.find('.TDP_sb_turns')[0],
      'TDP.status_bar should know about it'
    );
  }
);

QUnit.test(
  'should have score element',
  function (assert) {
    assert.equal(
      TDP.UI.status_bar.find('.TDP_sb_score').length,
      1,
      'should be exactly 1 score element'
    );

    assert.equal(
      TDP.status_bar.score_element[0],
      TDP.UI.status_bar.find('.TDP_sb_score')[0],
      'TDP.status_bar should know about it'
    );
  }
);

QUnit.test(
  'set health',
  function (assert) {
    TDP.status_bar.set_health(20);
    assert.equal(
      TDP.status_bar.health_element.html(),
      'Health: 20',
      'should read out 20 health'
    );

    TDP.status_bar.set_health(10);
    assert.equal(
      TDP.status_bar.health_element.html(),
      'Health: 10',
      'should read out 10 health'
    );

    TDP.status_bar.set_health(0);
    assert.equal(
      TDP.status_bar.health_element.html(),
      '💀',
      'should show a dead emoji'
    );
  }
);

QUnit.test(
  'set turns',
  function (assert) {
    TDP.status_bar.set_turns(0);
    assert.equal(
      TDP.status_bar.turns_element.html(),
      '0 turns',
      'should show 0 turns'
    );

    TDP.status_bar.set_turns(1);
    assert.equal(
      TDP.status_bar.turns_element.html(),
      '1 turn',
      'should show 1 turn'
    );

    TDP.status_bar.set_turns(5);
    assert.equal(
      TDP.status_bar.turns_element.html(),
      '5 turns',
      'should show 5 turns'
    );
  }
);

QUnit.test(
  'set score',
  function (assert) {
    TDP.status_bar.set_score(0);
    assert.equal(
      TDP.status_bar.score_element.html(),
      'Score: 0',
      'should show 0 score'
    );

    TDP.status_bar.set_score(5);
    assert.equal(
      TDP.status_bar.score_element.html(),
      'Score: 5',
      'should show 5 score'
    );
  }
);

