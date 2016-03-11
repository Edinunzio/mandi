describe("Game", function() {
  var Game = require('../lib/Game');
  var game;
  var _problem;
  var _solution;
  var _grid_size;

  beforeEach(function() {
    _problem = [1,2,3,4,5,0,7,8,6];
    _solution = [1,2,3,4,5,6,7,8,0];
    _fake_submit = [1,2,3,4,5,6,7,8,0];
    _grid_size = 3;
    game = new Game(_problem, _solution, _grid_size);
  });

  it("should receive puzzle building data on page load", function() {
    expect(game.problem).toEqual([1,2,3,4,5,0,7,8,6]);
    expect(game.solution).toEqual([1,2,3,4,5,6,7,8,0]);
    expect(game.grid_size).toEqual(3);
    expect(game.blank_html).toEqual('<div class="tile blank_tile disabled"><p>0</p></div>');
  });

  it("should alert is game won", function() {
    winner = game.is_winner(_solution, _fake_submit);
    expect(winner).toEqual(true);
  });

  it("should do nothing if the game is still in play", function() {
    loser = game.is_winner(_problem, _solution);
    expect(loser).toEqual(false);
  });

  it("should swap attributes with empty square when clicked", function(){

  });
  
});
