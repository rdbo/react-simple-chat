import { useContext } from "react";
import { Nickname, NicknameData } from "./App";
import Nick from "./Nick";

export default function Home() 
{
  const { nickname, setNickname } = useContext(Nickname) as NicknameData;

  return (
    nickname ? <p>goof</p> : <Nick />
  );
}
