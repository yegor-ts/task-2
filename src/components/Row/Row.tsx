import React from 'react';
import classNames from 'classnames';
import { Note } from '../../store/reducers/notes';
import TableCell from '../TableCell';
import TableCellButton from '../TableCellButton/index';
import { Mode } from '../Table/Table';
import './Row.css';

interface Props {
  note?: Note;
  item?: [string, Mode];
}

const Row: React.FC<Props> = ({ note, item }) => {
  return (
    <tr className='row table__row'>
      {note && (
        <>
          <TableCell identifier='is-darken'>
            <>
              <span className='icon-wrapper cell__icon-wrapper'>
                <span className={`icon icon--${note.category.toLowerCase()}`}>{note.category}</span>
              </span>
              <h3 className='cell__title'>{note.name}</h3>
            </>
          </TableCell>
          <TableCell content={note.created.toUTCString()} />
          <TableCell content={note.category} />
          <TableCell>
            <p className='cell__text'>{note.content}</p>
          </TableCell>
          <TableCell content={note.dates} />
          <TableCell identifier='with-icons'>
            <>
              <TableCellButton type='Edit' note={note} identifier='edit' />
              <TableCellButton
                type='Archive'
                note={note}
                identifier={!note.isArchived ? 'archive' : 'unarchive'}
              />
              <TableCellButton type='Delete' note={note} identifier='delete' />
            </>
          </TableCell>
        </>
      )}
      {item && (
        <>
          <TableCell identifier='is-darken'>
            <>
              <span className='icon-wrapper cell__icon-wrapper'>
                <span className={classNames('icon', [`icon--${item[0].toLowerCase()}`])}>
                  {item[0]}
                </span>
              </span>
              <h3 className='cell__title'>{item[0]}</h3>
            </>
          </TableCell>
          <TableCell content={item[1].active.toString()} />
          <TableCell content={item[1].archived.toString()} />
          <td />
        </>
      )}
    </tr>
  );
};

export default Row;
