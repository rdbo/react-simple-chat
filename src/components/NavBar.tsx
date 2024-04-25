import { Nickname, NicknameData } from "@/App";
import { useContext } from "react";

export default function NavBar() {
  const { nickname, setNickname } = useContext(Nickname) as NicknameData;

  return (
    <div className="px-4 py-2 border flex justify-between items-center bg-white">
      <h1 className="font-bold text-2xl">react-simple-chat</h1>
      <div>
        <p>{ nickname && nickname || "Join" }</p>
      </div>
    </div>
  );
}
