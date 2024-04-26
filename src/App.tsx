import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";

export interface NicknameProps {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

export const Nickname = createContext<NicknameProps | null>(null);

function App() {
  const [nickname, setNickname] = useState(
    localStorage.getItem("nickname") || "",
  );

  useEffect(() => {
    localStorage.setItem("nickname", nickname);
  }, [nickname]);

  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <Nickname.Provider
          value={{ nickname: nickname, setNickname: setNickname }}
        >
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0">
              <NavBar />
            </header>
            <main className="grow flex">
              <Outlet />
            </main>
          </div>
          <footer className="bg-gray-100 flex justify-center items-center min-h-32 dark:bg-zinc-950">
            <p className="text-zinc-700 dark:text-zinc-400 font-bold">Copyright (C) Rdbo - 2024</p>
          </footer>
        </Nickname.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
