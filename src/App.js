import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import {  StyledEngineProvider } from '@mui/material';
import { SpinnerProvider } from 'context/spinnerContext';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <SpinnerProvider>
        {/* <CssBaseline /> */}
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </SpinnerProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
