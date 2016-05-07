QUnit.module('TDP.constructors.Tile floor tile');

var monster_tile = TestData.monster_tile;

QUnit.test(
  'should hold on to its source emoji',
  function (assert) {
    assert.equal(
      monster_tile.source,
      TDP.data.named_tiles.monster,
      ('wall tile source should be ' + TDP.data.named_tiles.wall)
    );
  }
);

QUnit.test(
  'should have a type of "monster"',
  function (assert) {
    assert.equal(monster_tile.type, 'monster', 'tile type should be monster');
    assert.ok(monster_tile.is('monster'), 'is function should return true');
    assert.notOk(monster_tile.is('car'), 'is function should return false (when type is wrong)');
  }
);

QUnit.test(
  'should be passable',
  function (assert) {
    assert.notOk(monster_tile.impassable, 'should be impassable');
    assert.ok(monster_tile.passable, 'should not be passable');
  }
);

QUnit.test(
  'should have an interaction',
  function (assert) {
    assert.ok(TestData.floor_tile.hasInteraction, 'should have an interaction');
  }
);

QUnit.test(
  'should have a function as its interaction',
  function (assert) {
    assert.ok(
      jQuery.isFunction(monster_tile.interaction),
      'should have an interaction'
    );
  }
);
