import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { AppLogo, Next } from '../../config/icons'
import { useExam } from '../../context/ExamContext'
import { useTimer } from '../../hooks'
import { device } from '../../styles/BreakPoints'
import { PageCenter } from '../../styles/Global'
import { SelectAnswer } from '../../types'

import Button from '../ui/Button'
import Question from './Question'
import ExamHeader from './ExamHeader'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";

interface Question {
  id: number;
  questionText: string;
  options?: string[];
  courseCode: string;
  examID: string;
  questionType: 'multiple-choice' | 'true-false' | 'short-answer';
  correctAnswer: string | string[];
  type: 'MAQs' | 'MCQs' | 'boolean'; 
  handleAnswerSelection: (selectedAnswer: string) => void;
  totalQuestions: number;
}


// Styled components
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;

  @media ${device.md} {
    margin-bottom: 20px;

    svg {
      width: 185px;
      height: 80px;
    }
  }
`;

const LogoText = styled.h2`
  color: white;
  font-size: 50px;
  font-family: 'sans-serif';
  text-align: center;
  margin-top: 10px; /* Space between logo and text */
`;

const ExamContainer = styled.div<{ selectedAnswer: boolean }>`
  width: 900px;
  min-height: 500px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 30px 60px 80px 60px;
  margin-bottom: 70px;
  position: relative;
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px 80px 15px;
  }
  button {
    span {
      svg {
        path {
          fill: ${({ selectedAnswer, theme }) =>
            selectedAnswer ? `${theme.colors.buttonText}` : `${theme.colors.darkGray}`};
        }
      }
    }
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  width: 100%;  /* Full width for buttons to be spaced across the screen */
  bottom: 30px;
  display: flex;
  justify-content: space-between;  /* Space Previous and Next/Finish far apart */
  padding-right: 120px;  /* Add some padding to the left and right */
  
  .left {
    justify-self: flex-start;
  }
  
  .right {
    justify-self: flex-end;
  }

  @media ${device.sm} {
    width: 90%;
    padding: 0 15px;
    justify-content: space-between;
  }
`;


const QuestionScreen: FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<SelectAnswer[]>([]);
  const [timer, setTimer] = useState(5400);
  const [endTime, setEndTime] = useState(0);
  const showResultModal = false;
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {  examID, ExamDetails, result, setResult} = useExam();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuestionID = searchParams.get("c");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  console.log("Updated query params:", window.location.search);

  const QuizDetails = {
    totalTime: 5400, // 1 hour 30 minutes in seconds
  };

  useTimer(timer, QuizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        if (!examID) throw new Error('Exam ID not available');

        console.log(localStorage.getItem('token'));

        console.log("Token:", token, "Exam ID:", examID);

        const response = await axios.get(`${API_BASE_URL}/student/fetch-questions`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { examID },
        });

        setQuestions(response.data.questions);
        console.log("This is the questions", questions)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examID]);

  useEffect(() => {
    if (!loading && questions.length > 0) {
      if (currentQuestionID) {
        const currentQuestionIDNumber = parseInt(currentQuestionID, 10);
        const questionIndex = questions.findIndex((q) => q.id === currentQuestionIDNumber);
        if (questionIndex >= 0) {
          setActiveQuestion(questionIndex);
        } else {
          setSearchParams({ c: questions[0].id.toString() });
          setActiveQuestion(0);
        }
      } else {
        setSearchParams({ c: questions[0].id.toString() });
        setActiveQuestion(0);
      }
    }
  }, [loading, questions, currentQuestionID, setSearchParams]);

  
  useEffect(() => {
    if (questions.length > 0 && activeQuestion !== null && activeQuestion >= 0 && activeQuestion < questions.length) {
      const questionID = questions[activeQuestion]?.id;
      console.log("This is the active Question", activeQuestion)
      console.log("This is the questions active Question", questions[activeQuestion])
      if (questionID?.toString() !== currentQuestionID) {
        setSearchParams({ c: questionID.toString() });
      }
    }
  }, [activeQuestion, questions, currentQuestionID, setSearchParams]);

  useEffect(() => {
    console.log('Selected answers updated:', selectedAnswer);
  }, [selectedAnswer]);

  useEffect(() => {
    if (timer <= 0) {
      submitExam();
    }
  }, [timer]);
  

  let selectedQuestion = questions[activeQuestion];

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }

  if (!selectedQuestion) {
    return <div>Loading question...</div>;
  }

const { id: questionID, questionText, courseCode, questionType, type } = selectedQuestion;

const validExamID = String(examID);
// console.log("this is a new questionID", questionID);
// console.log("this is the new log for the currentQuestion", currentQuestion);

const onClickNext = () => {
  setResult([...result, { ...questions[activeQuestion], selectedOption: selectedAnswer }]);

  if (activeQuestion < questions.length - 1) {
    setActiveQuestion(prev => prev + 1);
  } else {
    submitExam();
  }

  setSelectedAnswer(prevAnswers => prevAnswers.filter(answer => answer.questionID !== questions[activeQuestion].id));
};

const onClickPrevious = () => {
  if (activeQuestion > 0) {
    setActiveQuestion(prev => prev - 1);
  }
};

function convertExamIdToString(examID: string | number | null): string {
  if (examID === null) {
    throw new Error('Invalid examID: cannot be null');
  }
  return `EXAM${examID.toString().padStart(3, '0')}`;
}

const submitExam = async () => {
  console.log('Submitting exam...');

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    console.log('Token found:', token);

    if (examID === null) {
      throw new Error('examID cannot be null');
    }

    const formattedExamID = convertExamIdToString(examID);

    const payload = {
      examID: formattedExamID,
      answers: selectedAnswer,
    };

    console.log('Payload:', payload);

    const response = await axios.post(`${API_BASE_URL}/student/submit-exam`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Exam submitted successfully:', response);

    const timeSpent = QuizDetails.totalTime - timer; 
    setEndTime(timeSpent);

    navigate('/results'); 
  } catch (error) {
    console.error('Error submitting exam:', error);
  }
};

const handleAnswerSelection = async (questionID: number, selectedOption: string | string[]) => {
  setSelectedAnswer(prevAnswers => {
    const existingAnswerIndex = prevAnswers.findIndex(answer => answer.questionID === questionID);
    let updatedAnswers;

    if (existingAnswerIndex !== -1) {
      updatedAnswers = [...prevAnswers];
      updatedAnswers[existingAnswerIndex] = {
        ...updatedAnswers[existingAnswerIndex],
        selectedOption: selectedOption 
      };
      console.log(`Updated answer for questionID ${questionID}:`, updatedAnswers[existingAnswerIndex]);
    } else {
      updatedAnswers = [...prevAnswers, { questionID, selectedOption }];
      console.log(`Adding new answer for questionID ${questionID}:`, { questionID, selectedOption });
    }

    return updatedAnswers; 
  });

  try {
    const token = localStorage.getItem('token'); 
    console.log('Token retrieved:', token);

    if (!token) {
      throw new Error('No token found');
    }

    console.log('examID:', examID); 

    const payload = {
      examID: Number(examID) ?? 0,  
      answers: [{ questionID, selectedOption }],
    };

    if (!payload.examID) {
      throw new Error('Invalid payload');
    }

    console.log('Payload to be sent:', payload);

    const response = await axios.post(
      `${API_BASE_URL}/student/submit-answer`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    console.log('Answer submitted successfully:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error submitting answer:', error.response?.data);
    } else {
      console.error('Error submitting answer:', error);
    }
  }

};
 
  return (
    <PageCenter>
      <LogoContainer>
        <AppLogo />
        <LogoText>EVERGREEN VALLEY UNIVERSITY</LogoText>
      </LogoContainer>
      <ExamContainer selectedAnswer={selectedAnswer.length > 0}>
        <ExamHeader
          activeQuestion={activeQuestion}
          totalQuestions={questions.length}
          timer={timer}
          timeThreshold={300}
        />
        <Question
          questionID={questionID}
          questionText={questionText}
          options={selectedQuestion?.options || []}
          courseCode={courseCode}
          examID={validExamID}
          questionType={questionType}
          type={type}
          selectedAnswer={selectedAnswer}
          currentQuestionNumber={activeQuestion + 1}
          totalQuestions={questions.length}
          handleAnswerSelection={handleAnswerSelection} 
        />
      <ButtonWrapper>
        <div className="left">
          <Button
            text="Previous"
            onClick={onClickPrevious}
            disabled={activeQuestion === 0}  
          />
        </div>
        <div className="right">
          <Button
            text={activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="right"
            disabled={!selectedAnswer.some(answer => answer.questionID === selectedQuestion.id)}  // Disable if no answer selected
          />
        </div>
      </ButtonWrapper>
      </ExamContainer>
    </PageCenter>
  );
};

export default QuestionScreen;
