import ProtectedRoute from '../../components/ProtectedRoute'
import Typography from '@mui/material/Typography'
import { Container, FormGroup } from '@mui/material'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers'
import { FormEvent, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Goal from '../../components/Goal'

const FormPage = () => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  // eslint-disable-next-line react/jsx-key
  const [goals, setGoals] = useState([<Goal sequence={1} />])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      // implementar envio para o firebase
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
            id="content"
            label="Conteúdo do curso"
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

          {goals.map((item) => (
            <Box key={item.props.sequence}>{item}</Box>
          ))}

          <Button
            type="button"
            variant="outlined"
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={() => {
              // eslint-disable-next-line react/jsx-key
              setGoals([...goals, <Goal sequence={goals.length + 1} />])
            }}
          >
            <AddIcon />
            Mais um objetivo
          </Button>
          <Button
            type="button"
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
