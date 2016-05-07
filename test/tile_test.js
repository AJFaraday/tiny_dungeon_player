QUnit.module('TDP.constructors.Tile');

QUnit.test(
  "should know it's position",
  function (assert) {
    var tile = TDP.field.tileAt(1,2);
    assert.equal(
      tile.position().toString(),
      [1, 2].toString(),
      'the position should be the same as the co-ords to retrieve it'
    )
  }
);

QUnit.test(
  'should know its northwards neighbour',
  function(assert) {
    var tile = TDP.field.tileAt(4,4);
    assert.equal(
      tile.neighbourUp(),
      TDP.field.tileAt(4, 3),
      'should have grabbed the tile at 4, 3'
    );
  }
);

QUnit.test(
  "should know it doesn't have a northwards neighbour",
  function(assert) {
    var tile = TDP.field.tileAt(4,0);
    assert.equal(
      tile.neighbourUp(),
      undefined
    );
  }
);

QUnit.test(
  'should know its southwards neighbour',
  function(assert) {
    var tile = TDP.field.tileAt(4, 4);
    assert.equal(
      tile.neighbourDown(),
      TDP.field.tileAt(4, 5),
      'should have grabbed the tile at 4, 5'
    );
  }
);

QUnit.test(
  "should know it doesn't have a southwards neighbour",
  function(assert) {
    var tile = TDP.field.tileAt(4, 9);
    assert.equal(
      tile.neighbourDown(),
      undefined
    );
  }
);

QUnit.test(
  'should know its westwards neighbour',
  function(assert) {
    var tile = TDP.field.tileAt(4,4);
    assert.equal(
      tile.neighbourLeft(),
      TDP.field.tileAt(3, 4),
      'should have grabbed the tile at 3, 4'
    );
  }
);

QUnit.test(
  "should know it doesn't have a westhwards neighbour",
  function(assert) {
    var tile = TDP.field.tileAt(0,4);
    assert.equal(
      tile.neighbourLeft(),
      undefined
    );
  }
);

QUnit.test(
  'should know its eastwards neighbour',
  function(assert) {
    var tile = TDP.field.tileAt(4,4);
    assert.equal(
      tile.neighbourRight(),
      TDP.field.tileAt(5, 4),
      'should have grabbed the tile at 5, 4'
    );
  }
);

QUnit.test(
  "should know it doesn't have a eastwards neighbour",
  function(assert) {
    var tile = TDP.field.tileAt(12,4);
    assert.equal(
      tile.neighbourRight(),
      undefined
    );
  }
);

