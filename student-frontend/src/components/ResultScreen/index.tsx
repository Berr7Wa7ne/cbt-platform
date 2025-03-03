import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AppLogo } from '../../config/icons';
import { device } from '../../styles/BreakPoints';
import { Result } from '../../types';
import { useExam } from '../../context/ExamContext';
import trophy from '../../assets/images/trophy.jpg';
import bukayo from '../../assets/images/bukayo.jpg';

const ResultScreenContainer = styled.div`
  max-width: 900px;
  margin: 60px auto;
  @media ${device.md} {
    width: 90%;
    margin: 30px auto;
    padding-top: 40px;
  }
`;

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

const StudentName = styled.p`
  font-weight: bold;
  font-size: 25px;
  color: ${({ theme }) => theme.colors.success};
`;

const InnerContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 20px 40px 40px 20px;
  @media ${device.md} {
    padding: 15px;
  }
`;

const ProgressBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryText};
  border-radius: 8px;
  height: 20px;
  width: 100%;
  margin: 10px 0;
  min-height: 20px; /* Add a minimum height */
`;


 const ProgressBar = styled.div<{ percentage: number }>`
 background-color: ${({ percentage, theme }) =>
   percentage >= 60 ? theme.colors.success : theme.colors.danger};
 height: 100%;
 width: ${({ percentage }) => `${percentage}%`}; /* Ensure percentage is used here */
 border-radius: 8px;
 transition: width 0.5s ease; /* Smooth transition for better visibility */
`;

const PercentageIndicator = styled.div<{ percentage: number }>`
  position: absolute;
  top: -20px;
  left: ${({ percentage }) => `calc(${percentage}% - 20px)`};
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 24px;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: red;
  margin-top: 50px;
`;


const ResultScreen: FC = () => {
  const { ExamDetails, examID } = useExam();

  const [result, setResult] = useState<Result[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const obtainedScore = result
  ? result.reduce((accumulator, currentValue) => accumulator + (currentValue.score || 0), 0)
  : 0;

  const maxScore = ExamDetails?.totalScore || 100; 
  const scorePercentage = (obtainedScore / maxScore) * 100;

  console.log("Obtained Score:", obtainedScore);
  console.log("Score Percentage:", scorePercentage);


  useEffect(() => {
    const fetchResult = async () => {

      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const requestUrl = `http://localhost:5000/student/results?examID=${examID}`;
        const response = await axios.get(requestUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Display the response", response.data)

        if (response.data && response.data.results) {
          console.log("Display the response data results", response.data.results)
          const simplifiedResults: Result[] = response.data.results.map((result: any) => ({
            examTitle: result?.examTitle,
            score: result?.totalScore,
            grade: result?.grade,
            courseTitle: result?.courseTitle,
            examDate: result?.examDate,
            credits: result?.credits,
            department: result?.department,
            level: result?.level,
            studentName: result?.studentName,
            type: result?.type || 'MCQs',
          }));
          console.log("Simplified", simplifiedResults)
          setResult(simplifiedResults);
        } else {
          throw new Error('No results found');
        }
      } catch (err) {
        setError((err as Error).message || 'Error fetching results');
      } finally {
        setLoading(false);
      }
    };

    if (examID) {
      fetchResult();
    }
  }, [examID]);

  return (
    <ResultScreenContainer>
      <LogoContainer>
        <AppLogo />
        <LogoText>EVERGREEN VALLEY UNIVERSITY</LogoText>
      </LogoContainer>
      <InnerContainer>
        {loading && <LoadingMessage>Loading results...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
  
        {result && result.length > 0 ? (
          result.map((res, index) => (
            <React.Fragment key={index}>
              {(() => {
                console.log(`Result ${index}: `, res);
                return null; 
              })()}
  
              <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
                <ProgressBarContainer style={{ marginBottom: '16px' }}>
                  <ProgressBar percentage={scorePercentage} />
                  <PercentageIndicator percentage={scorePercentage}>
                    {Math.round(scorePercentage)}%
                  </PercentageIndicator> 
                </ProgressBarContainer>
  
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div>
                      <p style={{ marginBottom: '8px', color: '#ccc' }}>{res?.examTitle}</p>
                      <h3 style={{ marginBottom: '8px' }}>{res?.courseTitle}</h3>
                    </div>
  
                    <div style={{ padding: '16px',  }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <img 
                          src={res?.studentImage || bukayo}  
                          alt="Student Passport"
                          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '16px' }}
                        />
                        <div>
                        <StudentName>{res?.studentName}</StudentName>
                        <p style={{ marginBottom: '8px' }}>{res?.department}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                          <div style={{borderRight: '2px solid #90EE90', paddingRight: '10px'}}>
                            <p style={{ marginBottom: '2px', fontSize: '20px' }}> {res?.credits}</p>
                            <p style={{ marginBottom: '2px', fontSize: '14px', color: '#ccc' }}> Credit</p>
                          </div>
                          <div style={{borderRight: '2px solid #90EE90', paddingRight: '10px', paddingLeft: '10px'}}>
                            <p style={{ marginBottom: '2px', fontSize: '20px' }}> {res?.score}</p>
                            <p style={{ marginBottom: '2px', fontSize: '14px', color: '#ccc' }}> Score</p>
                          </div>
                          <div style={{borderRight: '2px', paddingRight: '10px', paddingLeft: '10px'}}>
                            <p style={{ marginBottom: '2px', fontSize: '20px' }}> {res?.grade}</p>
                            <p style={{ marginBottom: '2px', fontSize: '14px', color: '#ccc' }}> Grade</p>
                          </div>
                        </div> 
                        </div>
                      </div>
                    <div style={{ display: 'flex', alignItems: 'center',}}>
                      <div style={{borderRight: '2px solid #90EE90', paddingRight: '10px', paddingLeft: '10px'}}>
                        <p style={{ marginBottom: '2px', fontSize: '20px' }}>{new Date(res?.examDate).toLocaleDateString()}</p>
                        <p style={{ marginBottom: '2px', fontSize: '14px', color: '#ccc' }}> Attempted on</p>
                        </div>
                      <div style={{borderRight: '2px', paddingRight: '10px', paddingLeft: '10px'}}>
                        <p style={{ marginBottom: '2px', fontSize: '20px' }}>{res?.level}</p>
                        <p style={{ marginBottom: '2px', fontSize: '14px', color: '#ccc' }}> Level</p>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div style={{ marginLeft: '0px' }}>
                    <img 
                      src={trophy} 
                      alt="Trophy" 
                      style={{ width: '500px', height: 'auto', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div>No results to display</div>
        )}
      </InnerContainer>
    </ResultScreenContainer>
  );  
};

export default ResultScreen;