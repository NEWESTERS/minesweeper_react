import {
	Map as ImmutableMap,
	Record as ImmutableRecord,
	List as ImmutableList,
} from 'immutable';

import { CellState, CellId } from '../../model/Cell';
import { CellGrid, CellRow, CellStateMap, CellDataMap } from './types';
import {
	generateCellId,
	generateMineFieldData,
	getCellPositionById,
} from './utils';
import { GamePhase } from '../../model/Gameplay';

interface GameRecordStructure {
	data: CellDataMap;
	state: CellStateMap;
	grid: CellGrid;
	height: number;
	width: number;
	mineCount: number;
	gamePhase: GamePhase;
}

type GameRecord = ImmutableRecord<GameRecordStructure>;

const gameRecordFactory = ImmutableRecord<GameRecordStructure>({
	data: ImmutableMap(),
	state: ImmutableMap(),
	grid: ImmutableList(),
	height: 0,
	width: 0,
	mineCount: 0,
	gamePhase: GamePhase.None,
});

class GameState {
	private _gameRecord: GameRecord;

	constructor(gameRecord: GameRecord) {
		this._gameRecord = gameRecord;
	}

	private get _state() {
		return this._gameRecord.get('state');
	}

	private get _data() {
		return this._gameRecord.get('data');
	}

	public get width() {
		return this._gameRecord.get('width');
	}

	public get height() {
		return this._gameRecord.get('height');
	}

	public get mineCount() {
		return this._gameRecord.get('mineCount');
	}

	public get revealedCellCount() {
		return this._state.filter(cellState => cellState === CellState.Revealed)
			.size;
	}

	static createEmpty() {
		return new GameState(gameRecordFactory());
	}

	static createWithGrid(height: number, width: number, mineCount: number) {
		let grid: CellGrid = ImmutableList(),
			state: CellStateMap = ImmutableMap();

		for (let y = 0; y < height; y++) {
			let row: CellRow = ImmutableList();

			for (let x = 0; x < width; x++) {
				const cellId = generateCellId(y, x);

				row = row.push(cellId);
				state = state.set(cellId, CellState.Closed);
			}

			grid = grid.push(row);
		}

		const data = generateMineFieldData(grid, mineCount);

		return new GameState(
			gameRecordFactory({
				data,
				state,
				grid,
				height,
				width,
				mineCount,
				gamePhase: GamePhase.InProgress,
			})
		);
	}

	public get grid() {
		return this._gameRecord.get('grid');
	}

	public get gamePhase() {
		return this._gameRecord.get('gamePhase');
	}

	public getCellData(cellId: CellId) {
		return this._data.get(cellId);
	}

	public getCellState(cellId: CellId) {
		return this._state.get(cellId);
	}

	private _setGamePhase(phase: GamePhase) {
		return new GameState(this._gameRecord.set('gamePhase', phase));
	}

	private _setState(state: CellStateMap) {
		return new GameState(this._gameRecord.set('state', state));
	}

	private _getCellsAround(cellId: CellId) {
		const cellsAround: CellId[] = [],
			pos = getCellPositionById(cellId);

		if (pos != null) {
			const { row, column } = pos;

			[-1, 0, 1].forEach(rowOffset => {
				[-1, 0, 1].forEach(columnOffset => {
					if (rowOffset !== 0 || columnOffset !== 0) {
						const nearCellRow = row + rowOffset,
							nearCellColumn = column + columnOffset;

						if (
							nearCellRow >= 0 &&
							nearCellRow <= this.height - 1 &&
							nearCellColumn >= 0 &&
							nearCellColumn <= this.width - 1
						) {
							cellsAround.push(
								generateCellId(nearCellRow, nearCellColumn)
							);
						}
					}
				});
			});
		}
		return cellsAround;
	}

	private _revealCell(cellId: CellId) {
		let newGameState: GameState = this;

		newGameState = newGameState._setCellState(cellId, CellState.Revealed);

		if (this.getCellData(cellId) === 'M') {
			newGameState = newGameState._setGamePhase(GamePhase.Lost);
		}

		return newGameState;
	}

	private _setCellState(cellId: CellId, state: CellState) {
		const newState = this._state.set(cellId, state);

		return this._setState(newState);
	}

	private _activateClosedCell(cellId: CellId) {
		let newGameState: GameState = this;

		const cellState = this.getCellState(cellId),
			cellData = this.getCellData(cellId);

		if (cellState === CellState.Closed) {
			newGameState = newGameState._revealCell(cellId);
		}

		if (cellData === 0) {
			this._getCellsAround(cellId).forEach(cellId => {
				if (newGameState.getCellState(cellId) === CellState.Closed) {
					newGameState = newGameState._activateClosedCell(cellId);
				}
			});
		}

		return newGameState;
	}

	private _activateRevealedCell(cellId: CellId) {
		let newGameState: GameState = this;

		const cellData = this.getCellData(cellId),
			cellsAround = this._getCellsAround(cellId),
			flaggedCellCount = cellsAround.filter(
				cellId => this.getCellState(cellId) === CellState.Flagged
			).length;

		if (cellData === flaggedCellCount) {
			this._getCellsAround(cellId).forEach(cellId => {
				if (newGameState.getCellState(cellId) === CellState.Closed) {
					newGameState = newGameState._activateClosedCell(cellId);
				}
			});
		}

		return newGameState;
	}

	public activateCell(cellId: CellId) {
		let newGameState: GameState = this;

		const cellState = this.getCellState(cellId);

		switch (cellState) {
			case CellState.Closed:
				newGameState = newGameState._activateClosedCell(cellId);
				break;

			case CellState.Revealed:
				newGameState = newGameState._activateRevealedCell(cellId);
				break;
		}

		if (
			newGameState.revealedCellCount ===
			newGameState.width * newGameState.height - newGameState.mineCount
		) {
			newGameState = newGameState._setGamePhase(GamePhase.Won);
		}

		return newGameState;
	}

	public markCell(cellId: CellId) {
		const cellState = this.getCellState(cellId);

		switch (cellState) {
			case CellState.Closed:
				return this._setCellState(cellId, CellState.Flagged);

			case CellState.Flagged:
				return this._setCellState(cellId, CellState.Unknown);

			case CellState.Unknown:
				return this._setCellState(cellId, CellState.Closed);

			default:
				return this;
		}
	}
}

export default GameState;
