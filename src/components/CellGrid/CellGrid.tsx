import React, { FC } from 'react';
import { block } from 'bem-cn';

import { GameState } from '../../gameLogic/GameState';
import { Cell } from '../Cell';
import { CellId } from '../../model/Cell';
import './CellGrid.scss';

const cn = block('cell-grid');

interface Props {
	gameState: GameState;
	onCellLeftClick: (cellId: string) => void;
	onCellRightClick: (cellId: string) => void;
}

const CellGrid: FC<Props> = props => {
	const { gameState, onCellLeftClick, onCellRightClick } = props;

	const renderCell = (cellId: CellId) => {
		const cellData = gameState.getCellData(cellId),
			cellState = gameState.getCellState(cellId);

		if (cellData == null || cellState == null) {
			return null;
		}

		return (
			<Cell
				key={cellId}
				className={cn('cell')}
				data={cellData}
				state={cellState}
				onLeftClick={() => onCellLeftClick(cellId)}
				onRightClick={() => onCellRightClick(cellId)}
			/>
		);
	};

	return (
		<div className={cn()}>
			{gameState.grid.map((row, key) => (
				<div key={key} className={cn('row')}>
					{row.map(renderCell)}
				</div>
			))}
		</div>
	);
};

export default CellGrid;
