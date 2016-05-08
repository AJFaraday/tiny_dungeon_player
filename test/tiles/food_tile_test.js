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

QUnit.test(
  'should increase the players health by its heal value',
  function (assert) {
    var start_health = TDP.health;
    var food_tile = TDP.field.tileAt(5,3);
    var player_tile = TDP.field.tileAt(7,8);

    food_tile.interaction(food_tile, player_tile);

    assert.equal(
      TDP.health,
      (start_health + food_tile.heal_value),
      'should increase the health'
    );

    TDP.fieldInit(TestData.source);
  }  
);
