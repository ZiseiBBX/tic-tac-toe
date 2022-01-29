import P5 from "p5";
import { areEqual } from "./helpers";
import { bestMove, minimax } from "./minimax";
import "./style.css";

export let board: string[][] = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

let players = ["X", "O"];
let currentPlayer: string;

export let human: string;
export let ai: string;

let available: number[][] = [];

export const changeCurrentPlayer = (player: string) => {
	currentPlayer = player;
};

const calculateAvailable = () => {
	available = [];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === "") available.push([i, j]);
		}
	}
};

export const checkWinner = () => {
	let winner = null;

	for (let i = 0; i < 3; i++) {
		if (areEqual(board[i][0], board[i][1], board[i][2])) {
			winner = board[i][0];
			break;
		}
	}

	for (let i = 0; i < 3; i++) {
		if (areEqual(board[0][i], board[1][i], board[2][i])) {
			winner = board[0][i];
			break;
		}
	}

	if (areEqual(board[0][0], board[1][1], board[2][2])) {
		winner = board[0][0];
	} else if (areEqual(board[0][2], board[1][1], board[2][0])) {
		winner = board[0][2];
	}

	if (!winner && available.length === 0) {
		return "tie";
	} else {
		return winner;
	}
};

const sketch = (p5: P5) => {
	p5.setup = () => {
		const canvas = p5.createCanvas(400, 400);
		canvas.parent("app");
		p5.background("white");
		calculateAvailable();
		// currentPlayer = p5.random(players);
		// player1 = currentPlayer;
		// player2 = currentPlayer === players[0] ? players[1] : players[0];

		// if (player1 === players[1]) bestMove();

		// p5.createP(`You are ${player1}`);
		ai = "X";
		human = "O";
		let move = p5.random(available);
		board[move[0]][move[1]] = ai;
		currentPlayer = human;
	};

	p5.draw = () => {
		let w = p5.width / 3;
		let h = p5.height / 3;

		p5.strokeWeight(2);
		p5.line(w, 0, w, p5.height);
		p5.line(w * 2, 0, w * 2, p5.height);
		p5.line(0, h, p5.width, h);
		p5.line(0, h * 2, p5.width, h * 2);

		p5.strokeWeight(10);
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let x = w * j + w / 2;
				let y = h * i + h / 2;
				let square = board[i][j];
				if (square === players[0]) {
					let xr = w / 4;
					p5.line(x - xr, y - xr, x + xr, y + xr);
					p5.line(x + xr, y - xr, x - xr, y + xr);
				} else if (square === players[1]) {
					p5.noFill();
					p5.ellipse(x, y, w / 2);
				}
			}
		}

		let result = checkWinner();

		if (result) {
			p5.noLoop();
			let pResult = p5.createP("");
			pResult.style("textAlign", "center");
			pResult.style("fontSize", "32px");
			pResult.style("color", "black");
			if (result !== "tie") {
				pResult.html(`${result} is the winner`);
			} else if (result === "tie") {
				pResult.html("Tie");
			}
		}
		//nextTurn();
	};

	p5.mousePressed = () => {
		let w = p5.width / 3;
		let h = p5.height / 3;

		if (currentPlayer === human) {
			let i = p5.floor(p5.mouseY / h);
			let j = p5.floor(p5.mouseX / w);

			if (board[i][j] === "") {
				board[i][j] = human;
				currentPlayer = ai;
				bestMove();
			}
		}
		calculateAvailable();
	};
};

new P5(sketch);
