QUnit.module('TDP.constructors.Field');

var field = new TDP.constructors.Field(TestData.source);

QUnit.test(
  'should store source text',
  function( assert ) {
    assert.equal(
      field.source,
      TestData.source,
      'field should know its source text'
    );
  }
);


QUnit.test(
  'should have width',
  function( assert ) {
    assert.equal(
      field.width,
      13,
      'all tiny dungeons are 13 characters wide'
    );
  }
);

QUnit.test(
  'should have height',
  function( assert ) {
    assert.equal(
      field.height,
      10,
      'all tiny dungeons are 10 characters high'
    );
  }
);

QUnit.test(
  'should be able to retrieve inpassible space at 0, 0',
  function( assert ) {
    var space = field.tileAt(0, 0);
    assert.ok(space, 'there should be a tile at 0, 0');
    assert.notOk(space.passable, 'tile at 0, 0 should not be passable');
    assert.ok(space.impassable, 'tile at 0, 0 should be impassable');

    assert.notOk(space.hasInteraction, 'tile at 0, 0 should not have an interaction');

    assert.ok(space.is('wall'), 'tile should be a floor');
  }
);

QUnit.test(
  'should be able to retrieve passible space at 3, 3',
  function( assert ) {
    var space = field.tileAt(3, 3);

    assert.ok(space, 'there should be a tile at 3, 3');
    assert.ok(space.passable, 'tile at 3, 3 should be passable');
    assert.notOk(space.impassable, 'tile at 3, 3 should not be impassable');

    assert.notOk(space.hasInteraction, 'tile at 3, 3 should not have an interaction');

    assert.ok(space.is('floor'), 'tile should be a floor');
  }
);

QUnit.test(
  'should be able to retrieve door at 4, 4',
  function( assert ) {
    var space = field.tileAt(4, 4);
    console.log(space.type);
    assert.ok(space, 'there should be a tile at 4, 4');
    assert.notOk(space.passable, 'tile at 4, 4 should be passable');
    assert.ok(space.impassable, 'tile at 4, 4 should not be impassable');

    assert.ok(space.hasInteraction, 'tile at 4, 4 should not have an interaction');

    assert.ok(space.is('door'), 'tile should be a door');
  }
);


QUnit.test(
  'should be able to retrieve player at at 7, 8',
  function( assert ) {
    var space = field.tileAt(7, 8);
    assert.ok(space, 'there should be a tile at 7, 8');

    assert.ok(space.is('player'), 'tile should be a player');
  }
);





