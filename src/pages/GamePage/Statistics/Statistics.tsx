import React, { FC } from 'react';
import { block } from 'bem-cn';

import { useGameContext } from '../../../gameLogic';
import { GamePhase } from '../../../model';
import './Statistics.scss';

const cn = block('statistics');

const Statistics: FC = () => {
	const { state } = useGameContext(),
		{ revealedCellCount, gamePhase } = state;

	return (
		<div className={cn()}>
			{gamePhase === GamePhase.Won && (
				<div className={cn('win')}>Вы победили</div>
			)}

			{gamePhase === GamePhase.Lost && (
				<div className={cn('lose')}>Вы проиграли</div>
			)}

			<div className={cn('row')}>
				<span className={cn('prop-name')}>Клеток открыто: </span>
				<span className={cn('prop-value')}>{revealedCellCount}</span>
			</div>
		</div>
	);
};

export default Statistics;
