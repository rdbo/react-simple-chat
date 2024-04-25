import { Label } from "@radix-ui/react-label";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [nickname, setNickname] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFormSubmit = () => {
    if (nickname.length < 4) {
      setErrorMsg("The nickname is too short");
      return;
    }

    setErrorMsg("");
  };

  const validateAndUpdateNickname = (newNickname?: string) => {
    if (!newNickname) {
      setNickname("");
      return;
    }

    if (newNickname.match(/^[A-Za-z0-9_]+$/)) {
      setNickname(newNickname);
    }
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="flex justify-center items-center">
          <div className="w-96 my-2">
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
                  value={nickname}
                  onChange={(e) => validateAndUpdateNickname(e.target.value)}
                />
                {errorMsg.length > 0 && (
                  <p className="text-red-500 text-sm my-2">{errorMsg}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleFormSubmit}>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
