import { createContext, useContext } from 'react';
import { ExamContextTypes, ScreenTypes, SelectAnswer, } from '../types';

export const initialState: ExamContextTypes = {

  questions: [],
  setQuestions: () => {},


  selectedAnswer: [] as SelectAnswer[],
  setSelectedAnswer: () => {},

  result: [],
  setResult: () => {},

  timer: 15,
  setTimer: () => {},

  ExamDetails: {
    studentID: 0,
    totalQuestions: 0,
    totalScore: 0,
    totalTime: 0,
    selectedExamTopic: 'React',
    examTitle: 'MidTerm Examination',
    duration: 0,
    questions: [], 
  },
  setExamDetails: () => {}, 

  examID: null,
  studentID: null,
  setExamID: (examID: string | null) => {
    examID=examID
  },
  setStudentID: () => {},

  examStatus: 'in-progress',
  setExamStatus: () => {},
};

export const ExamContext = createContext<ExamContextTypes>(initialState);

export function useExam() {
  return useContext(ExamContext);
}

export { ScreenTypes };
