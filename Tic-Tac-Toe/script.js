document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resultDisplay = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameBoard = Array(9).fill('');
    let gameActive = true;

    createBoard();

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const index = parseInt(clickedCell.getAttribute('data-index'));

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            updateBoard();
            checkWinner();
            switchPlayer();
        }
    }

    function updateBoard() {
        board.childNodes.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                announceWinner(gameBoard[a]);
                return;
            }
        }

        if (!gameBoard.includes('')) {
            announceDraw();
        }
    }

    function announceWinner(winner) {
        resultDisplay.textContent = `Player ${winner} wins!`;
        gameActive = false;
    }

    function announceDraw() {
        resultDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function resetGame() {
        gameBoard = Array(9).fill('');
        currentPlayer = 'X';
        gameActive = true;
        resultDisplay.textContent = '';
        updateBoard();
    }

    resetBtn.addEventListener('click', resetGame);
});



