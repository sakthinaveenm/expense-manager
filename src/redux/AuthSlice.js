import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  isAuthenticated: false,
  isHydrateInfoGiven: null,
  userID: '',
  username: '',
  password: '',
  phone: '',
  photo: '',
  passbooks : [],
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfileViaLogin: (state, action) => {
      state.isAuthenticated = true;
      state.userID = action.payload.userID;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.photo = action.payload.photo;
    },
    storePassbooks : (state,action) => {
      state.passbooks = action.payload;
    },
    resetAuthState: () => initialState,
  },
});

export const AuthActions = AuthSlice.actions;
export const AuthReducers = AuthSlice.reducer;
export default AuthSlice;
