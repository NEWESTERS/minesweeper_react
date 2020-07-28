import React, { FC, MouseEvent } from 'react';
import { block } from 'bem-cn';

import { CellState, CellData } from '../../model/Cell';
import { getCellModifierByState } from './utils';
import './Cell.scss';

const cn = block('cell');

interface Props {
	className?: string;
	data: CellData;
	state: CellState;
	onLeftClick?: () => void;
	onRightClick?: () => void;
}

const Cell: FC<Props> = props => {
	const { className, state, data, onLeftClick, onRightClick } = props;

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.button === 0) {
			onLeftClick && onLeftClick();
		} else if (event.button === 2) {
			onRightClick && onRightClick();
		}
	};

	return (
		<div
			className={cn({ state: getCellModifierByState(state) }).mix(
				className
			)}
			onMouseDown={handleClick}
			onContextMenu={e => e.preventDefault()}
		>
			{getCellContent(state, data)}
		</div>
	);
};

function getCellContent(state: CellState, data: CellData) {
	switch (state) {
		case CellState.Closed:
			return '';

		case CellState.Unknown:
			return '?';

		case CellState.Flagged:
			return 'F';

		case CellState.Revealed:
			return data === 0 ? '' : data;
	}
}

export default Cell;
