import React, { FC, createContext, useContext, useState } from 'react';

import { GameState } from './GameState';

interface GameContext {
	onCellClick: (cellId: string) => void;
	state: GameState;
}

const GameContext = createContext<GameContext>({
	onCellClick: () => {},
	state: GameState.createEmpty(),
});

export const GameProvider: FC = ({ children }) => {
	const [state] = useState(GameState.createEmpty());

	return (
		<GameContext.Provider
			value={{
				onCellClick: console.log,
				state,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export function useGameContext() {
	return useContext(GameContext);
}
