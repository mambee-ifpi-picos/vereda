/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedRoute from '../../components/ProtectedRoute'
import { useAuth } from '../../context/AuthContext'
import Typography from '@mui/material/Typography'
import { Container, FormGroup } from '@mui/material'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers'
import { FormEvent, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import LearningGoal from '../../components/LearningGoal'
import { CourseType, LearningGoalType } from '../../types/Types'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

const FormPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [learningGoals, setLearningGoals] = useState<LearningGoalType[]>([
    {
      sequence: 1,
    },
  ])

  const handleChangeValue = (event: any) => {
    const [field, sequence]: [string, string] = event.target.id.split('-')

    const learningGoalTarget = learningGoals.find(
      (element) => element.sequence == parseInt(sequence)
    )
    if (learningGoalTarget)
      learningGoalTarget[field as keyof LearningGoalType] = event.target.value
  }
  // eslint-disable-next-line react/jsx-key
  const [learningGoalsEl, setLearningGoalsEl] = useState([
    <LearningGoal
      key={1}
      onChangeValue={handleChangeValue}
      learningGoal={learningGoals[0]}
    />,
  ])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      // implementar envio para o firebase
      const newCourse: CourseType = {
        name: name,
        description: description,
        startDate: startDate?.toDate() || new Date(),
        endDate: endDate?.toDate() || new Date(),
        ownerUser: user.uid,
      }
      const docRef = await addDoc(collection(db, 'courses'), newCourse)
      console.log('Document written with ID: ', docRef.id)
      learningGoals.forEach((learningGoal) => {
        console.log('learningGoal => ', learningGoal)
        addDoc(
          collection(db, 'courses', docRef.id, 'learningGoals'),
          learningGoal
        )
      })
      router.push('/cursos/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProtectedRoute>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          paddingY: '2rem',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          color="secondary"
          align="center"
          variant="h3"
          component="h3"
        >
          Cadastro de curso
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            marginTop: 2,
            width: '100%',
          }}
        >
          <TextField
            fullWidth
            sx={{ m: 1 }}
            id="name"
            label="Nome"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            sx={{ m: 1 }}
            id="description"
            label="Descrição do curso"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormGroup
            sx={{
              width: '100%',
              margin: '8px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                inputFormat="DD/MM/YYYY"
                label="Data inicial"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue)
                }}
              />
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                inputFormat="DD/MM/YYYY"
                label="Data final"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue)
                }}
              />
            </LocalizationProvider>
          </FormGroup>
          <Typography
            color="secondary"
            marginTop="16px"
            align="center"
            variant="h5"
            component="p"
          >
            Objetivos de aprendizagem
          </Typography>

          {learningGoalsEl.map((item) => (
            <Box key={item.props.sequence}>{item}</Box>
          ))}

          <Button
            type="button"
            variant="outlined"
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={() => {
              const newLearningGoal: LearningGoalType = {
                sequence: learningGoals.length + 1,
              }
              learningGoals.push(newLearningGoal)
              // eslint-disable-next-line react/jsx-key
              setLearningGoals(learningGoals)
              setLearningGoalsEl([
                ...learningGoalsEl,
                <LearningGoal
                  key={newLearningGoal.sequence}
                  onChangeValue={handleChangeValue}
                  learningGoal={newLearningGoal}
                />,
              ])
            }}
          >
            <AddIcon />
            Mais um objetivo
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Salvar
          </Button>
        </Box>
      </Container>
    </ProtectedRoute>
  )
}

export default FormPage
