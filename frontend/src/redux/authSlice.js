import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authApi from 'api/authApi';

export const registerUser = createAsyncThunk('auth/register', async ({ values, navigate }, { rejectWithValue }) => {
    try {
        const res = await authApi.register(values);

        navigate('/login');

        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ values, navigate }, { rejectWithValue, dispatch, getState }) => {
        try {
            const res = await authApi.login(values);

            dispatch(saveToken(res));

            const { redirectOfLogin } = getState().auth;

            if (res.user.admin) navigate('/dashboard');
            else {
                if (redirectOfLogin) {
                    dispatch(setRedirectOfLogin(null));

                    navigate(redirectOfLogin);
                    return res;
                }

                navigate('/');
            }

            return res;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const authUser = createAsyncThunk('auth/user', async ({ navigate, type }, { rejectWithValue, dispatch }) => {
    try {
        const res = await authApi.isAuthenticated();

        switch (type) {
            case 'DASHBOARD':
                if (!res.user.admin) {
                    dispatch(removeToken());
                    navigate('/login');
                }
                break;
            case 'AUTH':
                if (res.user.admin) navigate('/dashboard');
                else navigate('/');
                break;
            default:
                throw new Error();
        }

        return res.user;
    } catch (err) {
        dispatch(removeToken());
        navigate('/login');

        return rejectWithValue(err);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        isAuth: false,
        isLogin: false,
        redirectOfLogin: null
    },
    reducers: {
        logOut: state => {
            state.currentUser = null;
            state.isLogin = false;

            authSlice.caseReducers.removeToken();
        },
        saveToken: (state, { payload }) => {
            localStorage.setItem('ACCESS_TOKEN', payload.accessToken);
            localStorage.setItem('REFRESH_TOKEN', payload.refreshToken);
        },
        removeToken: () => {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('REFRESH_TOKEN');
        },
        setRedirectOfLogin: (state, { payload }) => {
            state.redirectOfLogin = payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.currentUser = payload.user;
                state.isLogin = true;
                state.isAuth = false;
            })
            .addCase(authUser.fulfilled, state => {
                state.isAuth = true;
            })
            .addCase(authUser.rejected, state => {
                state.isAuth = true;
            });
    }
});
export const { saveToken, removeToken, logOut, setRedirectOfLogin } = authSlice.actions;
export default authSlice.reducer;
