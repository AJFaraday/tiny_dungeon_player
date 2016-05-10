QUnit.module('TDP.constructors.Tile player tile');

QUnit.test(
  'should have a type of "player"',
  function (assert) {
    assert.equal(TestData.player_tile.type, 'player', 'tile type should be player');
    assert.ok(TestData.player_tile.is('player'), 'is function should return true');
    assert.notOk(TestData.player_tile.is('door'), 'is function should return false (when type is wrong)');
  }
);

QUnit.test(
  'should be passable',
  function (assert) {
    assert.notOk(TestData.player_tile.impassable, 'should be impassable');
    assert.ok(TestData.player_tile.passable, 'should not be passable');
  }
);

QUnit.test(
  'should not have an interaction',
  function (assert) {
    assert.notOk(TestData.player_tile.hasInteraction, 'should not have an interaction');
  }
);

QUnit.test(
  'should have some movement function',
  function (assert) {
    assert.ok($.isFunction(TestData.player_tile.moveUp), 'should have moveUp function');
    assert.ok($.isFunction(TestData.player_tile.moveDown), 'should have moveDown function');
    assert.ok($.isFunction(TestData.player_tile.moveRight), 'should have moveRight function');
    assert.ok($.isFunction(TestData.player_tile.moveLeft), 'should have moveLeft function');
    assert.ok($.isFunction(TestData.player_tile.specialAttack), 'should have specialAttack function');
  }
);

QUnit.test(
  'should be able to move up',
  function (assert) {
    // the one on the grid
    var player_tile = TDP.field.tileAt(7, 8);
    var turns = TDP.turns;
    player_tile.moveUp();
    assert.equal(
      player_tile.position().toString(),
      [7, 7].toString(),
      'should move up 1 space when moveUp is called'
    );
    assert.equal(TDP.turns, turns + 1, 'should be on the next turn');
    player_tile.moveDown();
  }
);

QUnit.test(
  'should be able to move down',
  function (assert) {
    // the one on the grid
    var player_tile = TDP.field.tileAt(7, 8);
    var turns = TDP.turns;
    player_tile.moveDown();
    assert.equal(
      player_tile.position().toString(),
      [7, 9].toString(),
      'should move up 1 space when moveDown is called'
    );
    assert.equal(TDP.turns, turns + 1, 'should be on the next turn');
    player_tile.moveUp();
  }
);

QUnit.test(
  'should be able to move right',
  function (assert) {
    // the one on the grid
    var player_tile = TDP.field.tileAt(7, 8);
    var turns = TDP.turns;
    player_tile.moveRight();
    assert.equal(
      player_tile.position().toString(),
      [8, 8].toString(),
      'should move up 1 space when moveRight is called'
    );
    assert.equal(TDP.turns, turns + 1, 'should be on the next turn');
    player_tile.moveLeft();
  }
);

QUnit.test(
  'should be able to move left',
  function (assert) {
    // the one on the grid
    var player_tile = TDP.field.tileAt(7, 8);
    var turns = TDP.turns;
    player_tile.moveLeft();
    assert.equal(
      player_tile.position().toString(),
      [6, 8].toString(),
      'should move up 1 space when moveLeft is called'
    );
    assert.equal(TDP.turns, turns + 1, 'should be on the next turn');
    player_tile.moveRight();
  }
);

QUnit.test(
  "should know if it's alive or dead",
  function(assert) {
    TDP.set_health(10);
    assert.ok(
      TestData.player_tile.isAlive(),
      "should know it's alive"
    );
    assert.notOk(
      TestData.player_tile.isDead(),
      "should know it's not dead"
    );

    TDP.set_health(0);
    assert.notOk(
      TestData.player_tile.isAlive(),
      "should know it's not alive"
    );
    assert.ok(
      TestData.player_tile.isDead(),
      "should know it's dead"
    );
  }
);

QUnit.test(
  'should not move if it is dead',
  function(assert) {
    var player_tile = TDP.field.tileAt(7, 8);
    TDP.set_health(0);
    assert.equal(
      player_tile.position().toString(),
      [7, 8].toString(),
      'should not have gone anywhere'
    );
    TDP.set_health(10)
  }
);

QUnit.test(
  'should have a special attack',
  function(assert) {
    TDP.fieldInit(TestData.source);

    // first. nowhere near the monsters.
    TDP.player.special_attacks = 1;
    TDP.player.moveTo(8, 8);
    TDP.UI.readout.html('');
    TDP.player.specialAttack();
    var major_message = "Wow! Look at that!";
    var minor_message = "You missed all the monsters, tho.";
    assert.ok(
      TDP.UI.readout.html().indexOf(major_message) >= 0,
      'should say the Wow thing.'
    );
    assert.ok(
      TDP.UI.readout.html().indexOf(minor_message) >= 0,
      'should tell you about the miss.'
    );

    // Now, in range of one monster
    TDP.player.special_attacks = 1;
    TDP.player.moveTo(6, 6);
    TDP.UI.readout.html('');
    TDP.player.specialAttack();
    major_message = "Wow! Look at that!";
    minor_message = "It engulfed the 👻";
    assert.ok(
      TDP.UI.readout.html().indexOf(major_message) >= 0,
      'should say the Wow thing.'
    );
    assert.ok(
      TDP.UI.readout.html().indexOf(minor_message) >= 0,
      'should tell you who it hit.'
    );

    // Now, in range of four of them
    TDP.fieldInit(TestData.source);
    TDP.player.special_attacks = 1;
    TDP.player.moveTo(2, 6);
    TDP.UI.readout.html('');
    TDP.player.specialAttack();
    major_message = "Wow! Look at that!";
    minor_message = "It engulfed all these monsters 👻, 🐘, 🐘, 👻";
    console.log(TDP.UI.readout.html());
    assert.ok(
      TDP.UI.readout.html().indexOf(major_message) >= 0,
      'should say the Wow thing.'
    );
    assert.ok(
      TDP.UI.readout.html().indexOf(minor_message) >= 0,
      'should tell you who it hit.'
    );

  }
);

