QUnit.module('TDP.constructors.Tile monument tile');

var monument_tile = TDP.field.tileAt(12, 8);

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

QUnit.test(
  'the user should find a special attack there',
  function(assert) {
    var player_tile = TDP.player;
    player_tile.special_attacks= 0;

    TDP.UI.readout.html('');
    // first time, you find a special attack
    monument_tile.interaction(monument_tile, player_tile);
    assert.equal(
      player_tile.special_attacks,
      1,
      'should have given the player a special attack'
    );

    var major_message = "Hey look! It's a " + monument_tile.source;
    var minor_message = 'You found a special attack!';
    assert.ok(
      TDP.UI.readout.html().indexOf(major_message) >= 0,
      'should say the Hey Look thing.'
    );
    assert.ok(
      TDP.UI.readout.html().indexOf(minor_message) >= 0,
      'should give you the good news.'
    );

    // second time, it's spent
    monument_tile.interaction(monument_tile, player_tile);
    assert.equal(
      player_tile.special_attacks,
      1,
      'should have given the player a special attack'
    );

    major_message = "Yaaaaawn, that " + monument_tile.source + ' again.';
    minor_message = "You've already searched this " + monument_tile.source;
    assert.ok(
      TDP.UI.readout.html().indexOf(major_message) >= 0,
      'should say the Yaaawn thing.'
    );
    assert.ok(
      TDP.UI.readout.html().indexOf(minor_message) >= 0,
      "should tell you it's a return visit."
    );

    // trying another monument
    monument_tile.found = false;
    monument_tile.interaction(monument_tile, player_tile);

    assert.equal(
      player_tile.special_attacks,
      2,
      'should have given the player another special attack'
    );

    var major_message = "Hey look! It's a " + monument_tile.source;
    var minor_message = "You found another special attack! Now you've got 2";
    assert.ok(
      TDP.UI.readout.html().indexOf(major_message) >= 0,
      'should say the Hey Look thing.'
    );
    assert.ok(
      TDP.UI.readout.html().indexOf(minor_message) >= 0,
      'should give you the good news.'
    );

  }
);



