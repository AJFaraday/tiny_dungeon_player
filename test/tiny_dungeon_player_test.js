QUnit.module('tiny dungeon player (TDP)');

QUnit.test(
  'should have a field',
  function (assert) {
    assert.ok(TDP.field, 'should have a field');
    assert.equal(
      TDP.field.class,
      'Field',
      'it should have a class of Field'
    )
  }
);


QUnit.test(
  'should have a player',
  function (assert) {
    assert.ok(TDP.player, 'should know have a player');
    assert.equal(
      TDP.player.class,
      'Tile',
      'it should have a class of Tile'
    );
    assert.equal(
      TDP.player.type,
      'player',
      'it should have a type of player'
    );
  }
);

QUnit.test(
  'should have links to UI elements',
  function( assert ) {
    assert.ok(TDP.UI.board);
    assert.ok(TDP.UI.readout);
  }
);