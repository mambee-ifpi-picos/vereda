import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import ProtectedRoute from '../../components/ProtectedRoute'
import CoursesList from '../../components/CoursesList'
import { CourseUserType } from '../../types/Types'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <Container component="main" maxWidth="lg">
        <Typography align="center" variant="h3" component="h3">
          Meu aprendizado
        </Typography>
        <CoursesList userType={CourseUserType.STUDENT} />
        <Typography align="center" variant="h3" component="h3">
          Meus Cursos
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <CoursesList userType={CourseUserType.OWNER} />
          <Card
            variant="outlined"
            sx={{ marginTop: 8, display: 'flex', alignItems: 'center' }}
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
  )
}

export default DashboardPage
