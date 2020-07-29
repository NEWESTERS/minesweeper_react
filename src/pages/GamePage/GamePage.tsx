import React, { FC } from 'react';
import { block } from 'bem-cn';

import { GameProvider } from '../../gameLogic';
import { Statistics } from './Statistics';
import { GameField } from './GameField';
import './GamePage.scss';
import { Controls } from './Controls';

const cn = block('game-page');

interface Props {
	className?: string;
}

const GamePage: FC<Props> = props => {
	const { className } = props;

	return (
		<GameProvider width={30} height={30} mineCount={150}>
			<div className={cn.mix(className)}>
				<Statistics />
				<Controls />
				<GameField />
			</div>
		</GameProvider>
	);
};

export default GamePage;
