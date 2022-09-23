import React, { useMemo, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Note } from '../../store/reducers/notes';
import Row from '../Row/index';
import TableHead from '../TableHead/index';
import './Table.css';

const notesTableHeadKeys = ['Name', 'Created', 'Category', 'Content', 'Dates'];
const statisticTableHeadKeys = ['Note category', 'Active', 'Archived'];

interface Props {
  tableType: string;
  callback?: () => void;
}

export interface Mode {
  active: number;
  archived: number;
}

interface Acc {
  [key: string]: Mode;
}

const Table: React.FC<Props> = ({ tableType }) => {
  const [isVisibleActiveNotes, setIsVisibleActiveNotes] = useState(false);
  const { NOTES } = useAppSelector((state) => state.notes);

  const visibleNotes = useMemo(() => {
    return NOTES.filter((note) => {
      if (isVisibleActiveNotes) {
        return note.isArchived;
      }

      return !note.isArchived;
    });
  }, [isVisibleActiveNotes, NOTES]);

  const statistic = useMemo(() => {
    return NOTES.reduce((acc: Acc, note) => {
      const { category } = note;

      // eslint-disable-next-line no-prototype-builtins
      if (!acc.hasOwnProperty(category)) {
        return Object.assign(acc, {
          [category]: {
            active: note.isArchived ? 0 : 1,
            archived: note.isArchived ? 1 : 0,
          },
        });
      } else {
        note.isArchived ? acc[category].archived++ : acc[category].active++;

        return acc;
      }
    }, {});
  }, [NOTES]);

  const setVisibility = () => {
    setIsVisibleActiveNotes(!isVisibleActiveNotes);
  };

  return (
    <table className='table container__table'>
      <TableHead
        keys={tableType === 'notes' ? notesTableHeadKeys : statisticTableHeadKeys}
        type={tableType}
        setVisibility={setVisibility}
      />
      <tbody>
        {tableType === 'notes'
          ? visibleNotes.map((note: Note) => (
              <React.Fragment key={note.id}>
                <Row note={note} />
              </React.Fragment>
            ))
          : Object.entries(statistic).map((item) => (
              <React.Fragment key={item[0]}>
                <Row item={item} />
              </React.Fragment>
            ))}
      </tbody>
    </table>
  );
};

export default Table;
