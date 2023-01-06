/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextPage } from 'next'
import { Box, Container } from '@mui/material'
import { useRouter } from 'next/router'
import { CourseType, LearningGoalType, StudentType } from '../../../types/Types'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import styles from '../../../styles/HorizontalTimeLine.module.css'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import { useAuth } from '../../../context/AuthContext'
import { db } from '../../../config/firebase'
import getUserNameByUid from '../../../hooks/getUserNameByUid'

const CourseDashboard: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth()
  const courseId: string = '' + router.query.courseId
  const courseDocRef = doc(db, 'courses', courseId)
  const [learningGoals, setLearningGoals] = useState<LearningGoalType[]>([])
  const [course, setCourse] = useState<CourseType>()

  const getLearningGoals = async () => {
    if (!courseId) return

    const docSnap = await getDoc(courseDocRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      if (
        docSnap.data().ownerUser &&
        user.uid &&
        docSnap.data().ownerUser != user.uid
      ) {
        router.push('/cursos/dashboard')
      }
      const courseLoaded: CourseType = {
        name: docSnap.data().name,
        startDate: docSnap.data().startDate.toDate(),
        endDate: docSnap.data().endDate.toDate(),
        ownerUser: docSnap.data().ownerUser,
        students: docSnap.data().students,
        studentsUser: [],
      }
      const students: StudentType[] = []
      for (const uid of courseLoaded.students || []) {
        console.log('uid', uid)
        const name = (await getUserNameByUid(uid)) || ''
        console.log('userName', name)
        students.push({ uid, name })
        setCourse({
          ...courseLoaded,
          studentsUser: students,
        })
        console.log('course', course)
      }
    } else {
      console.log('No such document!')
    }
    const learningGoalsRef = collection(db, `courses/${courseId}/learningGoals`)
    const q = query(learningGoalsRef, orderBy('sequence'))

    const querySnapshot = await getDocs(q)

    const learningGoalsList: LearningGoalType[] = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
      const learningGoal: LearningGoalType = {
        id: doc.id,
        goal: doc.data().goal,
        content: doc.data().content,
        sequence: doc.data().sequence,
        successIndicator: doc.data().successIndicator,
        studentsCompleted: doc.data().studentsCompleted,
      }
      learningGoalsList.push(learningGoal)
    })
    setLearningGoals(learningGoalsList)
  }

  useEffect(() => {
    getLearningGoals()
  }, [courseId])

  function getCourseProgress(studentId: string): number {
    const total = learningGoals.length
    const completed = learningGoals.reduce((r, a) => {
      return r + (a?.studentsCompleted?.includes(studentId) ? 1 : 0)
    }, 0)
    const diff = completed / total
    const percent = diff * 100 > 100 ? 100 : diff * 100
    return percent || 0
  }

  return (
    <Container component="main" maxWidth="lg">
      <Typography align="center" variant="h3" component="h3">
        {course?.name}
      </Typography>
      <Typography align="center" variant="subtitle1">
        <>
          {'de'} {course && format(course.startDate, 'dd/MM/yyyy')} {' até '}
          {course && format(course.endDate, 'dd/MM/yyyy')}
        </>
      </Typography>
      {course &&
        course.studentsUser?.map((student) => (
          <Box
            key={student.uid}
            alignItems="center"
            p={3}
            sx={{ display: 'flex' }}
          >
            <Box mr={3}>{student.name}</Box>
            <Box mr={3}>
              <Typography variant="body2" color="textSecondary">{`${Math.round(
                getCourseProgress(student.uid)
              )}%`}</Typography>
            </Box>
            <Box
              sx={{
                overflowX: 'auto',
                overflowY: 'hidden',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              <ul className={styles.timeline}>
                {learningGoals &&
                  learningGoals.map((learningGoal) => (
                    <li
                      key={learningGoal.id}
                      className={
                        learningGoal.studentsCompleted?.includes(student.uid)
                          ? styles.complete
                          : ''
                      }
                    >
                      <div className={styles.timestamp}>
                        <span className="">{learningGoal.goal}</span>
                      </div>
                      <div className={styles.status}></div>
                    </li>
                  ))}
              </ul>
            </Box>
          </Box>
        ))}

      {/* <Box alignItems="center" p={3}>
        <Box width="100%" mr={3}>
          <LinearProgress variant="determinate" value={getCourseProgress()} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            getCourseProgress()
          )}%`}</Typography>
        </Box>
      </Box> */}
    </Container>
  )
}

export default CourseDashboard