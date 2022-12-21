import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'

import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../config/firebase'
import { CourseType } from '../types/Types'

const CoursesList = () => {
  const [courses, setCourses] = useState<CourseType[]>([])

  const getCourses = async () => {
    const querySnapshot = await getDocs(collection(db, 'courses'))
    const courseList: CourseType[] = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
      const course: CourseType = {
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        startDate: doc.data().startDate.toDate(),
        endDate: doc.data().endDate.toDate(),
      }
      courseList.push(course)
    })
    setCourses(courseList)
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {courses &&
        courses.map((course) => (
          <Card key={course.id} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                {course.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Criado por Jesiel Viana
              </Typography>
              <Typography variant="body2">{course.description}</Typography>
              <Typography variant="caption">
                <>
                  {format(course.startDate, 'dd/mm/yyyy')} {' - '}
                  {format(course.endDate, 'dd/mm/yyyy')}
                </>
              </Typography>
            </CardContent>
            <CardActions>
              <Link color="inherit" href={`/cursos/${course.id}`}>
                Mais detalhes
              </Link>
            </CardActions>
          </Card>
        ))}
    </Box>
  )
}

export default CoursesList
