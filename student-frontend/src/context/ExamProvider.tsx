import { ReactNode, useState } from 'react';
import { ExamContextTypes, Result, Question, StudentAnswer, SelectAnswer, ExamDetails } from '../types';
import { ExamContext, initialState } from './ExamContext';

type ExamProviderProps = {
  children: ReactNode;
};

const ExamProvider = ({ children }: ExamProviderProps) => {
  const [timer, setTimer] = useState<number>(initialState.timer);
  const [result, setResult] = useState<Result[]>(initialState.result);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [examID, setExamID] = useState<string | null>(null);
  const [studentID, setStudentID] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<SelectAnswer[]>([]);
  const [examStatus, setExamStatus] = useState<'in-progress' | 'completed' | 'submitted'>('in-progress');
  const [examDetails, setExamDetails] = useState<ExamDetails>({
    studentID: studentID || 0,
    totalQuestions: 0,
    totalScore: 0,
    totalTime: 0,
    selectedExamTopic: 'React',
    examTitle: 'MidTerm Examination',
    duration: 0,
    questions: [],
  });


  const examContextValue: ExamContextTypes = {

    questions,
    setQuestions,
    selectedAnswer,
    setSelectedAnswer,
    result,
    setResult,
    ExamDetails: examDetails,
    timer,
    setTimer,
    setExamID,
    setStudentID,
    setExamDetails,
    examStatus,
    setExamStatus,
    examID,
    studentID,
  };

  return <ExamContext.Provider value={examContextValue}>{children}</ExamContext.Provider>;
};

export default ExamProvider;
