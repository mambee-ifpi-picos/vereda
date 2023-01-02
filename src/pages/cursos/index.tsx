import type { NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import CoursesList from '../../components/CoursesList'

const Courses: NextPage = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Typography align="center" variant="h5" marginBottom={2}>
        Todos os cursos
      </Typography>
      <CoursesList />
    </Container>
  )
}

export default Courses
