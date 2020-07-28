import React, { FC, createContext, useContext, useState } from 'react';

import { GameState } from './GameState';
import { CellId } from '../model/Cell';

interface GameContext {
	onCellActivate: (cellId: string) => void;
	onCellMark: (cellId: string) => void;
	state: GameState;
}

const GameContext = createContext<GameContext>({
	onCellActivate: () => {},
	onCellMark: () => {},
	state: GameState.createEmpty(),
});

export const GameProvider: FC<{
	width: number;
	height: number;
	mineCount: number;
}> = ({ children, width, height, mineCount }) => {
	const [state, setState] = useState(
		GameState.createWithGrid(height, width, mineCount)
	);

	const handleActivate = (cellId: CellId) => {
		setState(state => state.activateCell(cellId));
	};

	const handleMark = (cellId: CellId) => {
		setState(state => state.markCell(cellId));
	};

	return (
		<GameContext.Provider
			value={{
				onCellActivate: handleActivate,
				onCellMark: handleMark,
				state,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export const GameConsumer = GameContext.Consumer;

export function useGameContext() {
	return useContext(GameContext);
}
