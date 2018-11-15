import { createMuiTheme } from '@material-ui/core/styles';

export const ThemeProvider = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#f50057'
        }
    },
});
