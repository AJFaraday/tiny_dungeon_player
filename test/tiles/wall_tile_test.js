QUnit.module('TDP.constructors.Tile wall tile');

QUnit.test(
  'should hold on to its source emoji',
  function (assert) {
    assert.equal(
      TestData.wall_tile.source,
      TDP.data.named_tiles.wall,
      ('wall tile source should be ' + TDP.data.named_tiles.wall)
    );
  }
);

QUnit.test(
  'should have a type of "wall"',
  function (assert) {
    assert.equal(TestData.wall_tile.type, 'wall', 'tile type should be wall');
    assert.ok(TestData.wall_tile.is('wall'), 'is function should return true');
    assert.notOk(TestData.wall_tile.is('passage'), 'is function should return false (when type is wrong)');
  }
);

QUnit.test(
  'should be impassable',
  function (assert) {
    assert.ok(TestData.wall_tile.impassable, 'should be impassable');
    assert.notOk(TestData.wall_tile.passable, 'should not be passable');
  }
);

QUnit.test(
  'should not have an interaction',
  function (assert) {
    assert.notOk(TestData.wall_tile.hasInteraction, 'should not have an interaction');
  }
);


