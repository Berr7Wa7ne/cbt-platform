import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../../styles/BreakPoints';
import React, { FC } from 'react';
import { SelectAnswer, QuestionTypes } from '../../../types';


// Styled components for layout and styling
const QuestionContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  max-width: 88%;
  @media ${device.sm} {
    max-width: 100%;
  }
`;

const AnswersContainer = styled.div`
  max-width: 78%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media ${device.sm} {
    max-width: 100%;
  }
`;

const OptionLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const QuestionStyle = styled.h2`
  font-size: clamp(18px, 4vw, 28px);
  font-weight: 500;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.primaryText};
  line-height: 1.3;
`;

// Dynamic styling for answer options
const AnswerOption = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${({ isSelected }) => (isSelected ? '#4caf50' : '#fff')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#45a049' : '#f1f1f1')};
  }
`;

const ProgressBarContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.secondaryText};
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBarFiller = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.themeColor};
  transition: width 0.3s ease-in-out;
`;

// Props for the Question component

const Question: FC<QuestionTypes> = ({
  type,
  questionID,
  questionText,
  options,
  courseCode,
  examID,
  questionType,
  currentQuestionNumber, 
  totalQuestions, 
  handleAnswerSelection,
}) => {

  // Track selected answer
  const [selectedAnswer, setSelectedAnswer] = useState<SelectAnswer[]>([]);

  const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;

  const handleAnswerClick = (selectedOption: string) => {
    setSelectedAnswer([{ questionID, selectedOption }]);
    handleAnswerSelection(questionID, selectedOption);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <QuestionContainer>
      {/* Progress Bar */}
      <ProgressBarContainer>
        <ProgressBarFiller progress={progressPercentage} />
      </ProgressBarContainer>

      {/* Question */}
      <QuestionStyle>{questionText}</QuestionStyle>

      {/* Answer Options */}
      {(options?.length || 0) > 0 && (
        <AnswersContainer>
          {options?.map((option, index) => (
            <AnswerOption
              key={index}
              isSelected={selectedAnswer.some(answer => {
                if (Array.isArray(answer.selectedOption)) {
                  return answer.selectedOption.includes(option); 
                }
                return answer.selectedOption === option; 
              })}
              onClick={() => handleAnswerClick(option)} 
            >
              <OptionLabel>{optionLabels[index]}.</OptionLabel>
              {option}
            </AnswerOption>
          ))}
        </AnswersContainer>
      )}
    </QuestionContainer>
  );
};

export default Question;
