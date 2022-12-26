import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { LearningGoalProp } from '../types/Types'

function LearningGoal({ onChangeValue, learningGoal }: LearningGoalProp) {
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
        {learningGoal.sequence}
      </legend>
      <TextField
        fullWidth
        sx={{ m: 1 }}
        id={`goal-${learningGoal.sequence}`}
        label="Objetivo"
        variant="outlined"
        value={learningGoal.goal}
        onChange={onChangeValue}
      />
      <TextField
        fullWidth
        sx={{ m: 1 }}
        id={`content-${learningGoal.sequence}-content`}
        label="Conteúdo"
        multiline
        rows={2}
        value={learningGoal.content}
        onChange={onChangeValue}
      />
      <TextField
        fullWidth
        sx={{ m: 1 }}
        id={`successIndicator-${learningGoal.sequence}`}
        label="Indicador de Sucesso"
        variant="outlined"
        value={learningGoal.successIndicator}
        onChange={onChangeValue}
      />
    </Box>
  )
}

export default LearningGoal
