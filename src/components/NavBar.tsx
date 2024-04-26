import { Nickname, NicknameData } from "@/App";
import { useContext } from "react";

export default function NavBar() {
  const { nickname, setNickname } = useContext(Nickname) as NicknameData;

  const clearNickname = () => setNickname("");

  return (
    <div className="px-4 py-2 border flex justify-between items-center bg-white">
      <h1 className="font-bold text-2xl">react-simple-chat</h1>
      <div>
        {nickname ? (
          <button onClick={clearNickname} className="flex items-center font-bold">
            <img src="/assets/images/user.png" className="h-8 mr-1" />
            <p>{nickname}</p>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
