import React from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import MDBox from 'components/MDBox';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { useMaterialUIController, setExamData } from 'context';
import axios from 'axios';

function CreateExam() {
  const [controller, dispatch] = useMaterialUIController();
  const { examData } = controller;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedExamData = {
      ...examData,
      [name]: name === 'duration' ? parseInt(value, 10) || 0 : value,
    };

    setExamData(dispatch, updatedExamData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found. Please log in again.');
        return;
      }

      const response = await axios.post('http://localhost:5000/admin/add-exam', examData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Student Registered:', response.data);

      console.log('Submitting Data:', examData);

      setExamData(dispatch, {
        examID: '',
        examTitle: '',
        courseCode: '',
        examDate: '',
        examTime: '',
        duration: 0,
      });
    } catch (error) {
      console.error('Error registering student:', error.response?.data || error.message);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <MDBox mb={3}>
              <form onSubmit={handleSubmit}>
                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Exam ID"
                    name="examID"
                    variant="outlined"
                    value={examData.examID}
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
                    label="Exam Title"
                    name="examTitle"
                    variant="outlined"
                    value={examData.examTitle}
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
                    label="Course Code"
                    name="courseCode"
                    variant="outlined"
                    value={examData.courseCode}
                    onChange={handleInputChange}
                  />
                </MDBox>
                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    name="examDate"
                    type="date"
                    variant="outlined"
                    value={examData.examDate}
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
                    label="Exam Time"
                    name="examTime"
                    variant="outlined"
                    value={examData.examTime}
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
                    label="Duration"
                    name="duration"
                    type="text"
                    variant="outlined"
                    value={examData.duration}
                    onChange={handleInputChange}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(to right, darkgreen, lightgreen)', // Gradient background
                      color: '#f0f0f0',
                      '&:hover': {
                        background: 'linear-gradient(to right, green, limegreen)', // Adjust gradient on hover
                      },
                    }}
                  >
                    Create Exam
                  </Button>
                </MDBox>
              </form>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateExam;
