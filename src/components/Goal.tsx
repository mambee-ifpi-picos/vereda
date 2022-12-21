import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { GoalProp } from '../types/Types'

function Goal({ sequence }: GoalProp) {
  return (
    <Box
      component="fieldset"
      sx={{
        border: '1px solid #313546',
        borderRadius: '4px',
        width: '100%',
        margin: '8px 8px 16px 8px',
      }}
    >
      <legend
        style={{
          padding: '0.5rem',
          border: '1px solid #313546',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Mulish',
        }}
      >
        {sequence}
      </legend>
      <TextField
        fullWidth
        sx={{ m: 1 }}
        id={`goal-${sequence}`}
        label="Objetivo"
        variant="outlined"
      />
      <TextField
        fullWidth
        sx={{ m: 1 }}
        id={`goal-${sequence}-content`}
        label="Conteúdo"
        multiline
        rows={2}
      />
      <TextField
        fullWidth
        sx={{ m: 1 }}
        id={`goal-${sequence}-success-indicator`}
        label="Indicador de Sucesso"
        variant="outlined"
      />
    </Box>
  )
}

export default Goal
