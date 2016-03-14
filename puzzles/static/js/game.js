function Game(solution, grid_size, legal_moves_map){
    this.solution = solution;
    this.gridSize = grid_size;
    this.blankHtml = '<div class="tile blank_tile disabled"><p>0</p></div>';
    this.legalMovesMap = legal_moves_map;
    this.currentBoard;
    this.sessionMoves = [];
    this.setupMoves = [];
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

    /*this.playsBackSessionMoves = function(){
        var playback = this.sessionMoves;
        for(i=0; i<playback.length; i++){

        }
    };*/

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
        var current_steps = this.sessionMoves;
        if (current_steps.indexOf(tiles) > -1){
            // checks if the current board configuration magically 
            // matches one created during the shufflesBoard setup
            // and then will return the "next step", which is really
            // just going back one item in the setupMoves array
            var board_state = current_steps.indexOf(tiles);
            var hint = current_steps[board_state];
            hint = hint.indexOf(0);
            return hint;
        } else {
            // I started off in the a* search algo path but thought about the 
            // use and audience would take more precendence, and since there
            // isn't really a "best" known solution for this problem, to me, 
            // the best hint would be to have the user retrace their steps to 
            // the beginning of the puzzle, and eventually through to the end
            var step_count = this.sessionMoves.length;
            var hint = this.sessionMoves[step_count-1];
            hint = hint.indexOf(0);
            return hint;
        }
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
module.exports = Game;