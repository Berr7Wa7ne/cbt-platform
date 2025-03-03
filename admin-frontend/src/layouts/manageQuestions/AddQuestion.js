import React from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import MDBox from 'components/MDBox';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { useMaterialUIController, setQuestionData } from 'context';
import axios from 'axios';

function AddQuestion() {
  const [controller, dispatch] = useMaterialUIController();
  const { questionData } = controller;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  console.log('questionData:', questionData);
  const options = Array.isArray(questionData.options) ? questionData.options : [];
  options.map((option, index) => <div key={index}>{option}</div>);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'options') {
      setQuestionData(dispatch, {
        ...questionData,
        [name]: value.split(',').map((option) => option.trim()),
      });
    } else {
      setQuestionData(dispatch, {
        ...questionData,
        [name]: value,
      });
    }
  };

  const handleOptionChange = (optionIndex, event) => {
    const updatedOptions = questionData.options.map((option, idx) => {
      if (idx === optionIndex) {
        console.log('questionData.options:', questionData.options);
        return event.target.value;
      }
      return option;
    });
    setQuestionData(dispatch, { ...questionData, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found. Please log in again.');
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/admin/add-question`, questionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Student Registered:', response.data);

      console.log('Submitting Data:', questionData);

      setQuestionData(dispatch, {
        questionID: '',
        questionText: '',
        courseCode: '',
        examID: '',
        questionType: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      });
    } catch (error) {
      console.error('Error adding student:', error.response?.data || error.message);
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
                {/* <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Question ID"
                    name="questionID"
                    variant="outlined"
                    value={questionData.questionID}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: true }}
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
                </MDBox> */}
                <MDBox mb={3}>
                  <TextField
                    fullWidth
                    label="Question Text"
                    name="questionText"
                    variant="outlined"
                    value={questionData.questionText}
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
                    value={questionData.courseCode}
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
                    value={questionData.examID}
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
                    label="Question Type"
                    name="questionType"
                    variant="outlined"
                    value={questionData.questionType}
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
                        '&.Mui-disabled fieldset': {
                          borderColor: 'lightgreen',
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
                    label="Correct Answer"
                    name="correctAnswer"
                    variant="outlined"
                    value={questionData.correctAnswer}
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
                  <Grid container spacing={2}>
                    {questionData.options.map((option, optionIndex) => (
                      <Grid item xs={12} sm={6} key={optionIndex}>
                        <TextField
                          fullWidth
                          label={`Option ${optionIndex + 1}`}
                          name={`option${optionIndex}`}
                          value={option}
                          onChange={(e) => handleOptionChange(optionIndex, e)}
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
                      </Grid>
                    ))}
                  </Grid>
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
                    Add Question
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

export default AddQuestion;
