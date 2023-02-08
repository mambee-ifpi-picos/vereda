/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { LearningGoalProp, LearningGoalType } from '../types/Types'
import { useState } from 'react'

const MAX_LENGTH = 2
function LearningGoal({ onChangeValue, learningGoal }: LearningGoalProp) {
  const [goal, setGoal] = useState('')
  const [content, setContent] = useState('')
  const [successIndicator, setSuccessIndicator] = useState('')

  // foi criado essa função somente para atualizar o estado de validação dos inputs
  const handleChange = (event: any) => {
    const field: string = event.target.id.split('-')[0]
    learningGoal[field as keyof LearningGoalType] = event.target.value
    setGoal(learningGoal.goal || '')
    setContent(learningGoal.content || '')
    setSuccessIndicator(learningGoal.successIndicator || '')
    onChangeValue(event)
  }

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
        error={!goal || goal.length < MAX_LENGTH}
        value={learningGoal.goal}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        sx={{ m: 1 }}
        id={`content-${learningGoal.sequence}-content`}
        label="Conteúdo"
        multiline
        error={!content || content.length < MAX_LENGTH}
        rows={2}
        value={learningGoal.content}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        sx={{ m: 1 }}
        id={`successIndicator-${learningGoal.sequence}`}
        label="Indicador de Sucesso"
        variant="outlined"
        error={!successIndicator || successIndicator.length < MAX_LENGTH}
        value={learningGoal.successIndicator}
        onChange={handleChange}
      />
    </Box>
  )
}

export default LearningGoal
