import { Nickname, NicknameProps } from "@/App";
import { useContext } from "react";
import { useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function NavBar() {
  const nicknameCtx = useContext(Nickname) as NicknameProps;
  const { setTheme } = useTheme();

  const clearNickname = () => nicknameCtx.setNickname("");

  return (
    <div className="px-4 py-2 border-b flex justify-between items-center bg-white dark:bg-zinc-950 dark:text-white dark:border-zinc-800">
      <h1 className="font-bold text-2xl cursor-pointer" onClick={clearNickname}>react-simple-chat</h1>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="ml-2">
          {nicknameCtx.nickname ? (
            <button
              onClick={clearNickname}
              className="flex items-center font-bold"
            >
              <img src="/assets/images/user.png" className="h-8 mr-1" />
              <p>{nicknameCtx.nickname}</p>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
