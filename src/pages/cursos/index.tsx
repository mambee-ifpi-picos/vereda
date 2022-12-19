import type { NextPage } from 'next'
import { Container } from '@mui/material'
import Copyright from '../../components/Copyright'
import CoursesList from '../../components/CoursesList'

const Courses: NextPage = () => {
  return (
    <Container component="main" maxWidth="lg">
      <CoursesList />
      <Copyright />
    </Container>
  )
}

export default Courses
