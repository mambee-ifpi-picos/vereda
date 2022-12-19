export interface CourseType {
  id: string | null
  name: string
  description: string | null
  startDate: Date
  endDate: Date
}

export interface LearningGoalType {
  id: string
  goal: string
  content: string
  sequence: number
  successIndicator: string
}
