import { ReactElement } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CourseType {
  id?: string | undefined
  name: string
  description?: string
  startDate: Date
  endDate: Date
  ownerUser: string | null | undefined
  students?: string[]
  learningGoals?: LearningGoalType[] | undefined
}

export interface LearningGoalType {
  id?: string | null
  goal?: string | null
  content?: string | null
  sequence: number | null
  successIndicator?: string | null
  studentsCompleted?: string[] | null
}

export interface LearningGoalProp {
  learningGoal: LearningGoalType
  onChangeValue: (event: any) => void
}

export interface CourseUserTypeProp {
  userType?: CourseUserType
}

export enum CourseUserType {
  STUDENT,
  OWNER,
}

export interface ModalConfirmType {
  disable?: boolean
  icon: ReactElement
  title: string
  confirmAction: () => void
}

export interface ModalType {
  close: () => void
}
