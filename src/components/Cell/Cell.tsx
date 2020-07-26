import React, { FC } from 'react';
import { block } from 'bem-cn';

import { CellState } from '../../model/Cell';
import { getCellModifierByState } from './utils';
import './Cell.scss';

const cn = block('cell');

interface Props {
	className?: string;
	state: CellState;
}

const Cell: FC<Props> = props => {
	const { className, state } = props;

	return (
		<div
			className={cn({ state: getCellModifierByState(state) }).mix(
				className
			)}
		>
			{state}
		</div>
	);
};

export default Cell;
