import React, { FC, MouseEvent } from 'react';
import { block } from 'bem-cn';

import './Cell.scss';

const cn = block('cell');

interface Props {
	className?: string;
	onLeftClick?: () => void;
	onRightClick?: () => void;
}

const Cell: FC<Props> = props => {
	const { className, onLeftClick, onRightClick, children } = props;

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.button === 0) {
			onLeftClick && onLeftClick();
		} else if (event.button === 2) {
			onRightClick && onRightClick();
		}
	};

	return (
		<div
			className={cn.mix(className)}
			onMouseDown={handleClick}
			onContextMenu={e => e.preventDefault()}
		>
			{children}
		</div>
	);
};

export default Cell;
