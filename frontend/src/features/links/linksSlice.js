// src/features/links/linksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

// Async thunks
export const fetchLinks = createAsyncThunk('links/fetchAll', async () => {
  const res = await api.get('/links');
  return res.data;
});

export const createLink = createAsyncThunk('links/create', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/links', payload);
    return res.data;
  } catch (err) {
    if (err.response) return rejectWithValue(err.response.data);
    return rejectWithValue({ error: 'Network error' });
  }
});

export const fetchLink = createAsyncThunk('links/fetchOne', async (code, { rejectWithValue }) => {
  try {
    const res = await api.get(`/links/${code}`);
    return res.data;
  } catch (err) {
    if (err.response) return rejectWithValue(err.response.data);
    return rejectWithValue({ error: 'Network error' });
  }
});

export const deleteLink = createAsyncThunk('links/delete', async (code, { rejectWithValue }) => {
  try {
    await api.delete(`/links/${code}`);
    return code;
  } catch (err) {
    if (err.response) return rejectWithValue(err.response.data);
    return rejectWithValue({ error: 'Network error' });
  }
});

const initialState = {
  list: [],
  status: 'idle',
  error: null,
  createStatus: 'idle',
  createError: null,
  current: null,
  currentStatus: 'idle',
};

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
      state.currentStatus = 'idle';
      state.createError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchLinks.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(fetchLinks.fulfilled, (s, a) => { s.status = 'succeeded'; s.list = a.payload; })
      .addCase(fetchLinks.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; })

      // create
      .addCase(createLink.pending, (s) => { s.createStatus = 'loading'; s.createError = null; })
      .addCase(createLink.fulfilled, (s, a) => {
        s.createStatus = 'succeeded';
        s.list.unshift(a.payload); // newest first
      })
      .addCase(createLink.rejected, (s, a) => {
        s.createStatus = 'failed';
        s.createError = a.payload?.error || a.error?.message || 'Create failed';
      })

      // fetch one
      .addCase(fetchLink.pending, (s) => { s.currentStatus = 'loading'; s.current = null; })
      .addCase(fetchLink.fulfilled, (s, a) => { s.currentStatus = 'succeeded'; s.current = a.payload; })
      .addCase(fetchLink.rejected, (s, a) => { s.currentStatus = 'failed'; s.current = null; s.currentError = a.payload?.error || a.error?.message; })

      // delete
      .addCase(deleteLink.fulfilled, (s, a) => {
        s.list = s.list.filter(item => item.code !== a.payload);
      });
  }
});

export const { clearCurrent } = linksSlice.actions;
export default linksSlice.reducer;
