// Generated by CoffeeScript 1.3.3
(function() {
  var squares;

  squares = angular.module("squares", []);

  squares.controller("squares-controller", [
    '$scope', function($scope) {
      var choose, getLineOwner, getNearbyKeystones, getSquareWinner, isLineSelected, isSquareNewlyWon, isSquareWon, nextPlayer, setLineSelected, setSquareWon, updateWinnings, wonClass, _i, _ref, _results;
      $scope.num_players = parseInt(prompt("How many people are playing?", 2), 10);
      $scope.players = (function() {
        _results = [];
        for (var _i = 1, _ref = $scope.num_players; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
      $scope.current_player = 1;
      $scope.selected = {};
      $scope.won = {};
      getLineOwner = function(type, row, cell) {
        return $scope.selected[row + type + cell];
      };
      isLineSelected = function(type, row, cell) {
        return getLineOwner(type, row, cell) != null;
      };
      setLineSelected = function(type, row, cell) {
        return $scope.selected[row + type + cell] = $scope.current_player;
      };
      getSquareWinner = function(row, cell) {
        return $scope.won[row + '/' + cell];
      };
      isSquareWon = function(row, cell) {
        return getSquareWinner(row, cell) != null;
      };
      setSquareWon = function(row, cell) {
        return $scope.won[row + '/' + cell] = $scope.current_player;
      };
      nextPlayer = function() {
        $scope.current_player += 1;
        if ($scope.current_player === $scope.num_players + 1) {
          return $scope.current_player = 1;
        }
      };
      isSquareNewlyWon = function(row, cell) {
        if (getSquareWinner(row, cell)) {
          return false;
        }
        if (isLineSelected('v', row, cell) && isLineSelected('h', row, cell) && isLineSelected('v', row, cell + 1) && isLineSelected('h', row + 1, cell)) {
          return true;
        }
        return false;
      };
      getNearbyKeystones = function(type, row, cell) {
        if (type === 'v') {
          return [[row, cell - 1], [row, cell]];
        }
        return [[row - 1, cell], [row, cell]];
      };
      updateWinnings = function(type, row, cell) {
        var keystone, won, _j, _len, _ref1;
        won = false;
        _ref1 = getNearbyKeystones(type, row, cell);
        for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
          keystone = _ref1[_j];
          if (isSquareNewlyWon.apply(null, keystone)) {
            setSquareWon.apply(null, keystone);
            won = true;
          }
        }
        return won;
      };
      choose = function(type, row, cell) {
        if (isLineSelected(type, row, cell)) {
          return;
        }
        setLineSelected(type, row, cell);
        if (!updateWinnings(type, row, cell)) {
          return nextPlayer();
        }
      };
      $scope.chooseVertical = function(row, cell) {
        return choose('v', row, cell);
      };
      $scope.chooseHorizontal = function(row, cell) {
        return choose('h', row, cell);
      };
      wonClass = function(row, cell) {
        return 'p' + getSquareWinner(row, cell) + '-won';
      };
      $scope.hCssClass = function(row, cell) {
        return 'p' + getLineOwner('h', row, cell);
      };
      return $scope.vCssClass = function(row, cell) {
        return wonClass(row, cell) + ' ' + 'p' + getLineOwner('v', row, cell);
      };
    }
  ]);

}).call(this);
