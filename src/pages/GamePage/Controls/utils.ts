import { MainInteractionMode } from '../../../model';

const INTERACTION_MODE_TITLE = {
	[MainInteractionMode.Activate]: '🗝',
	[MainInteractionMode.Mark]: '🚩',
};

export function getInteractionModeTitle(interactionMode: MainInteractionMode) {
	return INTERACTION_MODE_TITLE[interactionMode];
}
