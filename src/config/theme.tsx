import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: '#1a202c',
      paper: '#313546',
    },
    mode: 'dark',
    primary: {
      main: '#19857b',
    },
    secondary: {
      main: '#a3a4aa',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['Ubuntu', 'cursive'].join(','),
  },
})
export default theme
