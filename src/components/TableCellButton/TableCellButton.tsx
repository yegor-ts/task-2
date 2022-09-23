import React from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../store/hooks';
import { changeMode, setDefaultValue, toggleIsVisible } from '../../store/reducers/form';
import { Note, removeNote, toggleNoteToArchive } from '../../store/reducers/notes';
import './TableCellButton.css';

interface Props {
  note: Note;
  type: string;
  identifier: string;
}

const TableCellButton: React.FC<Props> = ({ type, note, identifier }) => {
  const { id, name, category, content } = note;

  const dispatch = useAppDispatch();
  const editNote = () => {
    dispatch(setDefaultValue({ id, name, category, content }));
    dispatch(changeMode('edit'));
    dispatch(toggleIsVisible());
  };

  return (
    <button
      className={classNames('cell-button', 'icon', 'cell__icon', `icon--${identifier}`)}
      type='button'
      onClick={() => {
        if (type === 'Delete') dispatch(removeNote(id))
        else if (type === 'Archive') dispatch(toggleNoteToArchive(id))
        else editNote()
      }}
    >
      {type}
    </button>
  );
};

export default TableCellButton;
