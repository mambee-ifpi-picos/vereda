import * as React from 'react'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'

import GoogleIcon from '@mui/icons-material/Google'
import Image from 'next/image'
import Head from 'next/head'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loginWithGoogle } = useAuth()
  const router = useRouter()
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push('/cursos/meu-espaco')
    } catch (error) {
      console.log(error)
    }
  }

  const googleLogin = async () => {
    try {
      await loginWithGoogle()
      router.push('/cursos/meu-espaco')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Vereda - Login</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image src="/static/logo.png" width={150} height={150} alt="logo" />
          <Typography component="h1" variant="h5">
            Vereda
          </Typography>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <Button
              type="button"
              onClick={() => googleLogin()}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{
                mt: 3,
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                columnGap: '1rem',
              }}
            >
              <GoogleIcon /> Login com Google
            </Button>
            <Box display={'none'}>
              <Typography component="p" align="center">
                OU
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
            </Box>
            {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {'Não têm uma conta? cadastre-se'}
              </Link>
            </Grid>
          </Grid> */}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Login
