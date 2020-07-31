import React, { FC } from 'react';
import { block } from 'bem-cn';

import { useGameContext } from '../../../gameLogic';
import './Statistics.scss';

const cn = block('statistics');

const Statistics: FC = () => {
	const { state } = useGameContext(),
		{ revealedCellCount } = state;

	return (
		<div className={cn()}>
			<div className={cn('row')}>
				<span className={cn('prop-name')}>Клеток открыто: </span>
				<span className={cn('prop-value')}>{revealedCellCount}</span>
			</div>
		</div>
	);
};

export default Statistics;
