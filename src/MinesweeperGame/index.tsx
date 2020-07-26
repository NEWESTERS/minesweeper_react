import React from 'react';

import './index.scss';

interface IProps {
	columns: number;
	rows: number;
	mines: number;
}

type GameObject = number | 'M';
type CellState = 'F' | '?' | 'C' | 'R';
type GameResult = 'WIN' | 'LOSE' | 'IN PROGRESS';

interface IState {
	boardValues: Array<Array<GameObject>>;
	boardState: Array<Array<CellState>>;
	minesRemaining: number;
	cellsRemeining: number;
	gameResult: GameResult;
	clickMode: 'reveal' | 'mark';
}

export default class Minesweeper extends React.Component<IProps, IState> {
	public state: IState = {
		boardValues: [],
		boardState: [],
		minesRemaining: 0,
		cellsRemeining: 0,
		gameResult: 'IN PROGRESS',
		clickMode: 'reveal',
	};

	componentDidMount() {
		const { columns, rows, mines } = this.props;

		let boardValues: Array<Array<GameObject>> = Array.apply(
				null,
				Array(rows)
			).map(() => Array.apply(null, Array(columns)).map(() => {})) as any,
			boardState: Array<Array<CellState>> = Array.apply(
				null,
				Array(rows)
			).map(() => Array.apply(null, Array(columns)).map(() => 'C'));

		let placed = 0;

		while (placed < mines) {
			let column = Math.floor(Math.random() * columns);
			let row = Math.floor(Math.random() * rows);
			if (boardValues[row][column] != 'M') {
				boardValues[row][column] = 'M';
				placed++;
			}
		}

		boardValues = boardValues.map((row, rowIndex) =>
			row.map((cell, columnIndex) => {
				if (cell != 'M') {
					return this.getNumberForCell(
						boardValues,
						rowIndex,
						columnIndex
					);
				} else {
					return cell;
				}
			})
		);

		this.setState({
			boardValues,
			boardState,
			minesRemaining: mines,
			cellsRemeining: rows * columns,
		});
	}

	getNumberForCell = (
		boardValues: Array<Array<GameObject>>,
		row: number,
		column: number
	): number => {
		let count = 0;

		if (boardValues[row - 1] !== undefined) {
			count += boardValues[row - 1][column - 1] == 'M' ? 1 : 0;
			count += boardValues[row - 1][column] == 'M' ? 1 : 0;
			count += boardValues[row - 1][column + 1] == 'M' ? 1 : 0;
		}

		if (boardValues[row] !== undefined) {
			count += boardValues[row][column - 1] == 'M' ? 1 : 0;
			count += boardValues[row][column] == 'M' ? 1 : 0;
			count += boardValues[row][column + 1] == 'M' ? 1 : 0;
		}

		if (boardValues[row + 1] !== undefined) {
			count += boardValues[row + 1][column - 1] == 'M' ? 1 : 0;
			count += boardValues[row + 1][column] == 'M' ? 1 : 0;
			count += boardValues[row + 1][column + 1] == 'M' ? 1 : 0;
		}

		return count;
	};

	onCellСlick = (
		e: React.MouseEvent<HTMLDivElement>,
		rowIndex: number,
		columnIndex: number
	) => {
		const boardState = [...this.state.boardState.map(row => [...row])];

		switch (this.state.clickMode) {
			case 'reveal':
				switch (e.button) {
					case 0:
						this.revealCell(boardState, rowIndex, columnIndex);
						break;

					case 2:
						e.preventDefault();
						this.markCell(boardState, rowIndex, columnIndex);
						break;
				}
				break;

			case 'mark':
				this.markCell(boardState, rowIndex, columnIndex);
				break;
		}

		this.setState({ boardState });
	};

	markCell = (
		boardState: Array<Array<CellState>>,
		rowIndex: number,
		columnIndex: number
	) => {
		switch (boardState[rowIndex][columnIndex]) {
			case 'C':
				boardState[rowIndex][columnIndex] = 'F';
				this.setState(({ cellsRemeining, minesRemaining }) => ({
					cellsRemeining: cellsRemeining - 1,
					minesRemaining: minesRemaining - 1,
				}));
				break;

			case 'F':
				boardState[rowIndex][columnIndex] = '?';
				this.setState(({ cellsRemeining, minesRemaining }) => ({
					cellsRemeining: cellsRemeining + 1,
					minesRemaining: minesRemaining + 1,
				}));
				break;

			case '?':
				boardState[rowIndex][columnIndex] = 'C';
				break;
		}
	};

	revealCell = (
		boardState: Array<Array<CellState>>,
		rowIndex: number,
		columnIndex: number
	) => {
		const { boardValues } = this.state,
			{ columns, rows } = this.props;

		if (boardState[rowIndex][columnIndex] !== 'C') return;

		boardState[rowIndex][columnIndex] = 'R';
		this.setState(({ cellsRemeining }) => ({
			cellsRemeining: cellsRemeining - 1,
		}));

		if (boardValues[rowIndex][columnIndex] == 'M') {
			this.gameOver();
		} else if (boardValues[rowIndex][columnIndex] === 0) {
			if (columnIndex > 0 && boardState[rowIndex][columnIndex - 1] == 'C')
				this.revealCell(boardState, rowIndex, columnIndex - 1);

			if (
				columnIndex < columns - 1 &&
				boardState[rowIndex][columnIndex + 1] == 'C'
			)
				this.revealCell(boardState, rowIndex, columnIndex + 1);

			if (
				rowIndex < rows - 1 &&
				boardState[rowIndex + 1][columnIndex] == 'C'
			)
				this.revealCell(boardState, rowIndex + 1, columnIndex);

			if (rowIndex > 0 && boardState[rowIndex - 1][columnIndex] == 'C')
				this.revealCell(boardState, rowIndex - 1, columnIndex);

			if (
				columnIndex > 0 &&
				rowIndex > 0 &&
				boardState[rowIndex - 1][columnIndex - 1] == 'C'
			)
				this.revealCell(boardState, rowIndex - 1, columnIndex - 1);

			if (
				columnIndex > 0 &&
				rowIndex < rows - 1 &&
				boardState[rowIndex + 1][columnIndex - 1] == 'C'
			)
				this.revealCell(boardState, rowIndex + 1, columnIndex - 1);

			if (
				columnIndex < columns - 1 &&
				rowIndex < rows - 1 &&
				boardState[rowIndex + 1][columnIndex + 1] == 'C'
			)
				this.revealCell(boardState, rowIndex + 1, columnIndex + 1);

			if (
				columnIndex < columns - 1 &&
				rowIndex > 0 &&
				boardState[rowIndex - 1][columnIndex + 1] == 'C'
			)
				this.revealCell(boardState, rowIndex - 1, columnIndex + 1);
		}
	};

	gameOver = () => {
		this.setState({ gameResult: 'LOSE' });
	};

	switchClickMode = () => {
		this.setState(({ clickMode }) => {
			switch (clickMode) {
				case 'reveal':
					return { clickMode: 'mark' };

				case 'mark':
					return { clickMode: 'reveal' };
			}
		});
	};

	componentDidUpdate() {
		if (
			this.state.cellsRemeining == this.state.minesRemaining &&
			this.state.gameResult !== 'WIN'
		) {
			this.setState({ gameResult: 'WIN' });
		}
	}

	render() {
		const {
			boardValues,
			boardState,
			minesRemaining,
			cellsRemeining,
			gameResult,
			clickMode,
		} = this.state;

		return (
			<div
				className={`minesweeper-field${
					gameResult == 'LOSE' || gameResult == 'WIN'
						? ' disabled'
						: ''
				}`}
			>
				<div className="info">
					<h2>Осталось мин: {minesRemaining}</h2>
					<h2>Осталось клеток: {cellsRemeining}</h2>
					<div
						className={`switch-mode ${clickMode}`}
						onClick={this.switchClickMode}
					/>
				</div>

				{boardValues.map((row, rowIndex) => (
					<div className="row" key={rowIndex}>
						{row.map((cell, cellIndex) => {
							let displayedValue: string, cellClass: string;

							switch (boardState[rowIndex][cellIndex]) {
								case 'R':
									displayedValue =
										cell !== 0 ? `${cell}` : '';
									cellClass = ' revealed';
									break;

								case 'F':
									displayedValue = 'F';
									cellClass = ' flagged';
									break;

								case '?':
									displayedValue = '?';
									cellClass = ' unknown';
									break;

								default:
									displayedValue = '';
									cellClass = '';
									break;
							}

							return (
								<div
									key={`${rowIndex}:${cellIndex}`}
									className={'cell' + cellClass}
									onMouseUp={e =>
										this.onCellСlick(e, rowIndex, cellIndex)
									}
									onContextMenu={e => e.preventDefault()}
								>
									{displayedValue}
								</div>
							);
						})}
					</div>
				))}

				<h2>
					{gameResult == 'WIN' && 'Вы победили!'}
					{gameResult == 'LOSE' && 'Вы проиграли'}
				</h2>
			</div>
		);
	}
}
