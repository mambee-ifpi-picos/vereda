/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CourseType {
  id?: string | undefined
  name: string
  description?: string
  startDate: Date
  endDate: Date
  ownerUser: string | null | undefined
  students?: string
  learningGoals?: LearningGoalType[] | undefined
}

export interface LearningGoalType {
  id?: string | undefined
  goal?: string | undefined
  content?: string | undefined
  sequence: number | undefined
  successIndicator?: string | undefined
}

export interface LearningGoalProp {
  learningGoal: LearningGoalType
  onChangeValue: (event: any) => void
}
