import { CellState, CellData } from '../../../../model/Cell';

const CELL_STATE_MODIFIERS = {
	[CellState.Closed]: 'closed',
	[CellState.Flagged]: 'flagged',
	[CellState.Revealed]: 'revealed',
	[CellState.Unknown]: 'unknown',
};

export function getCellModifierByState(state: CellState) {
	return CELL_STATE_MODIFIERS[state];
}

export function getCellContent(state: CellState, data: CellData) {
	switch (state) {
		case CellState.Closed:
			return '';

		case CellState.Unknown:
			return '❓';

		case CellState.Flagged:
			return '🚩';

		case CellState.Revealed:
			return data === 0 ? '' : data === 'M' ? '💣' : data;
	}
}
