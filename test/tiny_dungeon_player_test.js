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
  'should know about its monsters',
  function (assert) {
    assert.ok(TDP.monsters, 'should have an array of monsters');
    assert.equal(
      TDP.monsters[0].type,
      'monster',
      'should have at least one monster'
    )
  }
);

QUnit.test(
  'should have links to UI elements',
  function (assert) {
    assert.ok(TDP.UI.board);
    assert.ok(TDP.UI.readout);
  }
);

QUnit.test(
  'should be able to set the score',
  function (assert) {
    TDP.setScore(10);
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
  function (assert) {
    TDP.setTurns(5);
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

    TDP.setTurns(1);
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
  function (assert) {
    TDP.setHealth(10);
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

    TDP.setHealth(0);
    assert.equal(
      TDP.health,
      0,
      'it should hold the health.'
    );
    assert.equal(
      TDP.status_bar.health_element.html(),
      '💀',
      'it should show dead face.'
    );
    TDP.setHealth(10);
  }
);

QUnit.test(
  "should know when you've won",
  function (assert) {
    TDP.monsters = [];
    assert.ok(TDP.finished(), "it knows the game is over");
    assert.ok(TDP.won(), "it knows the player has won");
    assert.notOk(TDP.lost(), "it knows the player has not lost");

    TDP.fieldInit(TestData.source);
  }
);

QUnit.test(
  "should know when you've lost",
  function (assert) {
    TDP.setHealth(0);

    assert.ok(TDP.finished(), "it knows the game is over");
    assert.ok(TDP.lost(), "it knows the player has lost");
    assert.notOk(TDP.won(), "it knows the player has not won");

    TDP.setHealth(10);
  }
);

