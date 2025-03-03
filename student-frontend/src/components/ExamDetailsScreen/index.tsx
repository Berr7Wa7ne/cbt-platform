import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { AppLogo, StartIcon } from '../../config/icons';
import {
  CenterCardContainer,
  HighlightedText,
  PageCenter,
} from '../../styles/Global';
import Button from '../ui/Button';
import { convertSeconds, getDecodedToken } from '../../utils/helpers';
import { useExam } from '../../context/ExamContext';
import { useNavigate } from 'react-router-dom';
import { ExamDetails as ExamDetailsType } from '../../types';
import { device } from '../../styles/BreakPoints';


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
  color: black;
  font-size: 50px;
  font-family: 'sans-serif';
  text-align: center;
  margin-top: 10px; /* Space between logo and text */
`;

const AppTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
`;

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  text-align: center;
  max-width: 500px;
`;

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`;

const ExamDetailsScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { ExamDetails, setExamDetails } = useExam();
  const { examID } = useExam();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamDetails = async (): Promise<ExamDetailsType> => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (!token) {
          throw new Error('Token is missing');
        }

        if (!examID) {
          throw new Error('Missing studentID or examID from token');
        }

        const formattedExamID = examID.startsWith('EXAM') ? examID : `EXAM${examID.padStart(3, '0')}`;
    
        console.log('Fetching exam details for:', { examID: formattedExamID });

        console.log("Frontend examID:", formattedExamID);

        const response = await axios.post<ExamDetailsType>(
          'http://localhost:5000/student/exam-details',
          { formattedExamID },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('API response:', response.data);
        setExamDetails(response.data);
        setLoading(false);
        return response.data;
      } catch (err) {
        if (err instanceof Error) {
          console.error('API call failed:', err.message);
          setError(err.message);
        } else {
          console.error('API call failed with an unknown error');
          setError('An unexpected error occurred');
        }
        setLoading(false);
        throw err;
      }
    };

    const loadExamDetails = async () => {
      try {
        await fetchExamDetails();
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error in loadExamDetails:', err.message);
          setError(err.message || 'An unexpected error occurred');
        } else {
          console.error('Error in loadExamDetails with an unknown error');
          setError('An unexpected error occurred');
        }
      }
    };

    loadExamDetails();
  }, [examID, setExamDetails]);

  const goToQuestionScreen = async () => {
    navigate('/question?c=${questions[0]?.id}');
  };

  if (loading) {
    return <div>Loading exam details, please wait...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer>
          <AppLogo />
          <LogoText>EVERGREEN VALLEY UNIVERSITY</LogoText>
        </LogoContainer>
        <AppTitle>Exam Details</AppTitle>
        {ExamDetails ? (
          <DetailTextContainer>
            <DetailText>
              Exam Title: <HighlightedText>{ExamDetails.examTitle}</HighlightedText>
            </DetailText>
            <DetailText>
              Duration: <HighlightedText>{convertSeconds(ExamDetails.duration)}</HighlightedText>
            </DetailText>
            <DetailText>
              Total Questions: <HighlightedText>{ExamDetails.questions.length}</HighlightedText>
            </DetailText>
            <DetailText>
              You can skip questions during the exam. Skipped questions will appear at the end of the quiz.
            </DetailText>
          </DetailTextContainer>
        ) : (
          <div>Failed to load exam details</div>
        )}

        <Button
          text="Start"
          icon={<StartIcon />}
          iconPosition="left"
          onClick={goToQuestionScreen}
          bold
        />
      </CenterCardContainer>
    </PageCenter>
  );
};

export default ExamDetailsScreen;
