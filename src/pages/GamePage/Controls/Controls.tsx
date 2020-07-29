import React, { FC } from 'react';
import { block } from 'bem-cn';

import { useGameContext } from '../../../gameLogic';
import { getInteractionModeTitle } from './utils';
import './Controls.scss';

const cn = block('controls');

const Controls: FC = () => {
	const { mainInteractionMode, switchMainInteractionMode } = useGameContext();

	return (
		<div className={cn()}>
			<button
				className={cn('switch-button')}
				onClick={switchMainInteractionMode}
			>
				{getInteractionModeTitle(mainInteractionMode)}
			</button>
		</div>
	);
};

export default Controls;
