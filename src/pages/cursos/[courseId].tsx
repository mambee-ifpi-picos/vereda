/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextPage } from 'next'
import { Box, Button, Container } from '@mui/material'
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
import { LinearProgress } from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens'

const Goals: NextPage = () => {
  const ref = useRef<ModalType>()
  const router = useRouter()
  const { user } = useAuth()

  const courseId: string = '' + router.query.courseId
  const courseDocRef = doc(db, 'courses', courseId)

  const [learningGoals, setLearningGoals] = useState<LearningGoalType[]>([])
  const [course, setCourse] = useState<CourseType>()

  const [pinkColor, setPinkColor] = useState(
    localStorage.getItem('pinkColor') == 'true'
  )

  const subscribe = async () => {
    if (!user.uid) {
      router.push('/login')
    }
    await updateDoc(courseDocRef, {
      students: arrayUnion(user.uid),
    })
    course?.students?.push(user.uid || '')
    // @ts-ignore
    setCourse({
      ...course,
      students: [...(course?.students || []), user.uid || ''],
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
      const c: CourseType = {
        name: docSnap.data().name,
        startDate: docSnap.data().startDate.toDate(),
        endDate: docSnap.data().endDate.toDate(),
        ownerUser: docSnap.data().ownerUser,
        students: docSnap.data().students,
      }
      setCourse(c)
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

  function isCompleted(learningGoal: LearningGoalType): boolean {
    return learningGoal.studentsCompleted?.includes(user.uid || '') || false
  }

  function getCourseProgress(): number {
    const total = learningGoals.length
    const completed = learningGoals.reduce((r, a) => {
      return r + (a?.studentsCompleted?.includes(user.uid || '') ? 1 : 0)
    }, 0)
    const diff = completed / total
    const percent = diff * 100 > 100 ? 100 : diff * 100
    return percent || 0
  }

  function isSubscribed(): boolean {
    return course?.students?.includes(user.uid || '') || false
  }

  function changeLineColor() {
    setPinkColor(!pinkColor)
    localStorage.setItem('pinkColor', `${!pinkColor}`)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography align="center" variant="h4" component="h4">
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
        disabled={isSubscribed()}
      >
        {isSubscribed() ? 'Inscrito' : 'Inscrever - se'}
      </Button>
      <Box
        alignItems="center"
        p={1}
        sx={{ display: isSubscribed() ? 'flex' : 'none' }}
      >
        <Box width="100%" mr={3}>
          <LinearProgress variant="determinate" value={getCourseProgress()} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            getCourseProgress()
          )}%`}</Typography>
        </Box>
      </Box>

      <Typography align="center" variant="subtitle1">
        Objetivos de aprendizagem
      </Typography>

      <div className={styles.timeline}>
        {learningGoals &&
          learningGoals.map((learningGoal) => (
            <div
              key={learningGoal.id}
              className={`${styles.card} ${
                isCompleted(learningGoal)
                  ? styles.completed
                  : pinkColor
                  ? styles.pink
                  : ''
              }`}
            >
              <div className={styles.info}>
                <div className={styles.title}>
                  <h4>{learningGoal.goal}</h4>
                  <label className={styles.label}>
                    <span className={styles.label__text}>
                      <span
                        className={
                          isCompleted(learningGoal)
                            ? styles.label__checked
                            : styles.label__check
                        }
                      >
                        <ModalConfirm
                          disable={!isSubscribed() || isCompleted(learningGoal)}
                          ref={ref}
                          icon={
                            <CheckIcon
                              color={
                                isCompleted(learningGoal)
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
                  <b>Conteúdo</b>: {learningGoal.content}
                </p>

                <p>
                  <b>Indicador de sucesso</b>: {learningGoal.successIndicator}{' '}
                </p>
              </div>
            </div>
          ))}
      </div>
      <Box className={styles.changeColor}>
        <Box
          onClick={() => changeLineColor()}
          className={`${pinkColor ? styles.blueIcon : styles.pinkIcon}`}
        >
          <ColorLensIcon />
        </Box>
      </Box>
    </Container>
  )
}

export default Goals
