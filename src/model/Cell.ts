export enum CellState {
	Revealed = 'R',
	Flagged = 'F',
	Unknown = 'U',
	Closed = 'C',
}

export type Mine = 'M';

export type CellData = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | Mine;

export type CellId = string;
