import { KeyboardEvent, useState } from "react";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function Chat() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    setMessage("");
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key == "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  const updateMessage = (newMessage: string) => {
    setMessage(newMessage);
  };

  return (
    <div className="flex flex-col mt-2 grow mx-8 text-lg">
      <h1 className="font-bold text-xl text-center">Messages</h1>
      <div className="border dark:border-zinc-800 rounded-lg my-2 grow px-2 py-1">
        <p>hello</p>
      </div>
      <div className="pb-8 flex items-center">
        <Textarea
          placeholder="Enter a message"
          className="px-2 py-2 rounded-md grow"
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(event) => updateMessage(event.target.value)}
        />
        <button className={"ml-2 rounded-full" + (message ? "" : " opacity-50")} disabled={!message}>
          <img src="/assets/images/send-message.png" className="h-12" />
        </button>
      </div>
    </div>
  );
}
