import { createContext, useContext, useReducer, useMemo } from 'react';

import PropTypes from 'prop-types';

const MaterialUI = createContext();

MaterialUI.displayName = 'MaterialUIContext';

function reducer(state, action) {
  switch (action.type) {
    case 'MINI_SIDENAV': {
      return { ...state, miniSidenav: action.value };
    }
    case 'TRANSPARENT_SIDENAV': {
      return { ...state, transparentSidenav: action.value };
    }
    case 'WHITE_SIDENAV': {
      return { ...state, whiteSidenav: action.value };
    }
    case 'SIDENAV_COLOR': {
      return { ...state, sidenavColor: action.value };
    }
    case 'TRANSPARENT_NAVBAR': {
      return { ...state, transparentNavbar: action.value };
    }
    case 'FIXED_NAVBAR': {
      return { ...state, fixedNavbar: action.value };
    }
    case 'OPEN_CONFIGURATOR': {
      return { ...state, openConfigurator: action.value };
    }
    case 'DIRECTION': {
      return { ...state, direction: action.value };
    }
    case 'LAYOUT': {
      return { ...state, layout: action.value };
    }
    case 'DARKMODE': {
      return { ...state, darkMode: action.value };
    }
    case 'SET_STUDENT_DATA': {
      return { ...state, studentData: action.value };
    }
    case 'SET_COURSE_DATA': {
      return { ...state, courseData: action.value };
    }
    case 'SET_EXAM_DATA': {
      return { ...state, examData: action.value };
    }
    case 'SET_QUESTION_DATA': {
      return { ...state, questionData: action.value };
    }
    case 'SET_ENROLL_DATA': {
      return { ...state, enrollData: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: 'info',
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: 'ltr',
    layout: 'dashboard',
    darkMode: false,
    studentData: { studentID: 0, name: '', email: '', department: '', level: '' },
    courseData: {
      courseCode: '',
      courseTitle: '',
      courseDescription: '',
      department: '',
      level: 0,
      credits: 0,
    },
    examData: {
      examID: '',
      examTitle: '',
      courseCode: '',
      examDate: '',
      examTime: '',
      duration: 0,
    },
    questionData: {
      questionID: '',
      questionText: '',
      courseCode: '',
      examID: '',
      questionType: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    },
    enrollData: {
      studentID: 0,
      courseID: 0,
      examID: '',
    },
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      'useMaterialUIController should be used inside the MaterialUIControllerProvider.',
    );
  }

  return context;
}

MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setMiniSidenav = (dispatch, value) => dispatch({ type: 'MINI_SIDENAV', value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: 'TRANSPARENT_SIDENAV', value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: 'WHITE_SIDENAV', value });
const setSidenavColor = (dispatch, value) => dispatch({ type: 'SIDENAV_COLOR', value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: 'TRANSPARENT_NAVBAR', value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: 'FIXED_NAVBAR', value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: 'OPEN_CONFIGURATOR', value });
const setDirection = (dispatch, value) => dispatch({ type: 'DIRECTION', value });
const setLayout = (dispatch, value) => dispatch({ type: 'LAYOUT', value });
const setDarkMode = (dispatch, value) => dispatch({ type: 'DARKMODE', value });
const setStudentData = (dispatch, value) => dispatch({ type: 'SET_STUDENT_DATA', value });
const setCourseData = (dispatch, value) => dispatch({ type: 'SET_COURSE_DATA', value });
const setExamData = (dispatch, value) => dispatch({ type: 'SET_EXAM_DATA', value });
const setQuestionData = (dispatch, value) => dispatch({ type: 'SET_QUESTION_DATA', value });
const setEnrollData = (dispatch, value) => dispatch({ type: 'SET_ENROLL_DATA', value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
  setStudentData,
  setCourseData,
  setExamData,
  setQuestionData,
  setEnrollData,
};
