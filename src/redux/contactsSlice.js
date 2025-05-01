import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.default.baseURL = "https://6813df98225ff1af16276298.mockapi.io/";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const response = await axios.get("/contacts");
  return response.data;
});

export const addContacts = createAsyncThunk("contacts/add", async () => {
  const response = await axios.post("/contacts");
  return response.data;
});
export const deleteContacts = createAsyncThunk("contacts/delete", async (contact) => {
  const response = await axios.delete("/contacts/${id}");
  return response.id;
});


const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
  });
export default contactsSlice;
