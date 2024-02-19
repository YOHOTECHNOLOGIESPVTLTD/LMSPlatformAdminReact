const Card = () => {
  return {
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '24px',
          '& .MuiCardHeader-subheader': {
            color: theme.palette.text.disabled
          }
        }),
        title: () => ({
          fontSize: '1.125rem'
        })
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: () => ({
          padding: '24px'
        })
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: () => ({
          padding: '24px'
        })
      }
    }
  };
};

export default Card;
