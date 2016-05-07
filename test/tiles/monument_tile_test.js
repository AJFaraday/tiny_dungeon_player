QUnit.module('TDP.constructors.Tile monument tile');

var monument_tile = TestData.monument_tile;

QUnit.test(
  'should have a type of "monument"',
  function (assert) {
    assert.equal(monument_tile.type, 'monument', 'tile type should be monument');
    assert.ok(monument_tile.is('monument'), 'is function should return true');
    assert.notOk(monument_tile.is('car'), 'is function should return false (when type is wrong)');
  }
);

QUnit.test(
  'should be not passable',
  function (assert) {
    assert.ok(monument_tile.impassable, 'should be impassable');
    assert.notOk(monument_tile.passable, 'should not be passable');
  }
);

QUnit.test(
  'should have an interaction',
  function (assert) {
    assert.ok(TestData.monument_tile.hasInteraction, 'should have an interaction');
  }
);

QUnit.test(
  'should have a function as its interaction',
  function (assert) {
    assert.ok(
      jQuery.isFunction(monument_tile.interaction),
      'should have an interaction'
    );
  }
);
