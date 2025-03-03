import { FC, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { AppLogo } from '../config/icons';
import { device } from '../styles/BreakPoints';
import { PageCenter } from '../styles/Global';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';


const LoginContainer = styled.div`
  width: 400px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 30px;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.md} {
    width: 100%;
    padding: 15px;
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
  color: white;
  font-size: 50px;
  font-family: 'sans-serif';
  text-align: center;
  margin-top: 10px; /* Space between logo and text */
`;

const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s, color 0.3s;

  &:focus {
    border-color: darkgreen;
    color: darkgreen;
    outline: none;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  max-width: 200px;
`;

const ForgotPasswordLink = styled.a`
  margin-bottom: 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

interface ErrorResponse {
  error: string;
}

const LoginScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLoginClick = async (e: React.MouseEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }
  
    setError(null);
  
    try {
      const response = await axios.post('http://localhost:5000/student/auth/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        alert('Login successful!');
  
        const { token } = response.data;
  
        localStorage.setItem('token', token);

        navigate('/available-exams');
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      setError(error.response?.data?.error || 'Login failed');
    }
  };
  
  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/forgot-password'); 
  };

  return (
    <PageCenter>
      <LogoContainer>
        <AppLogo />
        <LogoText>EVERGREEN VALLEY UNIVERSITY</LogoText>
      </LogoContainer>
      <LoginContainer>
        <Title>Student Login</Title>
        {error && <ErrorText>{error}</ErrorText>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ForgotPasswordLink href="#" onClick={handleForgotPasswordClick}>
          Forgot Password?
        </ForgotPasswordLink>
        <StyledButton text="Login" onClick={handleLoginClick} />
      </LoginContainer>
    </PageCenter>
  );
};

export default LoginScreen;
