// ThemeHandler.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ThemeHandler = () => {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return null;
};

export default ThemeHandler;
