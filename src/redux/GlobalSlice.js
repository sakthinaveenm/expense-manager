import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  isLoading: false,
  isSplashLoading: true,
};

const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsSplashLoading: (state, action) => {
      state.isSplashLoading = action.payload;
    },
  },
});

export const GlobalActions = GlobalSlice.actions;
export const GlobalReducers = GlobalSlice.reducer;
export default GlobalSlice;
