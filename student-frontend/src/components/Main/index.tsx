import { useEffect } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';

import QuestionScreen from '../QuestionScreen';
import ExamDetailsScreen from '../ExamDetailsScreen';
import AvailableExamsScreen from '../AvailableExamsScreen';
import ResultScreen from '../ResultScreen';
import SplashScreen from '../SplashScreen';


import LoginScreen from '../../auth/LoginScreen';
import ForgotPasswordScreen from '../../auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../../auth/ResetPasswordScreen';


function Main() {
  const location = useLocation(); 


  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route path="/available-exams" element={<AvailableExamsScreen />} />
      <Route path="/exam-details" element={<ExamDetailsScreen />} />
      <Route path="/question" element={<QuestionScreen />} />
      <Route path="/results" element={<ResultScreen />} />
      
    </Routes>
  );
}



export default Main;
