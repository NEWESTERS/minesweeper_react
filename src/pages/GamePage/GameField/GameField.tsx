import React, { FC } from 'react';
import { block } from 'bem-cn';

import { useGameContext } from '../../../gameLogic';
import { CellGrid } from '../../../components/CellGrid';
import { CellRow } from '../../../components/CellRow';
import { GameCell } from './GameCell';
import './GameField.scss';

const cn = block('game-field');

const GameField: FC = () => {
	const { state } = useGameContext();

	return (
		<div className={cn()}>
			<CellGrid className={cn('grid')}>
				{state.grid.map((row, rowKey) => (
					<CellRow key={rowKey}>
						{row.map(cellId => (
							<GameCell key={cellId} cellId={cellId} />
						))}
					</CellRow>
				))}
			</CellGrid>
		</div>
	);
};

export default GameField;
