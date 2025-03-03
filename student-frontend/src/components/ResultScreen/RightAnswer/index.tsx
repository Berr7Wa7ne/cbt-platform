import { FC } from 'react'
import styled from 'styled-components'

import { HighlightedText } from '../../../styles/Global'

interface RightAnswerProps {
  correctAnswers: string[]
  options: string[]
}

const RightAnswerContainer = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGray};
  margin-top: 15px;
  line-height: 1.2;
`

const RightAnswer: FC<RightAnswerProps> = ({ correctAnswers, options }) => {
  return (
    <RightAnswerContainer>
      {`Right ${correctAnswers.length < 2 ? 'Answer' : 'Answers'}: `}
      {correctAnswers.map((item: string, index: number) => {
        const label = String.fromCharCode(65 + options.indexOf(item))

        return (
          <HighlightedText key={index} themeText>
            {`${label} (${item})${index !== correctAnswers.length - 1 ? ', ' : ''}`}
          </HighlightedText>
        )
      })}
    </RightAnswerContainer>
  )
}

export default RightAnswer
