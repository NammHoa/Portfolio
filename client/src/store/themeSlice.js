import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: true, // Mặc định là Dark mode để trông hiện đại hơn
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
