import React from 'react';
import classNames from 'classnames';

import './TableCell.css';

interface Props {
  children?: React.ReactElement;
  identifier?: string;
  content?: string;
}

const TableCell: React.FC<Props> = ({ children, identifier, content }) => {
  return (
    <td className={classNames('cell', 'note__cell', { [`cell--${identifier}`]: identifier })}>
      {content || children}
    </td>
  );
};

export default TableCell;
