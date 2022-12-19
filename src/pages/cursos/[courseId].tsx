import type { NextPage } from 'next'
import { Container } from '@mui/material'
import Copyright from '../../components/Copyright'
import { useRouter } from 'next/router'
import { CourseType, LearningGoalType } from '../../types/CourseType'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import styles from '../../styles/Timeline.module.css'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import CheckIcon from '@mui/icons-material/Check'

import { db } from '../../config/firebase'

const Goals: NextPage = () => {
  const router = useRouter()
  const courseId: string = '' + router.query.courseId

  const [learningGoals, setLearningGoals] = useState<LearningGoalType[]>()
  const [course, setCourse] = useState<CourseType>()

  const getLearningGoals = async () => {
    if (!courseId) return
    const docRef = doc(db, 'courses', courseId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      const c: CourseType = {
        id: null,
        description: null,
        name: docSnap.data().name,
        startDate: docSnap.data().startDate.toDate(),
        endDate: docSnap.data().endDate.toDate(),
      }
      setCourse(c)
      console.log(course)
    } else {
      // doc.data() will be undefined in this case
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
      }
      learningGoalsList.push(learningGoal)
    })
    setLearningGoals(learningGoalsList)
  }

  useEffect(() => {
    getLearningGoals()
  }, [courseId])

  return (
    <Container component="main" maxWidth="sm">
      <Typography align="center" variant="h3" component="h3">
        {course?.name}
      </Typography>
      <Typography align="center" variant="subtitle1">
        <>
          {'de'} {course && format(course.startDate, 'dd/mm/yyyy')} {' até '}
          {course && format(course.endDate, 'dd/mm/yyyy')}
        </>
      </Typography>
      <div className={styles.timeline}>
        {learningGoals &&
          learningGoals.map((learningGoal) => (
            <div key={learningGoal.id} className={styles.card}>
              <div className={styles.info}>
                <div className={styles.title}>
                  <h3>{learningGoal.goal}</h3>
                  <label className={styles.label}>
                    <input className={styles.label__checkbox} type="checkbox" />
                    <span className={styles.label__text}>
                      <span className={styles.label__check}>
                        <CheckIcon />
                      </span>
                    </span>
                  </label>
                </div>
                <p>
                  <b>Conteúdo</b>: <br />
                  {learningGoal.content}
                </p>

                <p>
                  <b>Indicador de sucesso</b>: {learningGoal.successIndicator}{' '}
                </p>
              </div>
            </div>
          ))}
      </div>
      <Copyright />
    </Container>
  )
}

export default Goals
