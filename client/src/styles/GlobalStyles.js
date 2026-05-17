import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
  text: '#1a1a1a',
  primary: '#2563eb', // Blue đậm hơn cho accessibility
  secondary: '#4b5563',
  background: 'rgba(255, 255, 255, 0.7)',
  card: 'rgba(255, 255, 255, 0.6)',
  border: 'rgba(0, 0, 0, 0.1)',
  glass: 'blur(10px)'
};

export const darkTheme = {
  body: 'linear-gradient(135deg, #0f172a 0%, #1e1e2f 100%)',
  text: '#f8fafc',
  primary: '#3b82f6', // Xanh sáng dễ nhìn trên nền tối
  secondary: '#94a3b8',
  background: 'rgba(15, 23, 42, 0.6)',
  card: 'rgba(30, 41, 59, 0.6)',
  border: 'rgba(255, 255, 255, 0.1)',
  glass: 'blur(10px)'
};

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => theme.body};
    background-attachment: fixed;
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: background 0.4s ease, color 0.4s ease;
    line-height: 1.7;
    min-height: 100vh;
  }

  a, button {
    outline: none;
  }
  
  /* Hỗ trợ tiếp cận (Accessibility) khi dùng phím tab */
  a:focus-visible, button:focus-visible {
    outline: 3px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
    border-radius: 4px;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: opacity 0.2s ease-in-out;
  }

  a:hover {
    opacity: 0.8;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-bottom: 1rem;
  }
`;
