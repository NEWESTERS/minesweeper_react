import React, { FC } from 'react';
import { block } from 'bem-cn';

import { GamePage } from '../pages/GamePage';
import './App.scss';

const cn = block('app');

const App: FC = () => {
	return (
		<div className={cn()}>
			<GamePage className={cn('page')} />
		</div>
	);
};

export default App;
