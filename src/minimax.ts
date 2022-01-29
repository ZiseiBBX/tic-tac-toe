import { ai, board, changeCurrentPlayer, checkWinner, human } from "./main";

let scores: { [key: string]: number } = {
	X: 1,
	O: -1,
	tie: 0,
};

export const bestMove = () => {
	let bestScore = -Infinity;
	let move = { i: -1, j: -1 };

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === "") {
				board[i][j] = ai;
				let score = minimax(board, false, 0);
				board[i][j] = "";
				if (score > bestScore) {
					bestScore = score;
					move = { i, j };
				}
			}
		}
	}

	board[move.i][move.j] = ai;
  changeCurrentPlayer(human)

	// calculateAvailable();
	// let square = p5.random(available);
	// if (square) {
	// 	let index = available.indexOf(square);
	// 	available.splice(index, 1);
	// 	board[square[0]][square[1]] = currentPlayer;

	// 	currentPlayer = player1;
	// }
};

export const minimax = (board: string[][], isMaximizing: boolean, depth: number) => {
	let result = checkWinner();

	if (result !== null) {
		return scores[result];
	}

	if (isMaximizing) {
		let bestScore = -Infinity;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] === "") {
					board[i][j] = ai;
					let score = minimax(board, false, depth + 1);
					board[i][j] = "";
					bestScore = Math.max(score, bestScore);
				}
			}
		}
		return bestScore;
	} else {
		let bestScore = +Infinity;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] === "") {
					board[i][j] = human;
					let score = minimax(board, true, depth + 1);
					board[i][j] = "";
					bestScore = Math.min(score, bestScore);
				}
			}
		}
		return bestScore;
	}
};
