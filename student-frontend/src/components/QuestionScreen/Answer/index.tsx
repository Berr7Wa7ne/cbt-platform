export {};
// import { FC } from 'react'
// import styled, { css } from 'styled-components'
// import { device } from '../../../styles/BreakPoints'
// import { SelectAnswer } from '../../../types'

// const AnswerStyle = styled.div<{ highlightAnswer: boolean }>`
//   font-size: clamp(18px, 4vw, 16px);
//   color: ${({ theme }) => theme.colors.secondaryText};
//   font-weight: 400;
//   border: 1px solid
//     ${({ highlightAnswer, theme }) =>
//       highlightAnswer ? `${theme.colors.themeColor}` : `${theme.colors.border}`};
//   background-color: ${({ highlightAnswer, theme }) =>
//     highlightAnswer ? `${theme.colors.selectedAnswer}` : `${theme.colors.answerBg}`};
//   border-radius: 16px;
//   margin-top: clamp(13px, calc(10px + 6 * ((100vw - 600px) / 1320)), 16px);
//   cursor: pointer;
//   ${({ highlightAnswer }) =>
//     highlightAnswer &&
//     css`
//       transition: border 0.2s ease-in;
//     `}
//   @media ${device.md} {
//     font-weight: 500;
//   }
//   input {
//     visibility: hidden;
//     margin: 0;
//   }
// `

// const AnswerLabel = styled.label`
//   padding: 18px;
//   display: flex;
//   cursor: pointer;
//   @media ${device.md} {
//     padding: 14px;
//   }
// `

// const ChoiceLabel = styled.span``

// interface AnswerProps {
//   index: number
//   options: string
//   type: string
//   selectedAnswer: SelectAnswer[]
//   onClick: (e: any) => void
//   questionID: number // Add questionID for unique input identification
//   setSelectedAnswer: React.Dispatch<React.SetStateAction<SelectAnswer[]>>;
// }


// const Answer: FC<AnswerProps> = ({ onClick, index, options, type, selectedAnswer, questionID, setSelectedAnswer, }) => {
//   // Convert index to alphabet character to show ABCD before question
//   const label = String.fromCharCode(65 + index)

//   const isHighlighted = selectedAnswer.some(answer => answer.answer === options);

//   console.log('Rendering option:', options, 'Highlight status:', isHighlighted);
//   console.log('Selected answers list:', selectedAnswer);

//   const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked } = e.target;
  
//     // Assuming selectedAnswer is an array of objects like { answer: string, questionID: number }
//     if (checked) {
//       setSelectedAnswer(prevAnswers => [...prevAnswers, { answer: value, questionID }]);
//     } else {
//       // Remove the answer if it's unchecked (for multi-choice questions)
//       setSelectedAnswer(prevAnswers =>
//         prevAnswers.filter(answer => answer.answer !== value)
//       );
//     }
  
//     console.log('Updated selectedAnswer:', selectedAnswer);
//   };
  

//   return (
//     <AnswerStyle key={index} highlightAnswer={selectedAnswer.some(answer => answer.answer === options)}>
//       <AnswerLabel>
//         <ChoiceLabel>{label}.</ChoiceLabel>
//         <input
//           name={`question-${questionID}-choice-${options}`} 
//           type={type === 'MAQs' ? 'checkbox' : 'radio'}
//           checked={isHighlighted}
//           onClick={(e) => {
//             onClick(e)
//           }}
//           aria-checked={isHighlighted ? 'true' : 'false'} 
//         />
//         {options}
//       </AnswerLabel>
//     </AnswerStyle>
//   )
// }

// export default Answer
