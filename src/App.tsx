import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { createContext, useEffect, useState } from "react";

export interface NicknameData {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
};

export const Nickname = createContext<NicknameData | null>(null);

function App() {
  const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");

  useEffect(() => {
    localStorage.setItem("nickname", nickname);
  }, [nickname])

  return (
    <>
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
        <footer className="bg-gray-100 flex justify-center items-center min-h-32">
          <p className="text-gray-700 font-bold">Copyright (C) Rdbo - 2024</p>
        </footer>
      </Nickname.Provider>
    </>
  );
}

export default App;
