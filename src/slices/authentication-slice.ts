import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthenticationService from '../services/authentication-service';
import { ChatState, endChat } from './chat-slice';
import { UserInfo } from '../model/user-info-model';

export interface AuthenticationState {
  isAuthenticated: boolean;
  authenticationFailed: boolean;
  userInfo: UserInfo;
  fetchingUserInfo: boolean;
  loggedInWithTaraJwt: boolean;
  jwtCookie?: string;
}

const initialState: AuthenticationState = {
  fetchingUserInfo: true,
  loggedInWithTaraJwt: false,
  isAuthenticated: false,
  authenticationFailed: false,
  userInfo: {
    jwtExpirationTimestamp: '',
    firstName: '',
    lastName: '',
    personalCode: '',
  },
};

export const authSmaxUserJwt = createAsyncThunk(
  "auth/authSmaxUserJwt",
  async () => { return await AuthenticationService.authSmaxUserJwt() }
);

export const loginWithTaraJwt = createAsyncThunk('auth/loginWithTaraJwt', async (_args, thunkApi) => {
  const {chat: { chatId }} = thunkApi.getState() as { chat: ChatState };
  if (chatId) {
    const res = await AuthenticationService.loginWithTaraJwt(chatId);
    thunkApi.dispatch(getUserinfo());
    return res;
  }
  return Promise.reject(new Error('Error Logging in with Tara'));
});

export const getUserinfo = createAsyncThunk('auth/getUserinfo', () => AuthenticationService.customJwtUserinfo());

export const customJwtExtend = createAsyncThunk('chat/customJwtExtend', async () => AuthenticationService.customJwtExtend());

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setIsNotAuthenticated: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserinfo.pending, (state) => {
      state.fetchingUserInfo = true;
    });
    builder.addCase(getUserinfo.fulfilled, (state, action) => {
      state.fetchingUserInfo = false;

      if (!action.payload) {
        state.isAuthenticated = false;
        state.userInfo = initialState.userInfo;
        return;
      }

      state.userInfo.jwtExpirationTimestamp = action.payload.jwtExpirationTimestamp;
      state.userInfo.personalCode = action.payload.personalCode;
      state.userInfo.firstName = action.payload.firstName;
      state.userInfo.lastName = action.payload.lastName;
      state.isAuthenticated = !!action.payload.personalCode;
    });
    builder.addCase(getUserinfo.rejected, (state) => {
      state.fetchingUserInfo = false;
    });
    builder.addCase(loginWithTaraJwt.pending, (state) => {
      state.loggedInWithTaraJwt = false;
    });
    builder.addCase(loginWithTaraJwt.fulfilled, (state) => {
      state.loggedInWithTaraJwt = true;
    });
    builder.addCase(endChat.fulfilled, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(customJwtExtend.fulfilled, (state, action) => {
      state.jwtCookie = action.payload.jwtCookie;
    });
  },
});

export const { setIsAuthenticated, setIsNotAuthenticated } = authenticationSlice.actions;

export default authenticationSlice.reducer;
