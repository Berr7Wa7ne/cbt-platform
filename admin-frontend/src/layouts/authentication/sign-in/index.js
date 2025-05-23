import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';

import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import axios from 'axios';

import BasicLayout from 'layouts/authentication/components/BasicLayout';

import bgImage from 'assets/images/bg-sign-in-basic.jpeg';

function Basic() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Load backend URL from .env
  console.log("API BASE URL:", process.env.REACT_APP_API_BASE_URL);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (rememberMe) {
        localStorage.setItem('authToken', response.data.token);
      } else {
        sessionStorage.setItem('authToken', response.data.token);
      }

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
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
          p={2}
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
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
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
                fullWidth
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
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch
                checked={rememberMe}
                onChange={handleSetRememberMe}
                sx={{ color: 'lightgreen' }}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="lightgreen"
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                fullWidth
                onClick={handleLogin}
                sx={{
                  background: 'linear-gradient(to right, darkgreen, lightgreen)',
                  color: '#f0f0f0',
                  '&:hover': {
                    background: 'linear-gradient(to right, green, limegreen)',
                  },
                }}
              >
                sign in
              </MDButton>
            </MDBox>
            {error && (
              <MDBox mt={2}>
                <MDTypography variant="caption" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            )}
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  fontWeight="medium"
                  sx={{
                    color: 'darkgreen',
                    '&:hover': {
                      color: 'green',
                    },
                  }}
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
