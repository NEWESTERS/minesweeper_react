import React, { FC, createContext, useContext, useState } from 'react';

import { GameState } from './GameState';
import { CellId } from '../model/Cell';
import { MainInteractionMode } from '../model';

interface GameContext {
	onMainInteraction: (cellId: string) => void;
	onSecondaryInteraction: (cellId: string) => void;
	state: GameState;
	mainInteractionMode: MainInteractionMode;
	switchMainInteractionMode: () => void;
}

const GameContext = createContext<GameContext>({
	onMainInteraction: () => {},
	onSecondaryInteraction: () => {},
	state: GameState.createEmpty(),
	mainInteractionMode: MainInteractionMode.Activate,
	switchMainInteractionMode: () => {},
});

export const GameProvider: FC<{
	width: number;
	height: number;
	mineCount: number;
}> = ({ children, width, height, mineCount }) => {
	const [state, setState] = useState(
			GameState.createWithGrid(height, width, mineCount)
		),
		[mainInteractionMode, setMainInteractionMode] = useState(
			MainInteractionMode.Activate
		);

	const switchMainInteractionMode = () => {
		setMainInteractionMode(mainInteractionMode =>
			mainInteractionMode === MainInteractionMode.Activate
				? MainInteractionMode.Mark
				: MainInteractionMode.Activate
		);
	};

	const handleMainInteraction = (cellId: CellId) => {
		if (mainInteractionMode === MainInteractionMode.Activate) {
			setState(state => state.activateCell(cellId));
		} else {
			setState(state => state.markCell(cellId));
		}
	};

	const handleSecondaryInteraction = (cellId: CellId) => {
		if (mainInteractionMode === MainInteractionMode.Activate) {
			setState(state => state.markCell(cellId));
		} else {
			setState(state => state.activateCell(cellId));
		}
	};

	return (
		<GameContext.Provider
			value={{
				onMainInteraction: handleMainInteraction,
				onSecondaryInteraction: handleSecondaryInteraction,
				state,
				mainInteractionMode,
				switchMainInteractionMode,
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
