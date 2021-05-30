const size = 9; // board size

const firstBox = [
  // represents a single 3x3 unit
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

// solves a given board
function solve(board) {
  if (solved(board)) {
    return board;
  } else {
    let allBoards = possibleBoards(board);
    return solveBoards(validBoards(allBoards));
  }
}

// takes a list of board as parameter and allows backtracking
function solveBoards(boards) {
  if (boards.length == 0) {
    return false;
  } else {
    let firstBoard = solve(boards.shift());
    if (firstBoard != false) {
      return firstBoard;
    } else {
      return solveBoards(boards);
    }
  }
}

// returns true if the  board is solved
function solved(board) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
}

// produces a list of possible boards
function possibleBoards(board) {
  let coordinate = nextEmpty(board);
  let boards = [];
  for (let i = 1; i <= 9; i++) {
    let newBoard = board.map(function (arr) {
      return arr.slice();
    });
    newBoard[coordinate[0]][coordinate[1]] = i;
    boards.push(newBoard);
  }
  return boards;
}

// filters valid boards from given list of boards
function validBoards(boards) {
  return boards.filter(validBoard);
}

// returns true if the board is valid
function validBoard(board) {
  return validRows(board) && validColumns(board) && validBoxes(board);
}

// returns true if the board has valid boxes
function validBoxes(board) {
  for (let k = 0; k < 9; k += 3) {
    for (let i = 0; i < 9; i += 3) {
      let nums = [];
      for (let j = 0; j < 9; j++) {
        let row = firstBox[j][0] + k;
        let col = firstBox[j][1] + i;
        if (nums.includes(board[row][col])) {
          return false;
        } else {
          if (board[row][col] != 0) {
            nums.push(board[row][col]);
          }
        }
      }
    }
  }
  return true;
}

// checks if the board has valid columns
function validColumns(board) {
  for (let i = 0; i < 9; i++) {
    let nums = [];
    for (let j = 0; j < 9; j++) {
      if (nums.includes(board[j][i])) {
        return false;
      } else {
        if (board[j][i] != 0) {
          nums.push(board[j][i]);
        }
      }
    }
  }
  return true;
}

// checks if the board has valid rows
function validRows(board) {
  for (let i = 0; i < 9; i++) {
    let nums = [];
    for (let j = 0; j < 9; j++) {
      if (nums.includes(board[i][j])) {
        return false;
      } else {
        if (board[i][j] != 0) {
          nums.push(board[i][j]);
        }
      }
    }
  }
  return true;
}

// returns an array of coordinate of next empty slot in [x,y]
function nextEmpty(board) {
  let coordinate = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        coordinate[0] = i;
        coordinate[1] = j;
        return coordinate;
      }
    }
  }
}

// creates an empty board with 0s in every slot
function makeEmptyBoard() {
  let myArray = new Array(size);
  for (i = 0; i < size; i++) {
    myArray[i] = [];
    for (let j = 0; j < size; j++) {
      myArray[i][j] = 0;
    }
  }
  return myArray;
}

// retrieves board from the values in html elements
function retrieveBoard() {
  let emptyBoard = makeEmptyBoard();
  count = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      num = parseInt(document.getElementById(count.toString()).value);
      if (!isNaN(num)) {
        emptyBoard[i][j] = num;
      }
      count++;
    }
  }
  return emptyBoard;
}

// updates the solve board onto html elements
function updateBoard(board) {
  count = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let element = document.getElementById(count.toString());
      element.value = board[i][j];
      element.style.color = "#e74c3c";
      element.disabled = true;
      count++;
    }
  }
}

// solves the board retrieved from the webpage
function main() {
  let board = retrieveBoard();
  console.log(board);
  if (!validateBoard(board)) {
    alert("Unsolvable");
  } else {
    let solvedBoard = solve(board);
    if (solvedBoard == false) {
      alert("Unsolvable");
    } else {
      updateBoard(solvedBoard);
    }
  }
}

// returns true if the board does not contain any illegal values
function validateBoard(board) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let element = board[i][j];
      if (element > 9 || element < 0) {
        return false;
      }
    }
  }
  return true;
}

// resets the board
function reset() {
  count = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let element = document.getElementById(count.toString());
      element.value = "";
      element.style.color = "black";
      element.disabled = false;
      count++;
    }
  }
}
