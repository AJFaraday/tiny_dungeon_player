QUnit.module('TDP.constructors.Field');

var field = new TDP.constructors.Field(TestData.source);

QUnit.test(
  'should store source text',
  function (assert) {
    assert.equal(
      field.source,
      TestData.source,
      'field should know its source text'
    );
  }
);


QUnit.test(
  'should have width',
  function (assert) {
    assert.equal(
      field.width,
      13,
      'all tiny dungeons are 13 characters wide'
    );
  }
);

QUnit.test(
  'should have height',
  function (assert) {
    assert.equal(
      field.height,
      10,
      'all tiny dungeons are 10 characters high'
    );
  }
);

QUnit.test(
  'should be able to retrieve inpassible space at 0, 0',
  function (assert) {
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
  function (assert) {
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
  function (assert) {
    var space = field.tileAt(4, 4);
    assert.equal(space.type, 'door', 'tile should be a door');
    assert.ok(space.is('door'), 'tile should be a door');

    assert.ok(space, 'there should be a tile at 4, 4');
    assert.ok(space.passable, 'tile at 4, 4 should be passable');
    assert.notOk(space.impassable, 'tile at 4, 4 should not be impassable');

    assert.notOk(space.hasInteraction, 'tile at 4, 4 should not have an interaction');
  }
);


QUnit.test(
  'should be able to retrieve player at at 7, 8',
  function (assert) {
    var space = field.tileAt(7, 8);

    assert.ok(space.is('player'), 'tile should be a player');
    assert.equal(space.type, 'player', 'tile should be a player');

    assert.ok(space, 'there should be a tile at 7, 8');

  }
);

QUnit.test(
  'should draw a single tile',
  function (assert) {
    var tile = field.tileAt(0, 0);
    var html_tile = field.drawTile(tile);
    assert.ok(html_tile, 'there should be a tile');
    assert.equal(
      html_tile.length,
      1,
      'it should be one DOM element'
    );
    assert.ok(
      html_tile.hasClass('TDP_board_tile'),
      'should have the expected HTML class'
    );
    assert.equal(
      html_tile.html(),
      tile.source,
      'should contain the emoji for that tile'
    );
  }
);

QUnit.test(
  'should draw a row of tiles',
  function (assert) {
    var row = field.rows[0];
    var html_row = field.drawRow(row);
    assert.ok(html_row, 'there should be a row');
    assert.equal(
      html_row.length,
      1,
      'it should be one DOM element'
    );
    assert.ok(
      html_row.hasClass('TDP_board_row'),
      'should have the expected HTML class'
    );
    assert.equal(
      html_row.children().length,
      13,
      'should have 13 children'
    );
  }
);

QUnit.test(
  'should draw a whole board',
  function (assert) {
    var html_board = field.drawBoard();
    assert.ok(html_board, 'there should be a board');
    assert.equal(
      html_board.length,
      1,
      'it should be one DOM element'
    );
    assert.ok(
      html_board.hasClass('TDP_board_inner'),
      'should have the expected HTML class'
    );
    assert.equal(
      html_board.children('div.TDP_board_row').length,
      10,
      'should have 10 rows'
    );
    assert.equal(
      html_board.children('br').length,
      10,
      'should have 10 line breaks'
    );
    assert.equal(
      TDP.UI.board.html(),
      html_board.prop('outerHTML'),
      'should have drawn it to the UI'
    )
  }
);


