import { ReactNode, useMemo, useState } from "react";
import { Theme, ThemeContext } from "./themeContext";

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(Theme.light);
  const themeContextValue = useMemo(() => {
    return { theme, setTheme };
  }, [theme]);

  return <ThemeContext value={themeContextValue}>{children}</ThemeContext>;
};

export default ThemeProvider;
