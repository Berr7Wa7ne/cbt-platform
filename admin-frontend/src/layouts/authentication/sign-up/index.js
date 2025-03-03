import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

import CoverLayout from 'layouts/authentication/components/CoverLayout';

import bgImage from 'assets/images/bg-sign-up-cover.jpeg';
import axios from 'axios';

function Cover() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
        role,
      });

      console.log('Registration successful:', response.data);

      navigate('/authentication/sign-in');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
          sx={{
            background: 'linear-gradient(to right, darkgreen, lightgreen)',
            color: '#f0f0f0',
            '&:hover': {
              background: 'linear-gradient(to right, green, limegreen)',
            },
          }}
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                label="Password"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                type="text"
                readOnly={false}
                label="Role"
                variant="standard"
                fullWidth
                value={role}
                onChange={(e) => {
                  console.log('Role input:', e.target.value);
                  setRole(e.target.value);
                }}
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
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                sx={{
                  color: 'darkgreen',
                  '&:hover': {
                    color: 'green',
                  },
                }}
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSignUp}
                sx={{
                  background: 'linear-gradient(to right, darkgreen, lightgreen)',
                  color: '#f0f0f0',
                  '&:hover': {
                    background: 'linear-gradient(to right, green, limegreen)',
                  },
                }}
              >
                sign up
              </MDButton>
              {error && (
                <MDBox mt={2}>
                  <MDTypography variant="caption" color="error">
                    {error}
                  </MDTypography>
                </MDBox>
              )}
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  fontWeight="medium"
                  sx={{
                    color: 'darkgreen',
                    '&:hover': {
                      color: 'green',
                    },
                  }}
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
