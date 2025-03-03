import { Theme } from './styled'

export const themes: Record<string, Theme> = {
  light: {
    colors: {
      primaryText: '#11052C', // question text color
      secondaryText: '#2D264B', // answer text color
      themeText: '#000000',
      themeColor: 'darkgreen', // Changed to dark green for Evergreen Valley University theme
      themeGradient: 'linear-gradient(to right, darkgreen, lightgreen)', // Green gradient
      background: '#E5E5E5',
      cardBackground: '#FFFFFF',
      selectTopicBg: '#FFFFFF',
      appLogo: 'green', // Green color for the logo
      buttonText: '#FFFFFF',
      outlineButtonText: 'darkgreen', // Outline buttons will match the theme color
      buttonBackground: 'linear-gradient(90.04deg, darkgreen 0.03%, lightgreen 99.96%)', // Gradient matching the button style
      selectedAnswer: '#DFFFD6', // Light green for selected answers
      correctAnswer: '#DFFFD6',
      infoText: '#FF783F', // skip tag text
      infoBackground: '#ffb23f26', // skip tag background
      border: 'lightgreen', // Light green border for fields
      answerBg: '#ffffff',
      disabledCard: '#fbf4ecbc',
      disabledButton: '#e7e8e9',
      success: '#12B40E', // Keep this green for success messages
      successLight: '#DDFFDC',
      danger: '#FF143E',
      dangerLight: '#FFD7DE',
      white: '#FFFFFF',
      black: '#000000',
      dark: '#282526',
      darkGray: '#9fa3a9',
      darkerGray: '#817a8e',
    },
    fonts: {
      anekMalayalam: 'Anek Malayalam',
    },
    shadows: {
      activeButton: '3px 2px 22px 1px rgba(0, 128, 0, 0.24)', // Soft green shadow for buttons
    },
    paddings: {
      container: '15px',
      pageTop: '30px',
    },
    margins: {
      pageTop: '30px',
    },
  },
  dark: {
    colors: {
      primaryText: '#FFFFFF', // question text color
      secondaryText: '#FFFFFF', // answer text color
      themeText: '#FFFFFF',
      themeColor: 'darkgreen', // Match dark theme with Evergreen green
      themeGradient: 'linear-gradient(90deg, #003300 0%, #006600 100%)', // Dark green gradient for dark theme
      background: 'linear-gradient(90deg, #0e050e 0%, #006600 100%)', // Green tone background for dark mode
      cardBackground: '#1a291a', // Dark greenish background for cards
      selectTopicBg: '#1c3a1c', // Green-toned dark background
      appLogo: 'lightgreen', // Light green for the logo in dark mode
      buttonText: '#FFFFFF',
      outlineButtonText: '#00FF00', // Lighter green for outline buttons in dark mode
      buttonBackground: 'linear-gradient(90.04deg, darkgreen 0.03%, lightgreen 99.96%)', // Same gradient for dark theme buttons
      selectedAnswer: '#003300', // Dark green for selected answers
      correctAnswer: '#28a745',
      infoText: '#FF783F', // skip tag text
      infoBackground: '#ffb23f26', // skip tag background
      border: 'transparent', // No borders in dark mode
      answerBg: '#003300', // Dark green for answers background
      disabledCard: '#00000080',
      disabledButton: '#181214',
      success: '#12B40E', // Bright green for success messages
      successLight: '#151113',
      danger: '#FF143E',
      dangerLight: '#151113',
      white: '#FFFFFF',
      black: '#000000',
      dark: '#282526',
      darkGray: '#9fa3a9',
      darkerGray: '#817a8e',
    },
    fonts: {
      anekMalayalam: 'Anek Malayalam',
    },
    shadows: {
      activeButton: '3px 2px 22px 1px rgba(0, 128, 0, 0.24)', // Green button shadow for dark mode
    },
    paddings: {
      container: '15px',
      pageTop: '30px',
    },
    margins: {
      pageTop: '30px',
    },
  },
}
