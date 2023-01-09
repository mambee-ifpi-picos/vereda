/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { LearningGoalType } from '../types/Types'
import { Box, Typography } from '@mui/material'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface BarChartProps {
  qtdStudents: number
  learningGoals: LearningGoalType[]
}

const BarChar = ({ qtdStudents, learningGoals }: BarChartProps) => {
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        min: 0,
        max: qtdStudents,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
      },
      title: {
        display: true,
        text: 'Total de alunos que concluiram cada objetivo deste curso',
      },
    },
  }

  const data = {
    labels: learningGoals.map((item) => item.goal),
    datasets: [
      {
        label: 'Alunos que concluiram este objetivo',
        data: learningGoals.map((item) => item.studentsCompleted?.length || 0),
        barPercentage: 0.5,
        barThickness: 32,
        maxBarThickness: 64,
        minBarLength: 2,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Box>
      <Typography align="center" marginTop={4} variant="h5">
        Dados gerais
      </Typography>
      <Box sx={{ maxHeight: { xs: 'auto', md: '300px' } }}>
        {/* 
      // @ts-ignore */}
        <Bar data={data} options={options} />
      </Box>
    </Box>
  )
}

export default BarChar
