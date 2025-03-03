import { FC, useState } from 'react';
import styled from 'styled-components';
import { AppLogo } from '../config/icons';
import { device } from '../styles/BreakPoints';
import { PageCenter } from '../styles/Global';
import Button from '../components/ui/Button'; // Assuming you already have a Button component

const ForgotPasswordContainer = styled.div`
  display: flex;              /* Add Flexbox layout */
  flex-direction: column;     /* Arrange children vertically */
  align-items: center;        /* Center children horizontally */
  width: 400px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 30px;
  margin-bottom: 70px;

  @media ${device.md} {
    width: 100%;
    padding: 15px;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 50px;

  @media ${device.md} {
    margin-bottom: 20px;

    svg {
      width: 185px;
      height: 80px;
    }
  }
`;

const Title = styled.h2`
  margin-bottom: 30px; /* Add space below the title */
  text-align: center;  /* Center the title text */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorText = styled.p`
  color: red;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;   /* Add space above the button */
  width: 100%;
  max-width: 200px;   /* Button width control */
`;

const BackToLoginLink = styled.a`
  display: block;
  text-align: center;  /* Center the link text */
  margin-top: 20px;    /* Space above the link */
  color: ${({ theme }) => theme.colors.secondaryText};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline; /* Underline on hover */
  }
`;

const ForgotPasswordScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleRequestResetClick = () => {
    if (!email) {
      setError('Email is required');
    } else {
      setError(null);
      alert(`Reset link sent to: ${email}`);
      // Add further actions here, like making an API call to send the reset link
    }
  };

  return (
    <PageCenter>
      <LogoContainer>
        <AppLogo />
      </LogoContainer>
      <ForgotPasswordContainer>
        <Title>Forgot Password</Title> {/* Updated title */}
        {error && <ErrorText>{error}</ErrorText>}
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledButton text="Send Reset Link" onClick={handleRequestResetClick} />
        <BackToLoginLink href="/login">Back to Login</BackToLoginLink> {/* Back to login link */}
      </ForgotPasswordContainer>
    </PageCenter>
  );
};

export default ForgotPasswordScreen;
