QUnit.module('TDP.constructors.Tile door tile');

var door_tile = TestData.door_tile;

QUnit.test(
  'should hold on to its source emoji',
  function (assert) {
    assert.equal(
      door_tile.source,
      TDP.data.named_tiles.door,
      ('wall tile source should be ' + TDP.data.named_tiles.wall)
    );
  }
);

QUnit.test(
  'should have a type of "door"',
  function (assert) {
    assert.equal(door_tile.type, 'door', 'tile type should be door');
    assert.ok(door_tile.is('door'), 'is function should return true');
    assert.notOk(door_tile.is('car'), 'is function should return false (when type is wrong)');
  }
);

QUnit.test(
  'should be passable',
  function (assert) {
    assert.notOk(door_tile.impassable, 'should be impassable');
    assert.ok(door_tile.passable, 'should not be passable');
  }
);

QUnit.test(
  'should not have an interaction',
  function (assert) {
    assert.notOk(door_tile.hasInteraction, 'should not have an interaction');
  }
);
