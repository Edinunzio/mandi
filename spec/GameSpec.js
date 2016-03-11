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
  /*describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });*/
});
