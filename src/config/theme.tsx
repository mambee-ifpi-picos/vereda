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
      main: '#1a202c',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})
export default theme
