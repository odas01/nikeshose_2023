import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from 'api/productApi';

export const getProducts = createAsyncThunk('product/getAll', async (params, { rejectWithValue }) => {
    try {
        const res = await productApi.getAll(params);
        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        removeCart: state => {
            console.log(111);
            // state.items = [];
            // state.quantity = 0;
        }
    },
    extraReducers: builders => {
        // builders.addCase(getAll.fulfilled, (state, { payload }) => {});
    }
});
export const { removeCart } = productSlice.actions;

export default productSlice.reducer;
