import React, { FC } from 'react';
import { block } from 'bem-cn';

import './CellRow.scss';

const cn = block('cell-row');

interface Props {
	className?: string;
}

const CellRow: FC<Props> = props => {
	const { className, children } = props;

	return <div className={cn.mix(className)}>{children}</div>;
};

export default CellRow;
