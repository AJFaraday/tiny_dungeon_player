QUnit.module('tiny dungeon player (TDP)');

QUnit.test(
  'should have a field',
  function (assert) {
    assert.ok(TDP.field, 'should have a field');
    assert.equal(
      TDP.field.class,
      'Field',
      'it should have a class of Field'
    )
  }
);


QUnit.test(
  'should have a player',
  function (assert) {
    assert.ok(TDP.player, 'should know have a player');
    assert.equal(
      TDP.player.class,
      'Tile',
      'it should have a class of Tile'
    );
    assert.equal(
      TDP.player.type,
      'player',
      'it should have a type of player'
    );
  }
);

QUnit.test(
  'should have links to UI elements',
  function( assert ) {
    assert.ok(TDP.UI.board);
    assert.ok(TDP.UI.readout);
  }
);

QUnit.test(
  'should be able to set the score',
  function(assert) {
    TDP.set_score(10);
    assert.equal(
      TDP.score,
      10,
      'it should hold the score.'
    );
    assert.equal(
      TDP.status_bar.score_element.html(),
      'Score: 10',
      'it should show the score.'
    );
  }
);

QUnit.test(
  'should be able to set the turns',
  function(assert) {
    TDP.set_turns(5);
    assert.equal(
      TDP.turns,
      5,
      'it should hold the turns.'
    );
    assert.equal(
      TDP.status_bar.turns_element.html(),
      '5 turns',
      'it should show the turns.'
    );

    TDP.set_turns(1);
    assert.equal(
      TDP.turns,
      1,
      'it should hold the turns.'
    );
    assert.equal(
      TDP.status_bar.turns_element.html(),
      '1 turn',
      'it should show the turns.'
    );
  }
);

QUnit.test(
  'should be able to set the health',
  function(assert) {
    TDP.set_health(10);
    assert.equal(
      TDP.health,
      10,
      'it should hold the health.'
    );
    assert.equal(
      TDP.status_bar.health_element.html(),
      'Health: 10',
      'it should show the health.'
    );

    TDP.set_health(0);
    assert.equal(
      TDP.health,
      0,
      'it should hold the health.'
    );
    assert.equal(
      TDP.status_bar.health_element.html(),
      '😵',
      'it should show dead face.'
    );
    TDP.set_health(10);
  }
);

