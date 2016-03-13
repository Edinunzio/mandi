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

  /*it("should restrict draggability according to legal_moves_map"), function(){

  };*/

  it("should read board after every move", function(){
    currentState = game.readBoard(['1','2','3','4','5','0','7','8','6']);
    expect(currentState).toEqual([1,2,3,4,5,0,7,8,6]);
  });

  it("should alert is game won", function() {
    winner = game.isWinner(_solution, _fakeSubmit);
    expect(winner).toEqual(true);
  });

  it("should do nothing if the game is still in play", function() {
    loser = game.isWinner(_problem, _solution);
    expect(loser).toEqual(false);
  });

  it("should swap attributes with empty square when clicked", function(){

  });
  
});
