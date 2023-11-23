import { createSlice } from '@reduxjs/toolkit';

const tagSlice = createSlice(
  {
    name: 'tag',
    initialState: [],
    reducers: {
      addToTag: (state, action) => {
        state.push(action.payload);
      },
      removeToTag: (state, action) => {
        state = state.filter((tag) => tag !== action.payload);
        return state;
      },
    },
  },
  {
    // mutate 옵션을 true로 설정
    mutate: true,
  }
);
export const { addToTag, removeToTag } = tagSlice.actions;
export default tagSlice;
