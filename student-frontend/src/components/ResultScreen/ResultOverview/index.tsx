export {}
// import { FC } from 'react'
// import styled from 'styled-components'

// import { useExam } from '../../../context/ExamContext'
// import { device } from '../../../styles/BreakPoints'
// import { HighlightedText, Flex } from '../../../styles/Global'
// import { convertSeconds } from '../../../utils/helpers'
// import { Result } from '../../../types'

// // Style for the result overview container
// const ResultOverviewStyle = styled.div`
//   text-align: center;
//   margin-bottom: 70px;
//   @media ${device.md} {
//     margin-bottom: 30px;
//   }
//   p {
//     margin-top: 15px;
//     font-weight: 500;
//     font-size: 36px; /* Increase this size for larger text */
//   }
// `

// // New styled components for progress bar and status badge
// const ProgressBarContainer = styled.div`
//   background-color: ${({ theme }) => theme.colors.secondaryText};
//   border-radius: 8px;
//   height: 20px;
//   width: 100%;
//   margin: 10px 0;
// `

// const ProgressBar = styled.div<{ percentage: number }>`
//   background-color: ${({ percentage, theme }) =>
//     percentage >= 60 ? theme.colors.success : theme.colors.danger};
//   height: 100%;
//   width: ${({ percentage }) => percentage}%;
//   border-radius: 8px;
// `

// const StatusBadge = styled.span<{ status: string }>`
//   display: inline-block;
//   padding: 5px 15px;
//   color: white;
//   background-color: ${({ status, theme }) =>
//     status === 'Passed' ? theme.colors.success : theme.colors.danger};
//   border-radius: 5px;
//   font-size: 24px; /* Increased size for badge */
//   margin-top: 10px;
//   margin-left: 10px;
// `

// // Style for HighlightedText to be even larger
// const LargeHighlightedText = styled(HighlightedText)`
//   font-size: 42px; /* Larger font size for highlighted values */
// `

// interface ResultOverviewProps {
//   result: Result[];
//   loading: boolean;
//   error: string | null;
// }

// const ResultOverview: FC<ResultOverviewProps> = ({ result }) => {
//   const { ExamDetails, endTime } = useExam()

//   const totalQuestionAttempted = result.length

//   const obtainedScore = result
//     .filter((item) => item.isMatch && typeof item.score === 'number')
//     .reduce((accumulator, currentValue) => accumulator + (currentValue.score || 0), 0)

//   const scorePercentage = (obtainedScore / ExamDetails.totalScore) * 100

//   // Passed if 60 or more than 60% marks
//   const calculateStatus = scorePercentage >= 60 ? 'Passed' : 'Failed'

//   return (
//     <ResultOverviewStyle>
//       {/* Add a progress bar for score percentage */}
//       <ProgressBarContainer>
//         <ProgressBar percentage={scorePercentage} />
//       </ProgressBarContainer>

//       <p>
//         You attempted questions: 
//         <LargeHighlightedText> {totalQuestionAttempted} </LargeHighlightedText> /{' '}
//         {ExamDetails.totalQuestions}
//       </p>

//       <p>
//         Score secured:
//         <LargeHighlightedText> {obtainedScore} </LargeHighlightedText> /{' '}
//         {ExamDetails.totalScore}
//       </p>

//       <p>
//         Time Spent:
//         <LargeHighlightedText> {convertSeconds(endTime)} </LargeHighlightedText>
//       </p>

//       {/* Add a status badge for Pass/Fail */}
//       <p>
//         Status:
//         <StatusBadge status={calculateStatus}>{calculateStatus}</StatusBadge>
//       </p>
//     </ResultOverviewStyle>
//   )
// }

// export default ResultOverview
