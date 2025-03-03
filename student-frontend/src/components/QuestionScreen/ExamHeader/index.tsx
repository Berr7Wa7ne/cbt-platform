import { FC } from 'react'
import styled from 'styled-components'

import { Flex } from '../../../styles/Global'
import { addLeadingZero, formatTime } from '../../../utils/helpers'
import Counter from './Counter'

const ActiveQuestionNo = styled.span`
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.themeColor};
`

const TotalQuestionNo = styled.span`
  font-size: clamp(20px, 5vw, 30px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkerGray};
`

const ExamHeaderContainer = styled(Flex)`
  margin-bottom: 20px;
`

// Timer style that will dynamically change based on time left
const TimerStyle = styled.div<{ isTimeRunningOut: boolean }>`
  font-size: clamp(16px, 5vw, 24px);
  font-weight: 500;
  color: ${({ isTimeRunningOut, theme }) => isTimeRunningOut ? theme.colors.danger : theme.colors.themeColor};
  transition: color 0.3s ease;
`

const StatusMessage = styled.span`
  font-size: clamp(14px, 4vw, 18px);
  color: ${({ theme }) => theme.colors.themeColor};
  margin-top: 5px;
`

interface ExamHeaderProps {
  activeQuestion: number
  totalQuestions: number
  timer: number
  timeThreshold: number // Time (in seconds) below which the timer turns red
  statusMessage?: string // Optional status message or instructions
}

const ExamHeader: FC<ExamHeaderProps> = ({ activeQuestion, totalQuestions, timer, timeThreshold, statusMessage }) => {
  // Check if time is running out (e.g., less than 5 minutes)
  const isTimeRunningOut = timer <= timeThreshold; // timeThreshold could be passed as 300 for 5 minutes

  return (
    <ExamHeaderContainer spaceBetween gap="6px">
      <div>
        <ActiveQuestionNo>{addLeadingZero(activeQuestion + 1)}</ActiveQuestionNo>
        <TotalQuestionNo>/{addLeadingZero(totalQuestions)}</TotalQuestionNo>
      </div>
      <Flex column>
        {/* Dynamically change the timer color based on remaining time */}
        <TimerStyle isTimeRunningOut={isTimeRunningOut}>
          <Counter time={`${formatTime(timer)}`} />
        </TimerStyle>
        {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
      </Flex>
    </ExamHeaderContainer>
  )
}

export default ExamHeader
