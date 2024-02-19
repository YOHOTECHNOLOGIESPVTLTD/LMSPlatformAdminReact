export default {
  MuiPaper: {
    defaultProps: {
      elevation: 0
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none'
      },
      rounded: {
        borderRadius: `${theme?.customization?.borderRadius}px`
      }
    }
  }
};
