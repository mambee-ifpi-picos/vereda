import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

function Copyright() {
  return (
    <Typography
      variant="body2"
      sx={{ mx: 8, mt: 6 }}
      color="text.secondary"
      align="center"
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Vereda
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
