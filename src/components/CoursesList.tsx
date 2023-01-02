/* eslint-disable @typescript-eslint/ban-ts-comment */
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import { useAuth } from '../context/AuthContext'

import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../config/firebase'
import { CourseType, CourseUserType, CourseUserTypeProp } from '../types/Types'

const CoursesList = ({ userType }: CourseUserTypeProp) => {
  const { user } = useAuth()
  const [courses, setCourses] = useState<CourseType[]>([])

  const courseCollectionRef = collection(db, 'courses')

  const getCourses = async () => {
    let q = collection(db, 'courses')
    if (userType == CourseUserType.OWNER) {
      // @ts-ignore
      q = query(courseCollectionRef, where('ownerUser', '==', user.uid))
    } else if (userType == CourseUserType.STUDENT) {
      // @ts-ignore
      q = query(
        courseCollectionRef,
        where('students', 'array-contains', user.uid)
      )
    }

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(async (doc) => {
      const userName = await getUserName(doc.data().ownerUser)
      const course: CourseType = {
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        startDate: doc.data().startDate.toDate(),
        endDate: doc.data().endDate.toDate(),
        ownerUser: userName,
      }
      setCourses((courses) => [...courses, course])
    })
  }

  const getUserName = async (userId: string) => {
    if (!userId) return '-'
    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data().name
    } else {
      console.log(`No such user ${userId}`)
      return '--'
    }
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
                {`Criado por ${course.ownerUser}`}
              </Typography>
              <Typography variant="body2">{course.description}</Typography>
              <Typography variant="caption">
                <>
                  {format(course.startDate, 'dd/MM/yyyy')} {' - '}
                  {format(course.endDate, 'dd/MM/yyyy')}
                </>
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                color="#10ddca"
                underline="hover"
                href={`/cursos/${course.id}`}
              >
                Acessar Curso
              </Link>
            </CardActions>
          </Card>
        ))}
    </Box>
  )
}

export default CoursesList
