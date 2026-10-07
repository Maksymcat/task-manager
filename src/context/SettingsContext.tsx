
import {
  createContext,
  useContext,
  useState,
   useEffect,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

type SettingsContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const SettingsContext =
  createContext<SettingsContextType | null>(null);

  type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({
  children,
}: SettingsProviderProps) {

  const [theme, setTheme] =
    useState<Theme>(() => {
     const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

    return "dark";
    });

    useEffect(() => {
     
  document.documentElement.dataset.theme = theme;

  localStorage.setItem("theme", theme)
}, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );

}
export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}
