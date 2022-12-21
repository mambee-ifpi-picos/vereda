import ProtectedRoute from '../../components/ProtectedRoute'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const FormPage = () => {
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
          sx={{
            marginTop: 2,
            width: '100%',
          }}
        >
          <form>
            <TextField
              fullWidth
              sx={{ m: 1 }}
              id="name"
              label="Nome"
              variant="outlined"
            />

            <TextField
              fullWidth
              sx={{ m: 1 }}
              id="content"
              label="Conteúdo do curso"
              multiline
              rows={3}
            />

            <Typography
              color="secondary"
              marginTop="10px"
              align="center"
              variant="h5"
              component="p"
            >
              Objetivos de aprendizagem
            </Typography>

            <fieldset>
              <legend>Objetivo 1</legend>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="goal-1"
                label="Objetivo"
                variant="outlined"
              />
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="goal-1-content"
                label="Conteúdo"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="goal-1-indicator"
                label="Indicador de Sucesso"
                variant="outlined"
              />
            </fieldset>

            <fieldset>
              <legend>Objetivo 2</legend>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="goal-1"
                label="Objetivo"
                variant="outlined"
              />
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="goal-1-content"
                label="Conteúdo"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="goal-1-indicator"
                label="Indicador de Sucesso"
                variant="outlined"
              />
            </fieldset>

            <Button type="button" variant="contained">
              novo
            </Button>
          </form>
        </Box>
      </Container>
    </ProtectedRoute>
  )
}

export default FormPage
