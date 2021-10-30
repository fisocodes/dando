import { createTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { amber } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#483D8B',
      },
      secondary: {
        main: amber[200],
      },
      background: {
        default: '#000000',
        paper: '#212121',
      },
    },
    shape: {
      borderRadius: 20,
    },
});

export default theme;