import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice(
  {
    name: 'note',
    initialState: [],
    reducers: {
      addToNote: (state, action) => {
        state.push(action.payload);
      },
      removeToNote: (state, action) => {
        const noteToTrash = state.find((note) => note.id === action.payload);
        if (noteToTrash) {
          noteToTrash.trash = !noteToTrash.trash;
        }
      },
      updateToNotePin: (state, action) => {
        const noteToUpdate = state.find((note) => note.id === action.payload);
        if (noteToUpdate) {
          noteToUpdate.pin = !noteToUpdate.pin;
        }
      },
      updateToNote: (state, action) => {
        const { updatedData } = action.payload;
        const noteToUpdate = state.find((note) => note.id === updatedData.id);

        if (noteToUpdate) {
          // Immer를 사용하여 불변성을 유지하며 필드 업데이트
          Object.assign(noteToUpdate, updatedData);
        }
      },
    },
  },
  {
    // mutate 옵션을 true로 설정
    mutate: true,
  }
);
export const { addToNote, removeToNote, updateToNotePin, updateToNote } = noteSlice.actions;
export default noteSlice;
