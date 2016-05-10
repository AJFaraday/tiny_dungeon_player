QUnit.module('TDP.constructors.Tile item tile');

var item_tile = TestData.item_tile;

QUnit.test(
  'should have a type of "item"',
  function (assert) {
    assert.equal(item_tile.type, 'item', 'tile type should be item');
    assert.ok(item_tile.is('item'), 'is function should return true');
    assert.notOk(item_tile.is('car'), 'is function should return false (when type is wrong)');
  }
);

QUnit.test(
  'should be not passable',
  function (assert) {
    assert.notOk(item_tile.impassable, 'should not be impassable');
    assert.ok(item_tile.passable, 'should be passable');
  }
);

QUnit.test(
  'should have an interaction',
  function (assert) {
    assert.ok(TestData.item_tile.hasInteraction, 'should have an interaction');
  }
);

QUnit.test(
  'should have a function as its interaction',
  function (assert) {
    assert.ok(
      jQuery.isFunction(item_tile.interaction),
      'should have an interaction'
    );
  }
);

QUnit.test(
  'should run the deafult interaction, gain points.',
  function(assert) {
    var item = TDP.field.tileAt(12, 0);
    var starting_score = TDP.score;
    TDP.UI.readout.html('');
    item.interaction(item, TDP.player);
    assert.equal(
      TDP.score,
      starting_score + item.score_value,
      'should have increased the score'
    );

    var major_message = "You picked up the " + item.source;
    var minor_message = "You scored " + item.score_value + " points.";
    assert.ok(
      TDP.UI.readout.html().indexOf(major_message) >= 0,
      'should say the Wow thing.'
    );
    assert.ok(
      TDP.UI.readout.html().indexOf(minor_message) >= 0,
      'should tell you about the miss.'
    );

    TDP.fieldInit(TestData.source);
  }
);
