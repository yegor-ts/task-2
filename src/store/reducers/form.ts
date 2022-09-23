import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DefaultValue = {
  id: number;
  name: string;
  category: string;
  content: string;
};

type Mode = 'create' | 'edit';

export interface FormState {
  mode: Mode;
  isVisible: boolean;
  defaultValue: DefaultValue;
}

export const defaultValue = {
  id: 0,
  name: '',
  category: 'Task',
  content: '',
};

const initialState: FormState = {
  isVisible: false,
  mode: 'create',
  defaultValue,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    toggleIsVisible: (state) => {
      state.isVisible = !state.isVisible;
    },
    setDefaultValue: (state, action: PayloadAction<DefaultValue>) => {
      state.defaultValue = action.payload;
    },
    changeMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleIsVisible, setDefaultValue, changeMode } = formSlice.actions;
export default formSlice.reducer;
