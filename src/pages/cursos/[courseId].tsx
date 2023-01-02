import type { NextPage } from 'next'
import { Button, Container } from '@mui/material'
import { useRouter } from 'next/router'
import { CourseType, LearningGoalType, ModalType } from '../../types/Types'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Timeline.module.css'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import CheckIcon from '@mui/icons-material/Check'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../config/firebase'
import ModalConfirm from '../../components/ModalConfirm'

const Goals: NextPage = () => {
  const ref = useRef<ModalType>()
  const router = useRouter()
  const { user } = useAuth()

  const courseId: string = '' + router.query.courseId
  const courseDocRef = doc(db, 'courses', courseId)

  const [learningGoals, setLearningGoals] = useState<LearningGoalType[]>([])
  const [course, setCourse] = useState<CourseType>()

  const subscribe = async () => {
    if (!user.uid) {
      router.push('/login')
    }
    await updateDoc(courseDocRef, {
      students: arrayUnion(user.uid),
    })
  }

  const updateLeaningGoal = async (learningGoalId: string) => {
    if (!user.uid) {
      router.push('/login')
    }
    const learningGoalRef = doc(
      db,
      `courses/${courseId}/learningGoals`,
      learningGoalId
    )
    await updateDoc(learningGoalRef, {
      studentsCompleted: arrayUnion(user.uid),
    })
    console.log('updateLeaningGoal finish')
    updateLocalLearningGoal(learningGoalId)
    ref.current?.close()
  }

  const updateLocalLearningGoal = (learningGoalId: string) => {
    const newState = learningGoals.map((obj) => {
      if (obj.id == learningGoalId) {
        return {
          ...obj,
          studentsCompleted: [...(obj.studentsCompleted || []), user.uid || ''],
        }
      }
      return obj
    })

    if (newState) setLearningGoals(newState)
  }

  const getLearningGoals = async () => {
    if (!courseId) return

    const docSnap = await getDoc(courseDocRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      const c: CourseType = {
        name: docSnap.data().name,
        startDate: docSnap.data().startDate.toDate(),
        endDate: docSnap.data().endDate.toDate(),
        ownerUser: docSnap.data().ownerUser,
        students: docSnap.data().students,
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
        studentsCompleted: doc.data().studentsCompleted,
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
          {'de'} {course && format(course.startDate, 'dd/MM/yyyy')} {' até '}
          {course && format(course.endDate, 'dd/MM/yyyy')}
        </>
      </Typography>
      <Button
        onClick={subscribe}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={course?.students?.includes(user.uid || '')}
      >
        {course?.students?.includes(user.uid || '')
          ? 'Inscrito'
          : 'Inscrever - se'}
      </Button>

      <div className={styles.timeline}>
        {learningGoals &&
          learningGoals.map((learningGoal) => (
            <div key={learningGoal.id} className={styles.card}>
              <div className={styles.info}>
                <div className={styles.title}>
                  <h3>{learningGoal.goal}</h3>
                  <label className={styles.label}>
                    <input
                      disabled={!course?.students?.includes(user.uid || '')}
                      checked={learningGoal.studentsCompleted?.includes(
                        user.uid || ''
                      )}
                      className={styles.label__checkbox}
                      type="checkbox"
                    />
                    <span className={styles.label__text}>
                      <span className={styles.label__check}>
                        <ModalConfirm
                          disable={!course?.students?.includes(user.uid || '')}
                          ref={ref}
                          icon={
                            <CheckIcon
                              color={
                                learningGoal.studentsCompleted?.includes(
                                  user.uid || ''
                                )
                                  ? 'primary'
                                  : 'secondary'
                              }
                            />
                          }
                          title={learningGoal.goal || ''}
                          confirmAction={() =>
                            updateLeaningGoal(learningGoal.id || '')
                          }
                        />
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
    </Container>
  )
}

export default Goals
