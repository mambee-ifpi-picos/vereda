import type { NextPage } from 'next'
import { Container } from '@mui/material'
import CoursesList from '../../components/CoursesList'

const Courses: NextPage = () => {
  return (
    <Container component="main" maxWidth="lg">
      <CoursesList />
    </Container>
  )
}

export default Courses
