import { CellState } from '../../model/Cell';

const CELL_STATE_MODIFIERS = {
	[CellState.Closed]: 'closed',
	[CellState.Flagged]: 'flagged',
	[CellState.Revealed]: 'revealed',
	[CellState.Unknown]: 'unknown',
};

export function getCellModifierByState(state: CellState) {
	return CELL_STATE_MODIFIERS[state];
}
