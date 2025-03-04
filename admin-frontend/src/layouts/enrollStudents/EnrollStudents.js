import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { useMaterialUIController, setEnrollData } from 'context';
import axios from 'axios';

const EnrollStudents = () => {
  const [controller, dispatch] = useMaterialUIController();
  const { enrollData } = controller;

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnrollData(dispatch, {
      ...enrollData,
      [name]: value,
    });
  };

  const handleEnrollment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found. Please log in again.');
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/admin/enrollStudent`, enrollData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Student Registered:', response.data);

      console.log('Submitting Data:', enrollData);

      setEnrollData(dispatch, {
        studentID: 0,
        courseID: 0,
        examID: '',
      });
    } catch (error) {
      console.error('Error Enrolling student:', error.response?.data || error.message);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        py={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh" // Center vertically
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              {/* Form container */}
              <form onSubmit={handleEnrollment}>
                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Student ID"
                    name="studentID"
                    variant="outlined"
                    value={enrollData.studentID}
                    onChange={handleInputChange}
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

                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Course ID"
                    name="courseID"
                    variant="outlined"
                    value={enrollData.courseID}
                    onChange={handleInputChange}
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

                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Exam ID"
                    name="examID"
                    variant="outlined"
                    value={enrollData.examID}
                    onChange={handleInputChange}
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

                {/* Submit Button */}
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(to right, darkgreen, lightgreen)', // Gradient background
                    color: '#f0f0f0',
                    '&:hover': {
                      background: 'linear-gradient(to right, green, limegreen)', // Adjust gradient on hover
                    },
                  }}
                >
                  Enroll Student
                </Button>
              </form>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default EnrollStudents;
