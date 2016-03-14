function Game(solution, grid_size, legal_moves_map){
    this.solution = solution;
    this.gridSize = grid_size;
    this.blankHtml = '<div class="tile blank_tile disabled"><p>0</p></div>';
    this.legalMovesMap = legal_moves_map;
    this.currentBoard;
    this.sessionMoves = [];
    this.is_solved = false;
    this.turns_taken = 0;

    this.locatesEmptySpace = function(currentBoard){
        this.empty_space = currentBoard.indexOf(0);
        return this.empty_space;
    };

    this.isWinner = function(arr1, arr2){
        if(String(arr1) == String(arr2)){
            this.is_solved = true;
            return true;
        }
    };

    this.playBackSessionMoves = function(){
        var playback = this.sessionMoves;
        return playback.reverse();
    };

    this.recordsMove = function(currentBoard){
        this.sessionMoves.push(currentBoard)
        this.turns_taken +=1;
        return currentBoard;
    }

    this.readBoard = function(tiles){
        var board = [];
        for(i=0; i<tiles.length; i++){
            board.push(parseInt(tiles[i]));
        }
        this.currentBoard = board;
        return board;
    };

    this.getsLegalMoves = function(zero_location){
        var zeroIndexPlusOne = zero_location + 1;
        return this.legalMovesMap[zeroIndexPlusOne];
    };

    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    this.generateHint = function(tiles){
        var current_state = this.readBoard(tiles);
        var hint_pool = this.sessionMoves;
        var hint_length = hint_pool.length;
        var board_1 = hint_pool[hint_length-1];
        var board_2 = hint_pool[hint_length-2];
        var swapped_tile = board_1.indexOf(0);
        return board_2[swapped_tile];
    };

    this.shufflesBoard = function(sorted, solution, grid_size){
        var zeroLocation = sorted.indexOf(0);
        var iterations = this.getRandomInt(zeroLocation, zeroLocation*2);
        var board = this.solution;

        for(i=0; i<iterations; i++){
            var choices = this.getsLegalMoves(zeroLocation);
            var random_choice = choices[this.getRandomInt(0, choices.length-1)];
            var swapabble = board.indexOf(random_choice);
            var b = board[zeroLocation];
            board[zeroLocation] = board[swapabble];
            board[swapabble] = b;
            var _board = board.slice(0);
            this.sessionMoves.push(_board);
            zeroLocation = swapabble;
        }
        return board;
    };
}
// uncomment below for jasmine tests. comment out for prod
// module.exports = Game;