import React from "react";

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  React.useEffect(() => {
    const themeValue = isDarkTheme ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", themeValue);
    localStorage.setItem("theme", themeValue);
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => React.useContext(ThemeContext);

export default useTheme;