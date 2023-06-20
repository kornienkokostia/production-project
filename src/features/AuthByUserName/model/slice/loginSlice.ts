import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginSchema } from '../type/loginSchema';
import { loginByUsername } from '../services/LoginByUsername/loginByUsername';

const initialState: LoginSchema = {
  username: '',
  password: '',
  isLoading: false,
  usernameFocused: false,
  passwordFocused: false,
  error: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUsernameFocused: (state, action: PayloadAction<boolean>) => {
      state.usernameFocused = action.payload;
    },
    setPasswordFocused: (state, action: PayloadAction<boolean>) => {
      state.passwordFocused = action.payload;
    },
    resetErrors: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByUsername.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    }),
    builder.addCase(loginByUsername.fulfilled, (state, action) => {
      state.isLoading = false;
    }),
    builder.addCase(loginByUsername.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { actions: loginActions, reducer: loginReducer } = loginSlice;
