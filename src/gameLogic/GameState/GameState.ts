import {
	Map as ImmutableMap,
	Record as ImmutableRecord,
	List as ImmutableList,
} from 'immutable';

import { CellState } from '../../model/Cell';
import { CellId, CellGrid, CellRow, CellStateMap, CellDataMap } from './types';
import { generateCellId, generateMineFieldData } from './utils';

interface GameRecordStructure {
	data: CellDataMap;
	state: CellStateMap;
	grid: CellGrid;
}

type GameRecord = ImmutableRecord<GameRecordStructure>;

const gameRecordFactory = ImmutableRecord<GameRecordStructure>({
	data: ImmutableMap(),
	state: ImmutableMap(),
	grid: ImmutableList(),
});

class GameState {
	private _gameRecord: GameRecord;

	constructor(gameRecord: GameRecord) {
		this._gameRecord = gameRecord;
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
				state.setIn(cellId, CellState.Closed);
			}

			grid = grid.push(row);
		}

		const data = generateMineFieldData(grid, mineCount);

		return new GameState(
			gameRecordFactory({
				data,
				state,
				grid,
			})
		);
	}

	private get state() {
		return this._gameRecord.get('state');
	}

	private get data() {
		return this._gameRecord.get('data');
	}

	public get grid() {
		return this._gameRecord.get('grid');
	}

	public getCellData(cellId: CellId) {
		return this.data.get(cellId);
	}

	public getCellState(cellId: CellId) {
		return this.state.get(cellId);
	}

	public getRow(rowNum: number) {
		return this.grid.get(rowNum);
	}

	public setCellState(cellId: CellId, cellState: CellState) {
		const newState = this.state.setIn(cellId, cellState),
			newGameRecord = this._gameRecord.setIn('state', newState);

		return new GameState(newGameRecord);
	}
}

export default GameState;
