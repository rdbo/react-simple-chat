import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Nickname, NicknameProps } from "./App";

export default function Nick() {
  const [formNickname, setFormNickname] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const nicknameCtx = useContext(Nickname) as NicknameProps;

  const handleJoin = () => {
    if (formNickname.length < 4) {
      setErrorMsg("The nickname is too short");
      return;
    }

    setErrorMsg("");
    nicknameCtx.setNickname(formNickname);
  };

  const isNicknameValid = (nickname: string) => {
    return nickname.length < 32 && nickname.match(/^[A-Za-z0-9_]+$/);
  };

  const validateAndUpdateNickname = (newNickname?: string) => {
    if (!newNickname) {
      setFormNickname("");
      return;
    }

    if (isNicknameValid(newNickname)) {
      setFormNickname(newNickname);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key == "Enter" && isNicknameValid(formNickname)) {
      handleJoin();
    }
  }

  return (
    <div className="flex justify-center grow">
      <div className="w-96 my-20">
        <Card>
          <CardHeader>
            <CardTitle>Select a nickname</CardTitle>
            <CardDescription>
              This nickname will be displayed to other users when you send
              messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label className="font-bold" htmlFor="nickname">
              Nickname
            </Label>
            <Input
              id="nickname"
              name="nickname"
              placeholder="John Doe"
              value={formNickname}
              onChange={(e) => validateAndUpdateNickname(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {errorMsg.length > 0 && (
              <p className="text-red-500 text-sm my-2">{errorMsg}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleJoin}
              disabled={!isNicknameValid(formNickname)}
            >
              Join
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
