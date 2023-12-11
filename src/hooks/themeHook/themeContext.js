import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

const DARK_LOCAL_STORAGE_KEY = 'light'; //change while setting default

export const ThemeContext = createContext({
  dark: false,
  toggle: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false); // dark by default if true

  const toggleTheme = useCallback(() => {
    setDark((prevDark) => {
      localStorage.setItem(
        DARK_LOCAL_STORAGE_KEY,
        JSON.stringify(!prevDark),
      );

      document.body.classList.toggle('dark', !prevDark);
      document.body.classList.toggle('light', prevDark);

      return !prevDark;
    });
  }, []);

  useEffect(() => {
    const localValue = JSON.parse(
      localStorage.getItem(DARK_LOCAL_STORAGE_KEY),
    );

    if (localValue === null) {
      document.body.classList.add('light'); //change while setting default
      setDark(localValue);
      document.body.classList.add(localValue ? 'dark' : 'light');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
