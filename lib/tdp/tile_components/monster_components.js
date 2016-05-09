TDP.tile_components.monster_components = function () {

  TDP.tile_components.movement.apply(this);
  TDP.tile_components.attacking.apply(this);
  TDP.tile_components.creature_health.apply(this);

  this.moveToTile = function (tile) {
    if (tile.is('floor')) {
      this.moveToPosition(tile.position());
    }
  };

  // TODO A separate component for line-of-sight
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
    var obstacle_found = false;
    while ((x != player_position[0] || y != player_position[1]) && !obstacle_found) {
      if (player_position[0] > x) {
        x += 1;
      } else if (player_position[0] < x) {
        x -= 1;
      }
      obstacle_found = this.obstacleAt(x, y);
      if (obstacle_found) {
        break;
      }

      if (player_position[1] > y) {
        y += 1;
      } else if (player_position[1] < y) {
        y -= 1;
      }
      obstacle_found = this.obstacleAt(x, y);
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
    var obstacle_found = false;
    while (
    (x != player_position[0] || y != player_position[1]) && !obstacle_found
      ) {

      if (player_position[1] > y) {
        y += 1;
      } else if (player_position[1] < y) {
        y -= 1;
      }
      obstacle_found = this.obstacleAt(x, y);
      if (obstacle_found) {
        break;
      }

      if (player_position[0] > x) {
        x += 1;
      } else if (player_position[0] < x) {
        x -= 1;
      }
      obstacle_found = this.obstacleAt(x, y);
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

  this.obstacleAt = function (x, y) {
    var tile = TDP.field.tileAt(x, y);
    //console.log('Looking for obstacle at '+ x + ':' + y + ' - found: ' + tile.type);
    return tile.type != 'floor' && tile.type != 'player' && tile != this;
  };

  this.damage = 1;
  this.attack_chance = 2;
  
  this.attack = function(target) {
    var small_message;
    if(this.willHit()) {
      TDP.player.dealDamage(this.damage);
      small_message = 'It did ' + this.damage + ' damage!';
      if (TDP.player.isDead()) {
        small_message = small_message.concat(' It killed you!');
      } else {
        small_message = small_message.concat(' You have ' + TDP.health + ' health left.');
      }
    } else {
      small_message = 'It missed!'
    }

    TDP.console.log(
      this.source + ' attacked you!',
      small_message
    );
  };

  this.turnAction = function () {
    //console.log('turn action ' + this.position());
    if (this.adjacentTo(TDP.player)) {
      this.attack(TDP.player);
    } else if (this.canSeePlayer()) {
      this.moveTowardsTile(TDP.player);
    }
  };

};
