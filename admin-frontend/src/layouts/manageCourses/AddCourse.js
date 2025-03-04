import React from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import MDBox from 'components/MDBox';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { useMaterialUIController, setCourseData } from 'context';
import axios from 'axios';

function AddCourse() {
  const [controller, dispatch] = useMaterialUIController();
  const { courseData } = controller;
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedCourseData = {
      ...courseData,
      [name]: name === 'level' || name === 'credits' ? parseInt(value, 10) || 0 : value, // Parse level and credits as integers
    };

    setCourseData(dispatch, updatedCourseData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found. Please log in again.');
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/admin/add-course`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Student Registered:', response.data);

      console.log('Submitting Data:', courseData);

      setCourseData(dispatch, {
        courseCode: '',
        courseTitle: '',
        courseDescription: '',
        department: '',
        level: 0,
        credits: 0,
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
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <form onSubmit={handleSubmit}>
                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Course Code"
                    name="courseCode"
                    variant="outlined"
                    value={courseData.courseCode}
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
                    label="Course Title"
                    name="courseTitle"
                    variant="outlined"
                    value={courseData.courseTitle}
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
                    label="Course Description"
                    name="courseDescription"
                    variant="outlined"
                    value={courseData.Coursedescription}
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
                    label="Department"
                    name="department"
                    variant="outlined"
                    value={courseData.department}
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
                    label="Level"
                    type="text"
                    name="level"
                    variant="outlined"
                    value={courseData.level}
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
                  <TextField
                    fullWidth
                    label="Credits"
                    name="credits"
                    type="text"
                    variant="outlined"
                    value={courseData.credits}
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
                      background: 'linear-gradient(to right, darkgreen, lightgreen)',
                      color: '#f0f0f0',
                      '&:hover': {
                        background: 'linear-gradient(to right, green, limegreen)',
                      },
                    }}
                  >
                    Add Course
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

export default AddCourse;
