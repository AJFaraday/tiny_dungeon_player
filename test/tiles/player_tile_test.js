QUnit.module('TDP.constructors.Tile player tile');

QUnit.test(
  'should hold on to its source emoji',
  function (assert) {
    assert.equal(
      TestData.player_tile.source,
      TDP.data.named_tiles.worried,
      ('wall tile source should be ' + TDP.data.named_tiles.worried)
    );
  }
);

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
    player_tile.moveUp()
    assert.equal(
      player_tile.position(),
      [7, 7],
      'should move up 1 space when moveUp is called'
    );
    player_tile.moveDown();
  }
);

QUnit.test(
  'should be able to move down',
  function (assert) {
    // the one on the grid
    var player_tile = TDP.field.tileAt(7, 8);
    player_tile.moveDown()
    assert.equal(
      player_tile.position(),
      [7, 9],
      'should move up 1 space when moveDown is called'
    );
    player_tile.moveUp();
  }
);

QUnit.test(
  'should be able to move right',
  function (assert) {
    // the one on the grid
    var player_tile = TDP.field.tileAt(7, 8);
    player_tile.moveRight()
    assert.equal(
      player_tile.position(),
      [8, 8],
      'should move up 1 space when moveRight is called'
    );
    player_tile.moveLeft();
  }
);

QUnit.test(
  'should be able to move left',
  function (assert) {
    // the one on the grid
    var player_tile = TDP.field.tileAt(7, 8);
    player_tile.moveLeft()
    assert.equal(
      player_tile.position(),
      [6, 8],
      'should move up 1 space when moveLeft is called'
    );
    player_tile.moveRight();
  }
);

