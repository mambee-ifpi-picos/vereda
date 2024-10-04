import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import ProtectedRoute from '../../../components/ProtectedRoute'
import CoursesList from '../../../components/CoursesList'
import { CourseUserType } from '../../../types/Types'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import Head from 'next/head'

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Vereda - Meu espaço</title>
      </Head>
      <ProtectedRoute>
        <Container component="main" maxWidth="lg">
          <Typography align="center" variant="h5" marginBottom={2}>
            Meu aprendizado
          </Typography>
          <CoursesList userType={CourseUserType.STUDENT} />
          <Typography
            align="center"
            variant="h5"
            marginTop={4}
            marginBottom={2}
          >
            Meus Cursos
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <CoursesList userType={CourseUserType.OWNER} />
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '100%', md: 'auto' },
              }}
            >
              <CardContent>
                <Typography variant="h3" component="div">
                  <Link href="/cursos/cadastro" color="red">
                    <a>
                      <AddIcon />
                    </a>
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </ProtectedRoute>
    </>
  )
}

export default DashboardPage
