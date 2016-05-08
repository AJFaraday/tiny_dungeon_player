TDP.tile_components.monster_components = function() {

  TDP.tile_components.movement.apply(this);
  TDP.tile_components.creature_health.apply(this);

  this.canSeePlayer = function() {
    var my_position = this.position();
    var player_position = TDP.player.position();

    var obstacle_found = this.lookForObstaclesXFirst(
      my_position,
      player_position
    )
      ;
    if(!obstacle_found) {
      obstacle_found = this.lookForObstaclesYFirst(
        my_position,
        player_position
      );
    }
    return !obstacle_found;
  };

  this.lookForObstaclesXFirst = function(my_position, player_position) {
    var x = my_position[0];
    var y = my_position[1];
    var obstacle_found = false;
    while (
    (x != player_position[0] || y != player_position[1]) && !obstacle_found
      ) {
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
      } else if (player_position[0] < y) {
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
        break
      }
    }
    return obstacle_found;
  };

  this.lookForObstaclesYFirst = function(my_position, player_position) {
    var x = my_position[0];
    var y = my_position[1];
    var obstacle_found = false;
    while (
    (x != player_position[0] || y != player_position[1]) && !obstacle_found
      ) {

      if (player_position[1] > y) {
        y += 1;
      } else if (player_position[0] < y) {
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
        break
      }
    }
    return obstacle_found;
  };


  this.obstacleAt = function(x,y) {
    var tile = TDP.field.tileAt(x, y);

    if (tile.is('floor') || tile.is('player')){
      return false;
    } else {
      return true;
    }

  };

};
