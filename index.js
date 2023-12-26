document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const result = document.getElementById("result");
    const cells = document.querySelectorAll(".cell");

    let currentPlayer = "X";
    let boardState = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    function checkWinner() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (boardState[i][0] !== "" && boardState[i][0] === boardState[i][1] && boardState[i][1] === boardState[i][2]) {
                return boardState[i][0];
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            if (boardState[0][j] !== "" && boardState[0][j] === boardState[1][j] && boardState[1][j] === boardState[2][j]) {
                return boardState[0][j];
            }
        }

        // Check diagonals
        if (boardState[0][0] !== "" && boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2]) {
            return boardState[0][0];
        }

        if (boardState[0][2] !== "" && boardState[0][2] === boardState[1][1] && boardState[1][1] === boardState[2][0]) {
            return boardState[0][2];
        }

        // Check for a tie
        if (!boardState.flat().includes("")) {
            return "TIE";
        }

        return null;
    }

    function updateResult(winner) {
        if (winner === "TIE") {
            result.textContent = "It's a tie!";
        } else {
            result.textContent = `Player ${winner} wins!`;
        }
    }

    function makeMove(row, col) {
        if (boardState[row][col] === "" && !checkWinner()) {
            boardState[row][col] = currentPlayer;
            cells[row * 3 + col].textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                updateResult(winner);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.addEventListener("click", () => makeMove(row, col));
    });
});
