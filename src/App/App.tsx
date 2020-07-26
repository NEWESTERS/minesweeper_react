import React, { FC } from 'react';

import { Cell } from '../components';
import { CellState } from '../model/Cell';

const App: FC = () => {
	return (
		<div>
			<Cell state={CellState.Unknown} />
		</div>
	);
};

export default App;
