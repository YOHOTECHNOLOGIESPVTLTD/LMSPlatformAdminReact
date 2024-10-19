// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';

// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {
  const response = await axios.get('/src/');

  return response.data;
});

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
  const response = await axios.get('/apps/chat/chats-and-contacts');

  return response.data;
});

// ** Select Chat
export const selectChat = createAsyncThunk('appChat/selectChat', async (id, { dispatch }) => {
  const response = await axios.get('/apps/chat/get-chat', {
    params: {
      id
    }
  });
  await dispatch(fetchChatsContacts());

  return response.data;
});

// ** Send Msg
export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj, { dispatch }) => {
  const response = await axios.post('/apps/chat/send-msg', {
    data: {
      obj
    }
  });
  if (obj.contact) {
    await dispatch(selectChat(obj.contact.id));
  }
  await dispatch(fetchChatsContacts());

  return response.data;
});
// const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
// const dayBeforePreviousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2);

export const appChatSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [
      {
        id: 1,
        userId: 1,
        unseenMsgs: 1,
        chat: [
          {
            message: "How can we help? We're here for you!",
            time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
            senderId: 11,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
            time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
            senderId: 1,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'It should be MUI v5 compatible.',
            time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
            senderId: 1,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'Absolutely!',
            time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
            senderId: 11,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'This admin template is built with MUI!',
            time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
            senderId: 11,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'Looks clean and fresh UI. 😍',
            time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
            senderId: 1,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: "It's perfect for my next project.",
            time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
            senderId: 1,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'How can I purchase it?',
            time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
            senderId: 1,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'Thanks, From our official site  😇',
            time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
            senderId: 11,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'I will purchase it for sure. 👍',
            time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
            senderId: 1,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          }
        ]
      },
      {
        id: 2,
        userId: 2,
        unseenMsgs: 0,
        chat: [
          {
            message: 'Hi',
            time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
            senderId: 11,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'Hello. How can I help You?',
            time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
            senderId: 2,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'Can I get details of my last transaction I made last month? 🤔',
            time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
            senderId: 11,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'We need to check if we can provide you such information.',
            time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
            senderId: 2,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'I will inform you as I get update on this.',
            time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
            senderId: 2,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: 'If it takes long you can mail me at my mail address.',
            time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
            senderId: 11,
            feedback: {
              isSent: true,
              isDelivered: false,
              isSeen: false
            }
          }
        ]
      }
    ],
    contacts: [
      {
        id: 1,
        fullName: 'Felecia Rower',
        role: 'Frontend Developer',
        about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
        avatar: '/images/avatars/2.png',
        status: 'offline'
      },
      {
        id: 2,
        fullName: 'Adalberto Granzin',
        role: 'UI/UX Designer',
        avatarColor: 'primary',
        about:
          'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
        status: 'busy'
      },
      {
        id: 3,
        fullName: 'Joaquina Weisenborn',
        role: 'Town planner',
        about: 'Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.',
        avatar: '/images/avatars/8.png',
        status: 'busy'
      },
      {
        id: 4,
        fullName: 'Verla Morgano',
        role: 'Data scientist',
        about:
          'Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.',
        avatar: '/images/avatars/3.png',
        status: 'online'
      },
      {
        id: 5,
        fullName: 'Margot Henschke',
        role: 'Dietitian',
        avatarColor: 'success',
        about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
        status: 'busy'
      },
      {
        id: 6,
        fullName: 'Sal Piggee',
        role: 'Marketing executive',
        about:
          'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
        avatar: '/images/avatars/5.png',
        status: 'online'
      },
      {
        id: 7,
        fullName: 'Miguel Guelff',
        role: 'Special educational needs teacher',
        about: 'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.',
        avatar: '/images/avatars/7.png',
        status: 'online'
      },
      {
        id: 8,
        fullName: 'Mauro Elenbaas',
        role: 'Advertising copywriter',
        about:
          'Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.',
        avatar: '/images/avatars/6.png',
        status: 'away'
      },
      {
        id: 9,
        avatarColor: 'warning',
        fullName: 'Bridgett Omohundro',
        role: 'Designer, television/film set',
        about:
          'Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.',
        status: 'offline'
      },
      {
        id: 10,
        avatarColor: 'error',
        fullName: 'Zenia Jacobs',
        role: 'Building surveyor',
        about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
        status: 'away'
      }
    ],
    userProfile: {
      id: 11,
      avatar: '/images/avatars/1.png',
      fullName: 'John Doe',
      role: 'admin',
      about: 'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
      status: 'online',
      settings: {
        isTwoStepAuthVerificationEnabled: true,
        isNotificationsOn: false
      }
    },
    selectedChat: {
      id: 1,
      userId: 1,
      unseenMsgs: 1,
      contact: {
        id: 1,
        fullName: 'Felecia Rower',
        role: 'Frontend Developer',
        about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
        avatar: '/images/avatars/2.png',
        status: 'offline'
      },
      chat: [
        {
          message: "How can we help? We're here for you!",
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'It should be MUI v5 compatible.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Absolutely!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'This admin template is built with MUI!',
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Looks clean and fresh UI. 😍',
          time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "It's perfect for my next project.",
          time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'How can I purchase it?',
          time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Thanks, From our official site  😇',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'I will purchase it for sure. 👍',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        }
      ]
    }
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
