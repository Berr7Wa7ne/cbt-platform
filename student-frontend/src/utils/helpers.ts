import {jwtDecode} from 'jwt-decode';

export interface DecodedToken {
  id: number; 
  examID: number; 
}

export const getDecodedToken = (): DecodedToken | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    return decodedToken;
  } catch (err) {
    console.error('Failed to decode token:', err);
    return null;
  }
};

export const getStudentIDFromToken = (): number | null => {
  const decodedToken = getDecodedToken();
  return decodedToken?.id || null;
};

export const getExamIDFromToken = (): number | null => {
  const decodedToken = getDecodedToken();
  console.log('This is my decode token',decodedToken?.examID)
  return decodedToken?.examID || null;
};


export const addLeadingZero = (number: number) => {
  if (number > 9) {
    return number
  } else {
    return '0' + number
  }
}

// utility function to format the remaining time as minutes:seconds
export function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const convertSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const hourString = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''
  const minuteString = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''
  const secondString =
    remainingSeconds > 0
      ? `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`
      : ''

  if (hours > 0) {
    return `${hourString} : ${minuteString || '0 minute'} ${
      secondString && `: ${secondString}`
    }`
  } else if (!hours && minutes > 0) {
    return `${minuteString} ${secondString && `: ${secondString}`}`
  }

  return secondString
}

export const refreshPage = (): void => {
  window.location.reload()
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    // Swap elements using array destructuring
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}
