import { createContext, useState } from "react";

const ThemeContext = createContext();
export { ThemeContext };

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  return (
    <ThemeContext.Provider value={[isDark, setIsDark]}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
