import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  Box,
  CssBaseline,
  FormControlLabel,
  useMediaQuery,
} from '@mui/material';
import { MaterialUISwitch as Switch } from './components/switch';
import * as styles from './app.module.css';

const ColorModeContext = React.createContext({ toggleColorMode: () => {}, isDarkMode: () => false});

export const MyApp = () => {
  const colorMode = React.useContext(ColorModeContext);
  
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        <div className={styles.colorModeToggle}>
          <Switch sx={{ m: 1 }} checked={!colorMode.isDarkMode()} onChange={colorMode.toggleColorMode}/>
        </div>
      </Box>
    </>

  );
}

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      isDarkMode: () => mode === 'dark',
    }),
    [mode],
  );

  React.useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp prefersDarkMode={prefersDarkMode} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}