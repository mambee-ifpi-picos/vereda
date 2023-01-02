import type { NextPage } from 'next'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        paddingY: '2rem',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        maxWidth={500}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          rowGap: '2rem',
        }}
      >
        <Image src="/static/logo.png" width={250} height={250} alt="logo" />
        <Typography align="center" variant="h2" component="h2">
          Vereda
        </Typography>
        <Typography align="center" variant="subtitle1">
          Aplicativo para acompanhamento de seu aprendizado!
        </Typography>
      </Box>
    </Container>
  )
}

export default Home
