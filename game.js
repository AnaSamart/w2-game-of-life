//Crea un tablero que se rellena con 0 y 1 aleatorios
function createBoard(rows, cols) {
  let board = new Array(rows);
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      board[i][j] = Math.round(Math.random());
    }
  }
  return board;
}

let myArr = createBoard(15, 15);

//Clona el tablero y le pasa las condiciones para que mate o reviva elementos
function setBoard(arr) {
  let newBoard = arr.map((arr) => [...arr]);
  for (let i = 1; i < arr.length - 1; i++) {
    for (let j = 1; j < arr.length - 1; j++) {
      let actualState = arr[i][j];
      let neighbors = countNeighbors(arr, i, j);

      if (actualState === 0 && neighbors === 3) {
        newBoard[i][j] = 1;
      } else if (actualState === 1 && (neighbors < 2 || neighbors > 3)) {
        newBoard[i][j] = 0;
      } else {
        newBoard[i][j] = actualState;
      }
    }
  }
  myArr = newBoard;
}

//Cuenta los vecinos vivos
function countNeighbors(arr, i, j) {
  let sum = 0;
  if (arr[i - 1][j - 1]) {
    sum++;
  }
  if (arr[i - 1][j]) {
    sum++;
  }
  if (arr[i - 1][j + 1]) {
    sum++;
  }
  if (arr[i][j - 1]) {
    sum++;
  }
  if (arr[i][j + 1]) {
    sum++;
  }
  if (arr[i + 1][j - 1]) {
    sum++;
  }
  if (arr[i + 1][j]) {
    sum++;
  }
  if (arr[i + 1][j + 1]) {
    sum++;
  }
  return sum;
}

//Pinta el tablero en html creando divs y les da una clase
function createTable(arr) {
  const container = document.querySelector('.grid');
  //Crea un nuevo tablero en blanco cada vez
  if (container.firstChild) {
    container.innerHTML = "<div class='grid'></div>";
  }
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);
    for (let j = 0; j < arr.length; j++) {
      const col = document.createElement('div');
      col.classList.add('col');
      col.innerText = arr[i][j];
      //le da la clase black a las celdas con 1
      if (arr[i][j] === 1) {
        col.classList.add('black');
      } else {
        col.classList.remove('black');
      }
      row.appendChild(col);
    }
  }
}

createTable(myArr);

setInterval(() => {
  setBoard(myArr);
  createTable(myArr);
}, 1000);
