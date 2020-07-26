import { List as ImmutableList, Map as ImmutableMap } from 'immutable';

import { CellData, CellState } from '../../model/Cell';

export type CellId = string;

export type CellRow = ImmutableList<CellId>;

export type CellGrid = ImmutableList<CellRow>;

export type CellDataMap = ImmutableMap<CellId, CellData>;

export type CellStateMap = ImmutableMap<CellId, CellState>;
