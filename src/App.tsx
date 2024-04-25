import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { createContext, useState } from "react";

export interface NicknameData {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
};

export const Nickname = createContext<NicknameData | null>(null);

function App() {
  const [nickname, setNickname] = useState("");

  return (
    <>
      <Nickname.Provider
        value={{ nickname: nickname, setNickname: setNickname }}
      >
        <header className="sticky top-0">
          <NavBar />
        </header>
        <main>
          <Outlet />
        </main>
      </Nickname.Provider>
    </>
  );
}

export default App;
