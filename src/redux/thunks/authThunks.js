import { createAsyncThunk } from '@reduxjs/toolkit';

// Mock credentials for simulation purposes
const MOCK_CREDENTIALS = {
  user: 'password',
  admin: 'admin123'
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (MOCK_CREDENTIALS[username] && MOCK_CREDENTIALS[username] === password) {
        const user = {
          id: 1,
          name: username === 'admin' ? 'Admin User' : 'Regular User',
          username
        };
        
        // Store auth info in localStorage
        localStorage.setItem('authUser', JSON.stringify(user));
        return user;
      } else {
        return rejectWithValue('Invalid username or password');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('authUser');
  return null;
});

export const checkAuthStatus = createAsyncThunk('auth/checkStatus', async () => {
  const user = JSON.parse(localStorage.getItem('authUser'));
  return {
    isAuthenticated: !!user,
    user: user || null
  };
});