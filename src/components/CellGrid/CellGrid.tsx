import React, { FC } from 'react';
import { block } from 'bem-cn';

import './CellGrid.scss';

const cn = block('cell-grid');

interface Props {
	className?: string;
}

const CellGrid: FC<Props> = props => {
	const { className, children } = props;

	return <div className={cn.mix(className)}>{children}</div>;
};

export default CellGrid;
