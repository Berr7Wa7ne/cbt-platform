import { useState } from 'react';

// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';

// Images
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure passwords match
    if (newPassword === confirmPassword) {
      // Logic for updating password
      alert('Password updated successfully!');
      // Reset form fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('New passwords do not match!');
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
          sx={{
            background: 'linear-gradient(to right, darkgreen, lightgreen)', // Gradient background
            color: '#f0f0f0',
            '&:hover': {
              background: 'linear-gradient(to right, green, limegreen)', // Adjust gradient on hover
            },
          }}
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Change Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Current Password"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'lightgreen',
                    },
                    '&:hover fieldset': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'darkgreen',
                    },
                  },
                  '& label.Mui-focused': {
                    color: 'darkgreen',
                  },
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="New Password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'lightgreen',
                    },
                    '&:hover fieldset': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'darkgreen',
                    },
                  },
                  '& label.Mui-focused': {
                    color: 'darkgreen',
                  },
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm New Password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'lightgreen',
                    },
                    '&:hover fieldset': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'darkgreen',
                    },
                  },
                  '& label.Mui-focused': {
                    color: 'darkgreen',
                  },
                }}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                sx={{
                  background: 'linear-gradient(to right, darkgreen, lightgreen)', // Gradient background
                  color: '#f0f0f0',
                  '&:hover': {
                    background: 'linear-gradient(to right, green, limegreen)', // Adjust gradient on hover
                  },
                }}
              >
                Update Password
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default ChangePassword;
