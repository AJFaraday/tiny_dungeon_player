QUnit.module('TDP.constructors.Tile monster tile');

var monster_tile = TestData.monster_tile;

QUnit.test(
  'should have a type of "monster"',
  function (assert) {
    assert.equal(monster_tile.type, 'monster', 'tile type should be monster');
    assert.ok(monster_tile.is('monster'), 'is function should return true');
    assert.notOk(monster_tile.is('car'), 'is function should return false (when type is wrong)');
  }
);

QUnit.test(
  'should be not passable',
  function (assert) {
    assert.ok(monster_tile.impassable, 'should be impassable');
    assert.notOk(monster_tile.passable, 'should not be passable');
  }
);

QUnit.test(
  'should have an interaction',
  function (assert) {
    assert.ok(TestData.monster_tile.hasInteraction, 'should have an interaction');
  }
);

QUnit.test(
  'should have a function as its interaction',
  function (assert) {
    assert.ok(
      jQuery.isFunction(monster_tile.interaction),
      'should have an interaction'
    );
  }
);


QUnit.test(
  'it should not break everything if I init a new field',
  function (assert) {
    TDP.fieldInit(TestData.seeing_scenario);
    var monster_tile = TDP.field.tileAt(0, 0);
    /*
     🐘⬜⬜
     ⬜⬜⬜
     ⬜⬜🤔
     */
    assert.ok(
      monster_tile.canSeePlayer(),
      'should be able to see the player'
    );
    /*
     🐘⬜⬜
     ⬜📕⬜
     ⬜⬜🤔
     */

    TDP.field.tileAt(1, 1).replaceWith(
      new TDP.constructors.Tile(TDP.data.named_tiles.book)
    );
    assert.notOk(
      monster_tile.canSeePlayer(),
      'should not be able to see the player'
    );

    /*
     🐘⬜📕
     ⬜⬜⬜
     ⬜⬜🤔
     */
    TDP.field.tileAt(1, 1).replaceWith(
      new TDP.constructors.Tile(TDP.data.named_tiles.floor)
    );
    TDP.field.tileAt(2, 0).replaceWith(
      new TDP.constructors.Tile(TDP.data.named_tiles.book)
    );
    assert.ok(
      monster_tile.canSeePlayer(),
      'should be able to see the player with a book in the square'
    );

    /*
     🐘📕⬜
     ⬜⬜⬜
     ⬜⬜🤔
     */
    TDP.field.tileAt(2, 0).replaceWith(
      new TDP.constructors.Tile(TDP.data.named_tiles.floor)
    );
    TDP.field.tileAt(2, 1).replaceWith(
      new TDP.constructors.Tile(TDP.data.named_tiles.book)
    );
    assert.notOk(
      monster_tile.canSeePlayer(),
      'should not be able to see the player'
    );

      /*
       🐘⬜⬜
       📕⬜⬜
       ⬜⬜🤔
       */
      TDP.field.tileAt(2, 1).replaceWith(
        new TDP.constructors.Tile(TDP.data.named_tiles.floor)
      );
      TDP.field.tileAt(1, 2).replaceWith(
        new TDP.constructors.Tile(TDP.data.named_tiles.book)
      );
      assert.notOk(
        monster_tile.canSeePlayer(),
        'should not be able to see the player'
      );

    TDP.fieldInit(TestData.source);
  }
);



QUnit.test(
  'should attack a monster (hitting it)',
  function(assert) {
    var player_tile = TDP.field.tileAt(7, 8);
    var monster_tile = TDP.field.tileAt(2, 5);
    // ensure hit will be true
    player_tile.willHit = function() {return true};
    // clear readout
    TDP.UI.readout.html('');

    var starting_health = monster_tile.health;
    console.log(monster_tile.health);
    monster_tile.interaction(monster_tile, player_tile);

    assert.equal(
      monster_tile.health,
      starting_health - player_tile.damage
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf('Attacking '+ monster_tile.source +'!') > 1),
      "should show that you're attacking in the readout"
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf('You did ' + player_tile.damage + ' damage!') >= 0),
      "should show that you dealt damage in the readout"
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf('It has ' + monster_tile.health + ' health left.') >= 0),
      "should show how much health is left in the readout"
    );
  }
);

QUnit.test(
  'should attack a monster (killing it)',
  function(assert) {
    var player_tile = TDP.field.tileAt(7, 8);
    var monster_tile = TDP.field.tileAt(2, 5);
    monster_tile.health = 1;
    // ensure hit will be true
    player_tile.willHit = function() {return true};
    // clear readout
    TDP.UI.readout.html('');

    var starting_health = monster_tile.health;
    console.log(monster_tile.health);
    monster_tile.interaction(monster_tile, player_tile);

    assert.equal(
      monster_tile.health,
      starting_health - player_tile.damage
    );
    assert.ok(monster_tile.isDead(), 'it should have died.');
    assert.ok(
      (TDP.UI.readout.html().indexOf('Attacking '+ monster_tile.source +'!') > 1),
      "should show that you're attacking in the readout"
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf('You did ' + player_tile.damage + ' damage!') >= 0),
      "should show that you did damage in the readout"
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf('You killed it!') >= 0),
      "should show you killed it in the readout"
    );

    TDP.fieldInit(TestData.source);
  }
);


QUnit.test(
  'should attack a monster (missing it)',
  function(assert) {
    var player_tile = TDP.field.tileAt(7, 8);
    var monster_tile = TDP.field.tileAt(2, 5);
    monster_tile.health = 1;
    // ensure hit will be false
    player_tile.willHit = function() {return false};
    // clear readout
    TDP.UI.readout.html('');

    var starting_health = monster_tile.health;
    console.log(monster_tile.health);
    monster_tile.interaction(monster_tile, player_tile);

    assert.equal(
      monster_tile.health,
      starting_health
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf('Attacking '+ monster_tile.source +'!') > 1),
      "should show that you're attacking in the readout"
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf('You missed!') >= 0),
      "should show that you missed in the readout"
    );
  }
);


