QUnit.module('TDP.constructors.Tile food tile');

var food_tile = TestData.food_tile;

QUnit.test(
  'should have a type of "food"',
  function (assert) {
    assert.equal(food_tile.type, 'food', 'tile type should be food');
    assert.ok(food_tile.is('food'), 'is function should return true');
    assert.notOk(food_tile.is('car'), 'is function should return false (when type is wrong)');
  }
);

QUnit.test(
  'should be not passable',
  function (assert) {
    assert.notOk(food_tile.impassable, 'should not be impassable');
    assert.ok(food_tile.passable, 'should be passable');
  }
);

QUnit.test(
  'should have an interaction',
  function (assert) {
    assert.ok(TestData.food_tile.hasInteraction, 'should have an interaction');
  }
);

QUnit.test(
  'should have a function as its interaction',
  function (assert) {
    assert.ok(
      jQuery.isFunction(food_tile.interaction),
      'should have an interaction'
    );
  }
);
