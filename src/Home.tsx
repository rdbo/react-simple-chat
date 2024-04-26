import { useContext } from "react";
import { Nickname, NicknameData } from "./App";
import Nick from "./Nick";
import Chat from "./Chat";

export default function Home() 
{
  const { nickname, setNickname } = useContext(Nickname) as NicknameData;

  return (
    nickname ? <Chat /> : <Nick />
  );
}
