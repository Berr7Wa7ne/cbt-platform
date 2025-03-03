import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { device } from '../../styles/BreakPoints';
import { AppLogo } from '../../config/icons';
import {
  CenterCardContainer,
  HighlightedText,
  PageCenter,
} from '../../styles/Global';
import Button from '../ui/Button';
import { getStudentIDFromToken } from '../../utils/helpers';
import { useExam } from '../../context/ExamContext'; 

interface Exam {
  id: number;
  examTitle: string;
  available: boolean;
  examDate: string;
  examTime: string;
  duration: number;
  course: {
    courseCode: string;
  };
}

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

const Heading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const DetailText = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
`;

const SelectButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 60%;
  gap: 30px;
  margin-top: 40px;
  margin-bottom: 45px;
  @media ${device.md} {
    row-gap: 20px;
    column-gap: 20px;
    max-width: 100%;
  }
`;

interface SelectButtonProps {
  active: boolean;
  disabled?: boolean;
}

const SelectButton = styled.div<SelectButtonProps>`
  background-color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.disabledCard}` : `${theme.colors.selectTopicBg}`};
  border: ${({ active, theme }) =>
    active
      ? `2px solid ${theme.colors.themeColor}`
      : `1px solid ${theme.colors.disabledButton}`};
  transition: background-color 0.4s ease-out;
  border-radius: 10px;
  padding: 14px 10px;
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  @media ${device.md} {
    padding: 10px;
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }
`;

const SelectButtonText = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  @media ${device.md} {
    font-size: 16px;
    font-weight: 500;
  }
`;

const AvailableExamsScreen: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setExamID } = useExam(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/student/exams', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response data exams", response.data.exams);

        setExamID(response.data.exams);

        setExams(response.data.exams);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch available exams');
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleExamSelection = (examID: number) => {
    setSelectedExam(examID);   
    setExamID(examID.toString());         
  };

  const goToExamDetailsScreen = () => {
    if (selectedExam) {
      const selectedExamDetails = exams.find((exam) => exam.id === selectedExam);
      if (selectedExamDetails) {
        navigate('/exam-details', {
          state: { examDetails: selectedExamDetails },
        });
      }
    }
  };

  if (loading) return <div>Loading available exams...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer>
          <AppLogo />
          <LogoText>EVERGREEN VALLEY UNIVERSITY</LogoText>
        </LogoContainer>
        <Heading>
          AVAILABLE <HighlightedText>EXAMS</HighlightedText>
        </Heading>
        <DetailText>Select an exam to begin your test.</DetailText>
        <SelectButtonContainer>
          {exams.map((exam) => (
            <SelectButton
              key={exam.id}
              active={selectedExam === exam.id}
              onClick={() => handleExamSelection(exam.id)}  // Handle exam selection
              disabled={!exam.available}
            >
              <SelectButtonText>
                {`${exam.course.courseCode}: ${exam.examTitle}`}
              </SelectButtonText>
            </SelectButton>
          ))}
        </SelectButtonContainer>
        <Button text="Continue" onClick={goToExamDetailsScreen} bold disabled={!selectedExam} />
      </CenterCardContainer>
    </PageCenter>
  );
};

export default AvailableExamsScreen;
