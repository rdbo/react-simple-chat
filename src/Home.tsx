import { useContext } from "react";
import { Nickname, NicknameProps } from "./App";
import Nick from "./Nick";
import Chat from "./Chat";

export default function Home() 
{
  const nicknameCtx = useContext(Nickname) as NicknameProps;

  return (
    nicknameCtx.nickname ? <Chat /> : <Nick />
  );
}
