TDP.tile_components.monster_components = function () {

  TDP.tile_components.movement.apply(this);
  TDP.tile_components.attacking.apply(this);
  TDP.tile_components.creature_health.apply(this);

  if (TDP.data.monster_types[this.source]) {
    $.extend(this, TDP.data.monster_types[this.source]);
  } else {
    $.extend(this, TDP.data.monster_types.default);
  }

  this.moveToTile = function (tile) {
    if (tile.is('floor')) {
      this.moveToPosition(tile.position());
    }
  };

  // TODO A separate component for line-of-sight
  // TODO have the target as an argument, not just the player
  this.canSeePlayer = function () {
    var my_position = this.position();
    var player_position = TDP.player.position();

    var obstacle_found = this.lookForObstaclesXFirst(
      my_position,
      player_position
    );
    if (obstacle_found) {
      obstacle_found = this.lookForObstaclesYFirst(
        my_position,
        player_position
      );
    }
    return !obstacle_found;
  };

  this.lookForObstaclesXFirst = function (my_position, player_position) {
    var x = my_position[0];
    var y = my_position[1];
    var spaces_looked = 0;
    var obstacle_found = false;
    while ((x != player_position[0] || y != player_position[1]) && !obstacle_found) {
      if (player_position[0] > x) {
        x += 1;
        spaces_looked += 1;
      } else if (player_position[0] < x) {
        x -= 1;
        spaces_looked += 1;
      }
      obstacle_found = (this.obstacleAt(x, y) || spaces_looked > this.follow_range);
      if (obstacle_found || spaces_looked > this.follow_range) {
        break;
      }

      if (player_position[1] > y) {
        y += 1;
        spaces_looked += 1;
      } else if (player_position[1] < y) {
        y -= 1;
        spaces_looked += 1;
      }
      obstacle_found = (this.obstacleAt(x, y) || spaces_looked > this.follow_range);
      if (obstacle_found) {
        break;
      }

      if (
        x < 0 || x >= TDP.width ||
        y < 0 || y >= TDP.height
      ) {
        console.log('out of bounds at coord:' + x + y);
        throw('it went wrong!');
        break;
      }
    }
    return obstacle_found;
  };

  this.lookForObstaclesYFirst = function (my_position, player_position) {
    var x = my_position[0];
    var y = my_position[1];
    var spaces_looked = 0;
    var obstacle_found = false;
    while (
    (x != player_position[0] || y != player_position[1]) && !obstacle_found
      ) {

      if (player_position[1] > y) {
        y += 1;
        spaces_looked += 1;
      } else if (player_position[1] < y) {
        y -= 1;
        spaces_looked += 1;
      }
      obstacle_found = (this.obstacleAt(x, y) || spaces_looked > this.follow_range);
      if (obstacle_found || spaces_looked > this.follow_range) {
        break;
      }

      if (player_position[0] > x) {
        x += 1;
        spaces_looked += 1;
      } else if (player_position[0] < x) {
        x -= 1;
        spaces_looked += 1;
      }
      obstacle_found = (this.obstacleAt(x, y) || spaces_looked > this.follow_range);
      if (obstacle_found || spaces_looked > this.follow_range) {
        break;
      }

      if (
        x < 0 || x >= TDP.width ||
        y < 0 || y >= TDP.height
      ) {
        console.log('out of bounds at coord:' + x + y);
        throw('it went wrong!');
        break;
      }
    }
    return obstacle_found;
  };

  this.obstacleAt = function (x, y) {
    var tile = TDP.field.tileAt(x, y);
    return tile.type != 'floor' && tile.type != 'player' && tile != this;
  };

  this.attack = function (target) {
    var small_message;
    if (this.willHit()) {
      TDP.player.dealDamage(this.damage);
      small_message = 'It did ' + this.damage + ' damage!';
      if (TDP.player.isDead()) {
        target.flash(TDP.data.overlays.monster_kill);
        small_message = small_message.concat(' It killed you!');
      } else {
        target.flash(TDP.data.overlays.monster_attack);
        small_message = small_message.concat(' You have ' + TDP.health + ' health left.');
      }
    } else {
      target.flash(TDP.data.overlays.monster_miss);
      small_message = 'It missed!';
    }

    TDP.console.log(
      this.source + ' attacked you!',
      small_message
    );
  };

  this.turnAction = function () {
    if (this.adjacentTo(TDP.player) && TDP.player.isAlive()) {
      this.attack(TDP.player);
    } else if (this.canSeePlayer()) {
      this.moveTowardsTile(TDP.player);
    }
  };

};
