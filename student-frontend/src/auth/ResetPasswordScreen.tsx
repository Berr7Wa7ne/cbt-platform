import { FC, useState } from 'react';
import styled from 'styled-components';
import { AppLogo } from '../config/icons';
import { device } from '../styles/BreakPoints';
import { PageCenter } from '../styles/Global';
import Button from '../components/ui/Button'; // Assuming you already have a Button component

const ResetPasswordContainer = styled.div`
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

const ResetPasswordScreen: FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleResetPasswordClick = () => {
    if (!newPassword || !confirmPassword) {
      setError('Both fields are required');
    } else if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError(null);
      alert(`Password successfully reset`);
      // Add further actions here, like making an API call to reset the password
    }
  };

  return (
    <PageCenter>
      <LogoContainer>
        <AppLogo />
      </LogoContainer>
      <ResetPasswordContainer>
        <Title>Reset Password</Title> {/* Title for Reset Password */}
        {error && <ErrorText>{error}</ErrorText>}
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <StyledButton text="Reset Password" onClick={handleResetPasswordClick} />
        <BackToLoginLink href="/login">Back to Login</BackToLoginLink> {/* Back to login link */}
      </ResetPasswordContainer>
    </PageCenter>
  );
};

export default ResetPasswordScreen;
