QUnit.module('TDP.constructors.Tile monster tile');

TDP.init(TestData.source);
var monster_tile = TDP.field.tileAt(2, 5);

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
    assert.ok(monster_tile.hasInteraction, 'should have an interaction');
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
  'it should know if it can see the player or not',
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
    assert.ok(
      monster_tile.canSeePlayer(),
      'should be able to see the player'
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
    assert.ok(
      monster_tile.canSeePlayer(),
      'should be able to see the player'
    );

    TDP.fieldInit(TestData.source);
  }
);


QUnit.test(
  'should attack the player (hitting it)',
  function (assert) {
    var player_tile = TDP.field.tileAt(7, 8);
    var monster_tile = TDP.field.tileAt(2, 5);
    // ensure hit will be true
    player_tile.willHit = function () {
      return true
    };
    // clear readout
    TDP.UI.readout.html('');

    var starting_health = monster_tile.health;
    monster_tile.interaction(monster_tile, player_tile);

    assert.equal(
      monster_tile.health,
      starting_health - player_tile.damage
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf(TDP.emoji.get('Attacking ' + monster_tile.source + '!')) > 1),
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
  'should attack the player (killing it)',
  function (assert) {
    var player_tile = TDP.field.tileAt(7, 8);
    var monster_tile = TDP.field.tileAt(2, 5);
    monster_tile.health = 1;
    // ensure hit will be true
    player_tile.willHit = function () {
      return true
    };
    // clear readout
    TDP.UI.readout.html('');

    var starting_health = monster_tile.health;
    monster_tile.interaction(monster_tile, player_tile);

    assert.equal(
      monster_tile.health,
      starting_health - player_tile.damage
    );
    assert.ok(monster_tile.isDead(), 'it should have died.');
    assert.ok(
      (TDP.UI.readout.html().indexOf(TDP.emoji.get('Attacking ' + monster_tile.source + '!')) > 1),
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
  'should attack the player (missing it)',
  function (assert) {
    var player_tile = TDP.field.tileAt(7, 8);
    var monster_tile = TDP.field.tileAt(2, 5);
    monster_tile.health = 1;
    // ensure hit will be false
    player_tile.willHit = function () {
      return false
    };
    // clear readout
    TDP.UI.readout.html('');

    var starting_health = monster_tile.health;
    monster_tile.interaction(monster_tile, player_tile);

    assert.equal(
      monster_tile.health,
      starting_health
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf(TDP.emoji.get('Attacking ' + monster_tile.source + '!')) > 1),
      "should show that you're attacking in the readout"
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf('You missed!') >= 0),
      "should show that you missed in the readout"
    );
  }
);


QUnit.test(
  'it move towards a point',
  function (assert) {
    TDP.fieldInit(TestData.moving_scenario);
    var monster_tile = TDP.field.tileAt(2, 2);

    /*
     ⬜⬜⬜⬜⬜
     ⬜⬜⬜⬜⬜
     ⬜⬜🐘⬜⬜
     ⬜⬜⬜⬜⬜
     ⬜⬜⬜⬜⬜
     */
    monster_tile.XFirst = true;
    monster_tile.moveTowards(0, 0); // top left
    assert.equal(
      monster_tile.position().toString(),
      [1, 2].toString(),
      'should have moved left.'
    );

    monster_tile.moveTo(2, 2);
    monster_tile.XFirst = false;
    monster_tile.moveTowards(0, 0); // top left
    assert.equal(
      monster_tile.position().toString(),
      [2, 1].toString(),
      'should have moved up.'
    );

    monster_tile.moveTo(2, 2);
    monster_tile.XFirst = true;
    monster_tile.moveTowards(4, 0); // top right
    assert.equal(
      monster_tile.position().toString(),
      [3, 2].toString(),
      'should have moved right.'
    );

    monster_tile.moveTo(2, 2);
    monster_tile.XFirst = false;
    monster_tile.moveTowards(4, 0); // top right
    assert.equal(
      monster_tile.position().toString(),
      [2, 1].toString(),
      'should have moved up.'
    );

    monster_tile.moveTo(2, 2);
    monster_tile.XFirst = true;
    monster_tile.moveTowards(4, 4); // bottom right
    assert.equal(
      monster_tile.position().toString(),
      [3, 2].toString(),
      'should have moved right.'
    );

    monster_tile.moveTo(2, 2);
    monster_tile.XFirst = false;
    monster_tile.moveTowards(4, 4); // bottom right
    assert.equal(
      monster_tile.position().toString(),
      [2, 3].toString(),
      'should have moved down.'
    );

    monster_tile.moveTo(2, 2);
    monster_tile.XFirst = true;
    monster_tile.moveTowards(0, 4); // bottom left
    assert.equal(
      monster_tile.position().toString(),
      [1, 2].toString(),
      'should have moved left.'
    );

    monster_tile.moveTo(2, 2);
    monster_tile.XFirst = false;
    monster_tile.moveTowards(0, 4); // bottom left
    assert.equal(
      monster_tile.position().toString(),
      [2, 3].toString(),
      'should have moved down.'
    );


    TDP.fieldInit(TestData.source);

  }
);

QUnit.test(
  'should move towards player when it can see player',
  function (assert) {
    TDP.fieldInit(TestData.seeing_scenario);
    TDP.field.drawBoard();
    var monster_tile = TDP.field.tileAt(0, 0);
    monster_tile.XFirst = true;
    /*
     🐘⬜⬜
     ⬜⬜⬜
     ⬜⬜🤔
     */
    TDP.newTurn();
    assert.equal(
      monster_tile.position().toString(),
      [1, 0].toString(),
      'should have taken a step towards the player'
    );

    // And now, standing next to the player
    monster_tile.moveTo(1, 2);
    monster_tile.willHit = function () {
      return true;
    };
    TDP.UI.readout.html('');
    var player_health = TDP.health;
    /*
     ⬜⬜⬜
     ⬜⬜⬜
     ⬜🐘🤔
     */

    TDP.newTurn();
    assert.equal(
      TDP.health,
      (player_health - monster_tile.damage),
      'should have done its damage to the player'
    );

    assert.ok(
      (TDP.UI.readout.html().indexOf(TDP.emoji.get('🐘 attacked you!')) >= 0),
      'should say it attacked you in the readout.'
    );

    assert.ok(
      (TDP.UI.readout.html().indexOf('It did ' + monster_tile.damage +' damage!') >= 0),
      'should say how much damage it did'
    );
    assert.ok(
      (TDP.UI.readout.html().indexOf('You have '+ TDP.health + ' health left.') >= 0),
      'should say how much you have left'
    );

    // And now, it misses.
    monster_tile.willHit = function () {
      return false;
    };
    TDP.UI.readout.html('');
    /*
     ⬜⬜⬜
     ⬜⬜⬜
     ⬜🐘🤔
     */

    TDP.newTurn();
    assert.ok(
      (TDP.UI.readout.html().indexOf(TDP.emoji.get('🐘 attacked you!')) >= 0),
      'should say it attacked you in the readout.'
    );

    assert.ok(
      (TDP.UI.readout.html().indexOf('It missed!') >= 0),
      'should say it missed'
    );


    // And now, it kills you;
    TDP.setHealth(1);
    monster_tile.willHit = function () {
      return true;
    };
    TDP.UI.readout.html('');
    /*
     ⬜⬜⬜
     ⬜⬜⬜
     ⬜🐘🤔
     */

    TDP.newTurn();
    assert.ok(
      (TDP.UI.readout.html().indexOf(TDP.emoji.get('🐘 attacked you!')) >= 0),
      'should say it attacked you in the readout.'
    );

    assert.ok(
      (TDP.UI.readout.html().indexOf('It killed you!') >= 0),
      'should say it killed you'
    );

    assert.ok(
      TDP.player.isDead(),
      'and it should actually kill you'
    );

    TDP.fieldInit(TestData.source);
  }
);

