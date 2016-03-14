describe("Game", function() {
  var Game = require('../puzzles/static/js/Game');
  var game;
  var _solution;
  var _gridSize;

  beforeEach(function() {
    _solution = [1,2,3,4,5,6,7,8,0];
    _fakeSubmit = [1,2,3,4,5,6,7,8,0];
    _gridSize = 3;
    _legalMovesMap = {1: [2, 4], 2: [1, 3, 5], 3: [2, 6], 4: [1, 5, 7], 5: [2, 4, 6, 8], 6: [3, 5, 9], 7: [4, 8], 8: [5, 7, 9], 9: [6, 8]};
    game = new Game(_solution, _gridSize, _legalMovesMap);
  });

  it("should receive puzzle building data on page load", function() {
    expect(game.solution).toEqual([1,2,3,4,5,6,7,8,0]);
    expect(game.gridSize).toEqual(3);
    expect(game.blankHtml).toEqual('<div class="tile blank_tile disabled"><p>0</p></div>');
  });

  it("should be able to locate the index of the empty space", function() {
    zero_location_0 = game.locatesEmptySpace([0,1,2,4,3,5,6,8,7])
    zero_location_1 = game.locatesEmptySpace([1,0,2,4,3,5,6,8,7])
    zero_location_15 = game.locatesEmptySpace([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0])
    expect(zero_location_0).toEqual(0)
    expect(zero_location_1).toEqual(1)
    expect(zero_location_15).toEqual(15)
  });

  it("should restrict draggability according to legal_moves_map", function(){
    free_tiles_0 = game.getsLegalMoves(0)
    free_tiles_1 = game.getsLegalMoves(1)
    free_tiles_2 = game.getsLegalMoves(2)
    expect(free_tiles_0).toEqual([2,4])
    expect(free_tiles_1).toEqual([1,3,5])
    expect(free_tiles_2).toEqual([2,6])
  });

  it("should read board after every move", function(){
    mockState = [1,2,3,4,5,0,7,8,6];
    currentState = game.readBoard(mockState);
    expect(currentState).toEqual([1,2,3,4,5,0,7,8,6]);
  });

  it("should append board to track player's moves", function(){
    currentBoard_1 = [1,2,3,4,5,0,7,8,6];
    game.recordsMove(currentBoard_1)
    currentBoard_2 = [1,2,0,4,5,3,7,8,6];
    game.recordsMove(currentBoard_2);
    currentBoard_3 = [1,0,2,4,5,3,7,8,6];
    game.recordsMove(currentBoard_3);
    expect(game.sessionMoves).toEqual([[1,2,3,4,5,0,7,8,6], [1,2,0,4,5,3,7,8,6], [1,0,2,4,5,3,7,8,6]]);
  });

  it("should shuffle the board", function(){
    ex = game.shufflesBoard([1,2,3,4,5,6,7,8,0], 3);
    expect(ex).not.toEqual([1,2,3,4,5,6,7,8,0]);
  });

  it("should never return an impossible game", function(){
    game_1 = game.shufflesBoard([1,2,3,0], 2);
    game_2 = game.shufflesBoard([1,2,3,0], 2);
    game_3 = game.shufflesBoard([1,2,3,0], 2);
    game_4 = game.shufflesBoard([1,2,3,0], 2);
    game_5 = game.shufflesBoard([1,2,3,0], 2);
    game_6 = game.shufflesBoard([1,2,3,0], 2);
    game_7 = game.shufflesBoard([1,2,3,0], 2);
    game_8 = game.shufflesBoard([1,2,3,0], 2);
    game_9 = game.shufflesBoard([1,2,3,0], 2);
    game_10 = game.shufflesBoard([1,2,3,0], 2);
    game_11 = game.shufflesBoard([1,2,3,0], 2);
    game_12 = game.shufflesBoard([1,2,3,0], 2);
    expect(game_1).not.toEqual([2,1,3,0])
    expect(game_2).not.toEqual([2,1,3,0])
    expect(game_3).not.toEqual([2,1,3,0])
    expect(game_4).not.toEqual([2,1,3,0])
    expect(game_5).not.toEqual([2,1,3,0])
    expect(game_6).not.toEqual([2,1,3,0])
    expect(game_7).not.toEqual([2,1,3,0])
    expect(game_8).not.toEqual([2,1,3,0])
    expect(game_9).not.toEqual([2,1,3,0])
    expect(game_10).not.toEqual([2,1,3,0])
    expect(game_11).not.toEqual([2,1,3,0])
    expect(game_12).not.toEqual([2,1,3,0])
  });

  it("should equal true when game equals solution", function() {
    shouldWin = game.readBoard(game.solution);
    shouldLose = game.readBoard([1,2,3,4,5,0,7,8,6]);
    winner = game.isWinner(shouldWin, [1,2,3,4,5,6,7,8,0]);
    loser = game.isWinner(shouldLose, [1,2,3,4,5,6,7,8,0]);
    expect(winner).toEqual(true);
    expect(loser).not.toEqual(true);
  });
  
});
