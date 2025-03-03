import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
} from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const ViewResults = () => {
  const [studentID, setStudentID] = useState('');
  const [results, setResults] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mockResults = [
    { course: 'Mathematics', exam: 'Mid-Term', score: 85 },
    { course: 'Physics', exam: 'Final Exam', score: 90 },
  ];

  const handleViewResults = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    setResults(mockResults);

    setStudentID('');
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              {/* Form to input studentID */}
              <form onSubmit={handleViewResults}>
                <MDBox mb={3}>
                  <TextField
                    label="Student ID"
                    fullWidth
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
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
                <MDBox mb={3}>
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
                    View Results
                  </Button>
                </MDBox>
              </form>
            </MDBox>

            {/* Results Display */}
            {isSubmitted && (
              <MDBox mt={3}>
                <h3>Student Results:</h3>
                {results ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Course</TableCell>
                        <TableCell>Exam</TableCell>
                        <TableCell>Score</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.course}</TableCell>
                          <TableCell>{result.exam}</TableCell>
                          <TableCell>{result.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No results found for this student.</p>
                )}
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ViewResults;
