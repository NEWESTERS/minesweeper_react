import React, { FC } from 'react';

import { CellGrid } from '../components/CellGrid';
import { GameProvider, GameConsumer } from '../gameLogic/GameContext';
import { GamePhase } from '../model/Gameplay';

const App: FC = () => {
	return (
		<GameProvider width={10} height={10} mineCount={10}>
			<GameConsumer>
				{({ state, onCellActivate, onCellMark }) => (
					<>
						{state.gamePhase === GamePhase.Lost && (
							<h3>Вы проиграли</h3>
						)}

						{state.gamePhase === GamePhase.Won && (
							<h3>Вы выиграли</h3>
						)}

						<h4>Открыто клеток: {state.revealedCellCount}</h4>

						<CellGrid
							gameState={state}
							onCellLeftClick={onCellActivate}
							onCellRightClick={onCellMark}
						/>
					</>
				)}
			</GameConsumer>
		</GameProvider>
	);
};

export default App;
