// Generated by CoffeeScript 1.3.3
(function() {
  var TextAdventure, World, adventure, stdin,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  stdin = process.openStdin();

  stdin.setEncoding('utf8');

  Date.prototype.toHumanDateString = function() {
    return this.getUTCFullYear() + '/' + (this.getUTCMonth() + 1) + '/' + this.getUTCDate();
  };

  World = (function() {

    function World() {
      this.map = {
        none: ['THE VOID', "Uh, captain, um, there's nothing here. Actual nothingness. Best go back."],
        'x0_y0': ['Home', "You are safely home, away from toil and strife. Best stay here, nobody likes a hero."],
        'x0_y1': ['Ipswich', "They say that those who enter Ipswich leave crazy. I've been there, and I'm as sane a peacock as when I entered. Baaaaaa."],
        'x1_y1': ['Valley of despair', "I got a bad feeling about this, boss"],
        'x1_y0': ['Yellow brick road', "You see a brick road, with a small house beside it and a green ooze eminating from the foundations. Small munchkins chant your name."],
        'x1_y-1': ['Rode Too Parahdyes', "I once heard a story about muggers promising people heaven along a certain road, then killing them and taking their money. I'm sure that's not the case here though."],
        'x0_y-1': ['The Mummy', "Your mother meets you on the road - you forgot your packed lunch. One big sloppy kiss later, gain +1 nourishment points, and -192 peer esteem points."],
        'x-1_y-1': ['Graveyard', "You see a tombstone: [YOUR NAME] - Died " + (new Date().toHumanDateString()) + ". Stuck his nose in graveyards that it didn't belong... in? His nose. It just... he just shouldn't have stuck it there."],
        'x-1_y0': ['Misty mountains', "Yeesh, so much mist. You could lose a whole town in this. Best keep moving"],
        'x-1_y1': ['Road to wales', "What's that smell? Mint sauce?"]
      };
    }

    World.prototype.getLocation = function(x, y) {
      var location;
      location = this.locationToString(x, y);
      if (this.map[location] == null) {
        return this.map['none'];
      }
      return this.map[location];
    };

    World.prototype.locationToString = function(x, y) {
      return "x" + x + "_y" + y;
    };

    World.prototype.surroundings = function(x, y) {
      return {
        east: this.getLocation(x + 1, y),
        west: this.getLocation(x - 1, y),
        south: this.getLocation(x, y + 1),
        north: this.getLocation(x, y - 1)
      };
    };

    return World;

  })();

  TextAdventure = (function() {

    function TextAdventure() {
      this.tryCommand = __bind(this.tryCommand, this);

      var _ref;
      this.world = new World();
      _ref = [0, 0], this.x = _ref[0], this.y = _ref[1];
    }

    TextAdventure.prototype.quit = function() {
      console.log("\n\nSo long, and thanks for all the fish");
      return process.exit();
    };

    TextAdventure.prototype.dispatch = function(action) {
      switch (action) {
        case 'quit':
          return this[action]();
        case "north":
        case "south":
        case "east":
        case "west":
          console.log("\n\nYou travel " + action);
          this.go(action);
          return this.printStatus();
        case "look":
          return this.printStatus();
        default:
          return console.log("Sorry, I don't know what you mean by '" + action + "'");
      }
    };

    TextAdventure.prototype.printStatus = function() {
      var direction, location, surroundings, _results;
      location = this.world.getLocation(this.x, this.y);
      console.log("\nYou are at [" + this.x + ", " + this.y + "] - " + location[0]);
      console.log(location[1]);
      console.log("\nYour surroundings: ");
      surroundings = this.world.surroundings(this.x, this.y);
      _results = [];
      for (direction in surroundings) {
        _results.push(console.log("" + direction + ": " + surroundings[direction][0]));
      }
      return _results;
    };

    TextAdventure.prototype.go = function(direction) {
      var _ref;
      return _ref = (function() {
        switch (direction) {
          case 'north':
            return [this.x, this.y - 1];
          case 'south':
            return [this.x, this.y + 1];
          case 'east':
            return [this.x + 1, this.y];
          case 'west':
            return [this.x - 1, this.y];
        }
      }).call(this), this.x = _ref[0], this.y = _ref[1], _ref;
    };

    TextAdventure.prototype.tryCommand = function(command) {
      command = command.trim().toLowerCase();
      this.dispatch(command);
      return console.log("\n\nWhere will you go next? >> ");
    };

    return TextAdventure;

  })();

  adventure = new TextAdventure();

  console.log('Welcome to the text adventure, your available commands are north, south, east, west, look and quit');

  adventure.tryCommand('look');

  stdin.on('data', adventure.tryCommand);

}).call(this);
