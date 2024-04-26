import { KeyboardEvent, useEffect, useState } from "react";
import { Textarea } from "./components/ui/textarea";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface BacklogEntry {
  nickname: string;
  message: string;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [backlog, setBacklog] = useState<BacklogEntry[]>([]);
  const webSocketUrl =
    (window.location.protocol == "https:" ? "wss://" : "ws://") +
    window.location.host +
    "/api/websocket";
  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(webSocketUrl, {
    onOpen: () => {
      sendMessage("get_backlog");
      setBacklog([]);
    },
    shouldReconnect: () => true,
  });

  // Update backlog with new messages
  useEffect(() => {
    if (lastJsonMessage == null)
      return;

    console.log("MESSAGE: ", lastJsonMessage);
    let newBacklog = [...backlog];
    newBacklog.push(lastJsonMessage as BacklogEntry);
    setBacklog(newBacklog);
  }, [lastJsonMessage])

  let connectionStatus: "connected" | "connecting" | "disconnected";
  if (readyState == ReadyState.OPEN) {
    connectionStatus = "connected";
  } else if (readyState == ReadyState.CONNECTING) {
    connectionStatus = "connecting";
  } else {
    connectionStatus = "disconnected";
  }
  const connectionColor = {
    connected: "text-green-500",
    connecting: "text-yellow-500",
    disconnected: "text-red-500",
  };

  const sendMessageToServer = () => {
    setMessage("");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // TODO: Grow/shrink textarea height
    if (event.key == "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessageToServer();
    }
  };

  const updateMessage = (newMessage: string) => {
    setMessage(newMessage);
  };

  return (
    <div className="flex flex-col mt-2 grow mx-8 text-lg">
      <h1 className="font-bold text-xl text-center">Messages</h1>
      <div className="border dark:border-zinc-800 rounded-lg my-2 grow">
        <div className="px-2 py-1 border-b border-zinc-800">
          <p>
            Status:{" "}
            <span className={connectionColor[connectionStatus] + " font-bold"}>
              {connectionStatus}
            </span>
          </p>
        </div>
        <div className="px-2 py-1">
          {backlog.map((entry) => (
            <p>
              {entry.nickname}: {entry.message}
            </p>
          ))}
        </div>
      </div>
      <div className="pb-8 flex items-center">
        <Textarea
          placeholder="Enter a message"
          className="px-2 py-2 rounded-md grow resize-none"
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(event) => updateMessage(event.target.value)}
        />
        <button
          className={"ml-2 rounded-full" + (message ? "" : " opacity-50")}
          disabled={!message}
        >
          <img src="/assets/images/send-message.png" className="h-12" />
        </button>
      </div>
    </div>
  );
}
