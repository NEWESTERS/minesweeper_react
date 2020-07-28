import { Map as ImmutableMap } from 'immutable';

import { CellGrid, CellRow, CellDataMap } from './types';
import { CellData, CellId } from '../../model/Cell';

function getRandomPositiveInt(max: number) {
	return Math.floor(Math.random() * max);
}

export function generateCellId(row: number, column: number) {
	return `r${row}c${column}`;
}

export function getCellPositionById(cellId: CellId) {
	const match = cellId.match(/\d+/g);

	if (match == null) {
		return null;
	}

	const [row, column] = match;

	return {
		row: Number(row),
		column: Number(column),
	};
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
				data = data.set(cellId, 'M');
				placedCount++;
			}
		}

		const getNumberForCell = getNumberForCellFactory(grid, data);

		grid.forEach((row, rowNum) => {
			row.forEach((cellId, colNum) => {
				if (data.get(cellId) !== 'M') {
					data = data.set(cellId, getNumberForCell(rowNum, colNum));
				}
			});
		});
	}

	return data;
}

function getNumberForCellFactory(grid: CellGrid, data: CellDataMap) {
	const isMine = (cellId?: CellId) => {
		return cellId != null ? data.get(cellId) === 'M' : false;
	};

	return (row: number, column: number) => {
		let count = 0;

		if (row >= 1) {
			const previousRow = grid.get(row - 1);
			if (previousRow !== undefined) {
				if (column >= 1) {
					count += Number(isMine(previousRow.get(column - 1)));
				}
				count += Number(isMine(previousRow.get(column)));
				count += Number(isMine(previousRow.get(column + 1)));
			}
		}

		const currentRow = grid.get(row);
		if (currentRow !== undefined) {
			if (column >= 1) {
				count += Number(isMine(currentRow.get(column - 1)));
			}
			count += Number(isMine(currentRow.get(column)));
			count += Number(isMine(currentRow.get(column + 1)));
		}

		const nextRow = grid.get(row + 1);
		if (nextRow !== undefined) {
			if (column >= 1) {
				count += Number(isMine(nextRow.get(column - 1)));
			}
			count += Number(isMine(nextRow.get(column)));
			count += Number(isMine(nextRow.get(column + 1)));
		}

		return count as CellData;
	};
}
