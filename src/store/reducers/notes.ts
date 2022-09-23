import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NOTES } from '../../data/mock';

export interface Note {
  id: number;
  name: string;
  created: Date;
  category: string;
  content: string;
  dates: string;
  isArchived: boolean;
}

export interface NoteState {
  NOTES: Note[];
}

const initialState: NoteState = {
  NOTES,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    editNote: (state, action: PayloadAction<Omit<Note, 'created' | 'isArchived'>>) => {
      const currNote = state.NOTES.find((note) => note.id === action.payload.id);

      if (currNote) {
        currNote.name = action.payload.name;
        currNote.category = action.payload.category;
        currNote.content = action.payload.content;
        currNote.dates = action.payload.dates;
      }
    },
    addNewNote: (state, action: PayloadAction<Note>) => {
      state.NOTES.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.NOTES = state.NOTES.filter((note) => note.id !== action.payload);
    },
    toggleNoteToArchive: (state, action: PayloadAction<number>) => {
      const note = state.NOTES.find((note) => note.id === action.payload);

      if (note) {
        note.isArchived = !note.isArchived;
      }
    },
  },
});

export const { addNewNote, removeNote, toggleNoteToArchive, editNote } = notesSlice.actions;
export default notesSlice.reducer;
