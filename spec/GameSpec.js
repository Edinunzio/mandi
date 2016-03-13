describe("Game", function() {
  var Game = require('../puzzles/static/js/Game');
  var game;
  var _problem;
  var _solution;
  var _gridSize;

  beforeEach(function() {
    _problem = [1,2,3,4,5,0,7,8,6];
    _solution = [1,2,3,4,5,6,7,8,0];
    _fakeSubmit = [1,2,3,4,5,6,7,8,0];
    _gridSize = 3;
    _legalMovesMap = {1: [2, 4], 2: [1, 3, 5], 3: [2, 6], 4: [1, 5, 7], 5: [2, 4, 6, 8], 6: [3, 5, 9], 7: [4, 8], 8: [5, 7, 9], 9: [6, 8]};
    game = new Game(_problem, _solution, _gridSize, _legalMovesMap);
  });

  it("should receive puzzle building data on page load", function() {
    expect(game.problem).toEqual([1,2,3,4,5,0,7,8,6]);
    expect(game.solution).toEqual([1,2,3,4,5,6,7,8,0]);
    expect(game.gridSize).toEqual(3);
    expect(game.blankHtml).toEqual('<div class="tile blank_tile disabled"><p>0</p></div>');
  });

  it("should be able to locate the index of the empty space", function() {
    zero_location_5 = game.locatesEmptySpace(game.problem)
    zero_location_0 = game.locatesEmptySpace([0,1,2,4,3,5,6,8,7])
    expect(zero_location_0).toEqual(0)
    expect(zero_location_5).toEqual(5)
  });

  /*it("should restrict draggability according to legal_moves_map"), function(){

  };*/

  it("should read board after every move", function(){
    currentState = game.readBoard(game.problem);
    expect(currentState).toEqual([1,2,3,4,5,0,7,8,6]);
  });

  it("should equal true when game equals solution", function() {
    winner = game.isWinner(game.solution);
    expect(winner).toEqual(true);
  });

  it("should do nothing if the game is still in play", function() {
    loser = game.isWinner([1,2,3,4,5,0,7,8,6]);
    expect(loser).toEqual(false);
  });

  it("should swap attributes with empty square when clicked", function(){

  });
  
});
