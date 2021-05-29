const size = 9;
const b = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const b1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0],
];

const firstBox = [
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

const b3 = [...b1];

function solve(board) {
  if (solved(board)) {
    return board;
  } else {
    let allBoards = possibleBoards(board);
    return solveBoards(validBoards(allBoards));
  }
}

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

function validBoards(boards) {
  return boards.filter(validBoard);
}

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

function validBoard(board) {
  return validRows(board) && validColumns(board) && validBoxes(board);
}

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
