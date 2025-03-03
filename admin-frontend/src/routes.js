// Material Dashboard 2 React layouts
import Dashboard from 'layouts/dashboard';
import RegisterStudent from 'layouts/manageStudents/RegisterStudent';
import AddCourse from 'layouts/manageCourses/AddCourse';
import CreateExam from 'layouts/manageExams/CreateExam';
import AddQuestion from 'layouts/manageQuestions/AddQuestion';
import EnrollStudents from 'layouts/enrollStudents/EnrollStudents';
import ViewResults from 'layouts/viewResults/ViewResults';
import ChangePassword from 'layouts/settings/ChangePassword';
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';

// @mui icons
import Icon from '@mui/material/Icon';

const routes = [
  // Dashboard
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/dashboard',
    component: <Dashboard />,
  },

  // Manage Students
  {
    type: 'collapse',
    name: 'Register Student',
    key: 'register-student',
    icon: <Icon fontSize="small">group_add</Icon>,
    route: '/students/register',
    component: <RegisterStudent />,
  },

  // Manage Courses
  {
    type: 'collapse',
    name: 'Add Course',
    key: 'add-course',
    icon: <Icon fontSize="small">library_books</Icon>,
    route: '/courses/add',
    component: <AddCourse />,
  },

  // Manage Exams
  {
    type: 'collapse',
    name: 'Create Exam',
    key: 'create-exam',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/exams/create',
    component: <CreateExam />,
  },

  // Manage Questions
  {
    type: 'collapse',
    name: 'Add Question',
    key: 'add-question',
    icon: <Icon fontSize="small">quiz</Icon>,
    route: '/question/add',
    component: <AddQuestion />,
  },

  // Enrollment
  {
    type: 'collapse',
    name: 'Enroll Students',
    key: 'enroll-students',
    icon: <Icon fontSize="small">how_to_reg</Icon>,
    route: '/enrollment/enroll',
    component: <EnrollStudents />,
  },

  // Results
  {
    type: 'collapse',
    name: 'View Results',
    key: 'view-results',
    icon: <Icon fontSize="small">assessment</Icon>,
    route: '/results/view',
    component: <ViewResults />,
  },

  // Settings
  {
    type: 'collapse',
    name: 'Change Password',
    key: 'change-password',
    icon: <Icon fontSize="small">lock</Icon>,
    route: '/settings/change-password',
    component: <ChangePassword />,
  },

  // Authentication
  {
    type: 'collapse',
    name: 'Sign In',
    key: 'sign-in',
    icon: <Icon fontSize="small">login</Icon>,
    route: '/authentication/sign-in',
    component: <SignIn />,
  },
  {
    type: 'collapse',
    name: 'Sign Up',
    key: 'sign-up',
    icon: <Icon fontSize="small">person_add</Icon>,
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
];

export default routes;
