import { Dispatch, SetStateAction } from 'react';

export enum ScreenTypes {
  SplashScreen = 'SplashScreen',
  AvailableExamsScreen = 'AvailableExamsScreen',
  ExamDetailsScreen = 'ExamDetailsScreen',
  QuestionScreen = 'QuestionScreen',
  Review = 'Review',
  ResultScreen = 'ResultScreen',
  LoginScreen = 'LoginScreen',                
  ForgotPasswordScreen = 'ForgotPasswordScreen',       
  ResetPasswordScreen = 'ResetPasswordScreen', 
}
export interface QuestionTypes {
  type: "boolean" | "MCQs" | "MAQs";
  questionID: number;
  questionText: string;         
  courseCode: string;           
  examID: string;               
  questionType: 'multiple-choice' | 'true-false' | 'short-answer'; 
  options?: string[];              
  currentQuestionNumber: number;
  totalQuestions: number;
  handleAnswerSelection: (questionID: number, selectedOption: string) => void;
  selectedAnswer: SelectAnswer[]
}

export interface Question {
  type: "boolean" | "MCQs" | "MAQs";
  id: number;           
  questionText: string;         
  courseCode: string;           
  examID: string;               
  questionType: 'multiple-choice' | 'true-false' | 'short-answer'; 
  options?: string[];          
  correctAnswer: string | string[];
  totalQuestions: number;
}

export interface Result extends Question {
  isMatch: boolean;
  examTitle: string;
  score: number;
  grade: string;
  courseTitle: string;
  examDate: string;
  credits: number;
  department: string;
  level: number;
  studentName: string;
  studentImage: string;
  endTime: number;
}

export interface StudentAnswer {
  questionID: number;
  answer: string[];
}
export interface SelectAnswer {
  questionID: number;   
  selectedOption: string | string[];     
}

export interface ExamDetails{
  studentID: number;
  totalQuestions: number;
  totalScore: number;
  totalTime: number;
  selectedExamTopic: string;
  examTitle: string;
  duration: number;
  questions: any[];
}

export type ExamContextTypes = {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;

  selectedAnswer: SelectAnswer[]; 
  setSelectedAnswer: Dispatch<SetStateAction<SelectAnswer[]>>; 

  result: Result[];
  setResult: Dispatch<SetStateAction<any[]>>;

  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;

  ExamDetails: {
    studentID: number;
    totalQuestions: number;
    totalScore: number;
    totalTime: number;
    selectedExamTopic: string;
    examTitle: string;
    duration: number;
    questions: any[];
  };
  setExamDetails: Dispatch<SetStateAction<ExamDetails>>;

  examID: string | null;
  studentID: number | null;
  setExamID: (examID: string | null) => void;
  setStudentID: (id: number) => void;

  examStatus: 'in-progress' | 'completed' | 'submitted';
  setExamStatus: Dispatch<SetStateAction<'in-progress' | 'completed' | 'submitted'>>;
};
