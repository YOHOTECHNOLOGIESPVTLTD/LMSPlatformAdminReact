import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dummydata from './dummydata';
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {
  return dummydata.profileUser;
});

export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
  return { chatsContacts: dummydata.chatsContacts, contacts: dummydata.contacts };
});

export const selectChat = createAsyncThunk('appChat/selectChat', async (id) => {
  const chat = dummydata.chats.find((chat) => chat.id === id);
  const contact = dummydata.contacts.find((contact) => contact.id === id);

  return { chat, contact };
});

export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj) => {
  const newMessageData = {
    /* populate with message data */
  };

  return { newMessageData, id: obj.contact.id };
});

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState: {
    chats: null,
    contacts: null,
    userProfile: null,
    selectedChat: null
  },
  reducers: {
    removeSelectedChat: (state) => {
      state.selectedChat = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
    builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
      state.contacts = action.payload.contacts;
      state.chats = action.payload.chatsContacts;
    });
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.selectedChat = action.payload;
    });
  }
});

export const { removeSelectedChat } = appChatSlice.actions;
export default appChatSlice.reducer;
