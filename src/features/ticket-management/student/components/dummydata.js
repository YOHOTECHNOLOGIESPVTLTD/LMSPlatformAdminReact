// ** Mock Adapter

const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
const dayBeforePreviousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2);

const dummydata = {
  profileUser: {
    id: 11,
    avatar: '/images/avatars/1.png',
    fullName: 'John Doe',
    role: 'admin',
    about: 'Dessert chocolate cake lemon drops jujubes.brownie marshmallow.',
    status: 'online',
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  },
  contacts: [
    {
      id: 1,
      fullName: 'Felecia Rower',
      role: 'Frontend Developer',
      about: 'Cake pie jelly jelly beans. M',
      avatar: '/images/avatars/2.png',
      status: 'offline'
    },
    {
      id: 2,
      fullName: 'Adalberto Granzin',
      role: 'UI/UX Designer',
      avatarColor: 'primary',
      about: 'Cake pie jelly jelly beans.  ',
      status: 'busy'
    },
    {
      id: 3,
      fullName: 'Joaquina Weisenborn',
      role: 'Town planner',
      about: 'Cake pie jelly jelly beans.  ',
      avatar: '/images/avatars/8.png',
      status: 'busy'
    },
    {
      id: 4,
      fullName: 'Verla Morgano',
      role: 'Data scientist',
      about: 'Cake pie jelly jelly beans.  ',
      avatar: '/images/avatars/3.png',
      status: 'online'
    },
    {
      id: 5,
      fullName: 'Margot Henschke',
      role: 'Dietitian',
      avatarColor: 'success',
      about: 'Cake pie jelly jelly beans. lemon drops icing',
      status: 'busy'
    },
    {
      id: 6,
      fullName: 'Sal Piggee',
      role: 'Marketing executive',
      about: 'Cake pie jelly jelly beans.  ',
      avatar: '/images/avatars/5.png',
      status: 'online'
    },
    {
      id: 7,
      fullName: 'Miguel Guelff',
      role: 'Special educational needs teacher',
      about: 'Cake pie jelly jelly beans.  ',
      avatar: '/images/avatars/7.png',
      status: 'online'
    },
    {
      id: 8,
      fullName: 'Mauro Elenbaas',
      role: 'Advertising copywriter',
      about: 'Cake pie jelly jelly beans.  ',
      avatar: '/images/avatars/6.png',
      status: 'away'
    },
    {
      id: 9,
      avatarColor: 'warning',
      fullName: 'Bridgett Omohundro',
      role: 'Designer, television/film set',
      about: 'Cake pie jelly jelly beans.  ',
      status: 'offline'
    },
    {
      id: 10,
      avatarColor: 'error',
      fullName: 'Zenia Jacobs',
      role: 'Building surveyor',
      about: 'Cake pie jelly jelly beans.  ',
      status: 'away'
    }
  ],
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
          time: previousDay,
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
          time: dayBeforePreviousDay,
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: false,
            isSeen: false
          }
        }
      ]
    }
  ]
};

export default dummydata;
