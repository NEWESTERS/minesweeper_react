import React, { FC, useState } from 'react';
import { block } from 'bem-cn';

import { useGameContext } from '../../../gameLogic';
import { GamePhase } from '../../../model';
import './GameResult.scss';

const cn = block('game-result');

const GameResult: FC = () => {
	const { state } = useGameContext(),
		{ gamePhase } = state;

	switch (gamePhase) {
		case GamePhase.Won:
			return (
				<div className={cn('bg')}>
					<span className={cn('text', { type: 'won' })}>
						Вы победили
					</span>
				</div>
			);

		case GamePhase.Lost:
			return (
				<div className={cn('bg')}>
					<span className={cn('text', { type: 'lost' })}>
						Вы проиграли
					</span>
				</div>
			);

		default:
			return null;
	}
};

export default GameResult;
