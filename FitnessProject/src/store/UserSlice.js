import { createSlice } from '@reduxjs/toolkit';

// Retrieve the user data from local storage if it exists
const persistedUser = JSON.parse(localStorage.getItem('user'));

const initialState = persistedUser || {
  username: '',
  email: '',
  fullName: '',
  avatar: '',
  workOutSplit: [],
  isLoggedIn: false,
  workOutCompletedCount : [0,0,0,0,0,0,0]
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setEverything: (state, action) => {
      const { username, email, fullName, avatar, workOutSplit } = action.payload;
      state.username = username;
      state.email = email;
      state.fullName = fullName;
      state.avatar = avatar;
      state.workOutSplit = workOutSplit;
      state.isLoggedIn = !!username;
      // Store the updated state in local storage
      localStorage.setItem('user', JSON.stringify(state));
    },
    setUsername(state, action) {
      state.username = action.payload;
      state.isLoggedIn = !!state.username;
      localStorage.setItem('user', JSON.stringify(state));
    },
    setEmail(state, action) {
      state.email = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
    setFullName(state, action) {
      state.fullName = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
    setAvatar(state, action) {
      state.avatar = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
    setWorkOutSplit(state, action) {
      state.workOutSplit = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
    setWorkOutCompletedCount(state, action) {
      state.workOutCompletedCount = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout(state) {
      state.username = '';
      state.email = '';
      state.fullName = '';
      state.avatar = '';
      state.workOutSplit = [];
      state.isLoggedIn = false;
      state.workOutCompletedCount =  [0,0,0,0,0,0,0]
      localStorage.removeItem('user');
    },
  },
});

export const {
  setEverything,
  setAvatar,
  setWorkOutSplit,
  setEmail,
  setFullName,
  setUsername,
  setWorkOutCompletedCount,
  logout,
} = UserSlice.actions;
export default UserSlice.reducer;
