import React, { FC } from 'react';
import { block } from 'bem-cn';

import { Cell } from '../../../../components/Cell';
import { useGameContext } from '../../../../gameLogic';
import { getCellContent, getCellModifierByState } from './utils';
import './GameCell.scss';

const cn = block('game-cell');

interface Props {
	cellId: string;
}

const GameCell: FC<Props> = props => {
	const { cellId } = props,
		{ state, onMainInteraction, onSecondaryInteraction } = useGameContext(),
		cellState = state.getCellState(cellId),
		cellData = state.getCellData(cellId);

	if (cellState == null || cellData == null) {
		return null;
	}

	return (
		<Cell
			className={cn({ state: getCellModifierByState(cellState) })}
			onLeftClick={() => onMainInteraction(cellId)}
			onRightClick={() => onSecondaryInteraction(cellId)}
		>
			{getCellContent(cellState, cellData)}
		</Cell>
	);
};

export default GameCell;
