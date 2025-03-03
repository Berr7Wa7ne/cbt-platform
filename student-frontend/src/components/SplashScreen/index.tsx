import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AppLogo } from '../../config/icons';
import { PageCenter } from '../../styles/Global';

interface LogoAnimationProps {
  logoSize: string;
}


const LogoText = styled.h2`
  color: white;
  font-size: 50px;
  font-family: 'sans-serif';
  text-align: center;
  margin-top: 10px; /* Space between logo and text */
`;

const LogoAnimation = styled.div<LogoAnimationProps>`
  svg {
    width: ${({ logoSize }) => logoSize};
    transition: width 1s;
  }
`;

const SplashScreen = () => {
  const [logoSize, setLogoSize] = useState('80px');
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setLogoSize('240px');
      } else {
        setLogoSize('350px');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      navigate('/login'); 
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <PageCenter justifyCenter>
      <LogoAnimation logoSize={logoSize}>
        <AppLogo />
        <LogoText>EVERGREEN VALLEY UNIVERSITY</LogoText>
      </LogoAnimation>
    </PageCenter>
  );
};

export default SplashScreen;
