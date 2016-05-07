QUnit.module('TDP.constructors.Tile floor tile');

QUnit.test(
  'should hold on to its source emoji',
  function (assert) {
    assert.equal(
      TestData.floor_tile.source,
      TDP.data.named_tiles.floor,
      ('wall tile source should be ' + TDP.data.named_tiles.wall)
    );
  }
);

QUnit.test(
  'should have a type of "floor"',
  function (assert) {
    assert.equal(TestData.floor_tile.type, 'floor', 'tile type should be floor');
    assert.ok(TestData.floor_tile.is('floor'), 'is function should return true');
    assert.notOk(TestData.floor_tile.is('door'), 'is function should return false (when type is wrong)');
  }
);

QUnit.test(
  'should be passable',
  function (assert) {
    assert.notOk(TestData.floor_tile.impassable, 'should be impassable');
    assert.ok(TestData.floor_tile.passable, 'should not be passable');
  }
);

QUnit.test(
  'should not have an interaction',
  function (assert) {
    assert.notOk(TestData.floor_tile.hasInteraction, 'should not have an interaction');
  }
);


