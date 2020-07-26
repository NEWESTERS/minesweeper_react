import { Map as ImmutableMap } from 'immutable';

import { CellGrid, CellId, CellRow, CellDataMap } from './types';
import { CellData } from '../../model/Cell';

function getRandomPositiveInt(max: number) {
	return Math.floor(Math.random() * max);
}

export function generateCellId(row: number, column: number) {
	return `r${row}c${column}`;
}

export function generateMineFieldData(
	grid: CellGrid,
	mineCount: number
): CellDataMap {
	let data: CellDataMap = ImmutableMap();

	const rowCount = grid.size,
		columnCount = grid.first<CellRow | undefined>()?.size;

	if (rowCount && columnCount) {
		let placedCount = 0;

		while (placedCount < mineCount) {
			const row = getRandomPositiveInt(rowCount),
				column = getRandomPositiveInt(columnCount),
				cellId = generateCellId(row, column);

			if (data.get(cellId) !== 'M') {
				data.setIn(cellId, 'M');
				placedCount++;
			}
		}

		const getNumberForCell = getNumberForCellFactory(grid, data);

		grid.forEach((row, rowNum) => {
			row.forEach((cellId, colNum) => {
				data.setIn(cellId, getNumberForCell(rowNum, colNum));
			});
		});
	}

	return data;
}

function getNumberForCellFactory(grid: CellGrid, data: CellDataMap) {
	const isMine = (cellId?: CellId) => {
		return cellId != null ? data.get(cellId) === 'M' : false;
	};

	return (row: number, column: number): number => {
		let count = 0;

		const previousRow = grid.get(row - 1);
		if (previousRow !== undefined) {
			count += Number(isMine(previousRow.get(column - 1)));
			count += Number(isMine(previousRow.get(column)));
			count += Number(isMine(previousRow.get(column + 1)));
		}

		const currentRow = grid.get(row);
		if (currentRow !== undefined) {
			count += Number(isMine(currentRow.get(column - 1)));
			count += Number(isMine(currentRow.get(column)));
			count += Number(isMine(currentRow.get(column + 1)));
		}

		const nextRow = grid.get(row + 1);
		if (nextRow !== undefined) {
			count += Number(isMine(nextRow.get(column - 1)));
			count += Number(isMine(nextRow.get(column)));
			count += Number(isMine(nextRow.get(column + 1)));
		}

		return count;
	};
}
