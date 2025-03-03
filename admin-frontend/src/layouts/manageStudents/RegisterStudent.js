import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { useMaterialUIController, setStudentData } from 'context';
import axios from 'axios';

function RegisterStudent() {
  const [controller, dispatch] = useMaterialUIController();
  const { studentData } = controller;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...studentData,
      [name]: name === 'studentID' ? parseInt(value, 10) || 0 : value,
    };
    console.log('Updated Data:', updatedData);
    setStudentData(dispatch, updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found. Please log in again.');
        return;
      }

      const response = await axios.post('http://localhost:5000/admin/add-student', studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Student Registered:', response.data);

      console.log('Submitting Data:', studentData);

      setStudentData(dispatch, {
        studentID: '',
        name: '',
        email: '',
        department: '',
        level: '',
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
                    label="Registration Number"
                    type="text"
                    name="studentID"
                    variant="outlined"
                    value={studentData.studentID}
                    onChange={handleInputChange}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'lightgreen' },
                        '&:hover fieldset': { borderColor: 'green' },
                        '&.Mui-focused fieldset': { borderColor: 'darkgreen' },
                      },
                      '& label.Mui-focused': { color: 'darkgreen' },
                    }}
                  />
                </MDBox>

                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Student Name"
                    name="name"
                    variant="outlined"
                    value={studentData.name}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'lightgreen' },
                        '&:hover fieldset': { borderColor: 'green' },
                        '&.Mui-focused fieldset': { borderColor: 'darkgreen' },
                      },
                      '& label.Mui-focused': { color: 'darkgreen' },
                    }}
                  />
                </MDBox>

                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    variant="outlined"
                    value={studentData.email}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'lightgreen' },
                        '&:hover fieldset': { borderColor: 'green' },
                        '&.Mui-focused fieldset': { borderColor: 'darkgreen' },
                      },
                      '& label.Mui-focused': { color: 'darkgreen' },
                    }}
                  />
                </MDBox>

                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    variant="outlined"
                    value={studentData.department}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'lightgreen' },
                        '&:hover fieldset': { borderColor: 'green' },
                        '&.Mui-focused fieldset': { borderColor: 'darkgreen' },
                      },
                      '& label.Mui-focused': { color: 'darkgreen' },
                    }}
                  />
                </MDBox>

                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Level"
                    name="level"
                    variant="outlined"
                    value={studentData.level}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'lightgreen' },
                        '&:hover fieldset': { borderColor: 'green' },
                        '&.Mui-focused fieldset': { borderColor: 'darkgreen' },
                      },
                      '& label.Mui-focused': { color: 'darkgreen' },
                    }}
                  />
                </MDBox>

                <MDBox mb={3}>
                  <MDButton
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
                    Register Student
                  </MDButton>
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

export default RegisterStudent;
