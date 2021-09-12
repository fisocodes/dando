import { createTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { amber } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
          main: deepPurple[500],
        },
        secondary: {
          main: amber[200],
        },
      }
});

export default theme;