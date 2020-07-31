import React, { FC } from 'react';
import { block } from 'bem-cn';

import { GameProvider } from '../../gameLogic';
import { Statistics } from './Statistics';
import { GameField } from './GameField';
import { Controls } from './Controls';
import { GameResult } from './GameResult';
import './GamePage.scss';

const cn = block('game-page');

interface Props {
	className?: string;
}

const GamePage: FC<Props> = props => {
	const { className } = props;

	return (
		<GameProvider width={30} height={30} mineCount={150}>
			<GameResult />

			<div className={cn.mix(className)}>
				<div className={cn('header')}>
					<Statistics />

					<Controls />
				</div>

				<GameField />
			</div>
		</GameProvider>
	);
};

export default GamePage;
