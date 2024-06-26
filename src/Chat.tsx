import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { Textarea } from "./components/ui/textarea";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Nickname, NicknameProps } from "./App";

interface BacklogEntry {
  nickname: string;
  ip_address: string;
  message: string;
}

interface BacklogResponse {
  backlog: BacklogEntry[];
}

interface SendMessageCommand {
  nickname: string;
  message: string;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [backlog, setBacklog] = useState<BacklogEntry[]>([]);
  const nicknameCtx = useContext(Nickname) as NicknameProps;
  const messagesContainer = useRef<HTMLDivElement | null>(null);
  const webSocketUrl =
    (window.location.protocol == "https:" ? "wss://" : "ws://") +
    window.location.host +
    "/api/websocket";
  const { sendMessage, sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(webSocketUrl, {
      onOpen: () => {
        sendMessage("get_backlog");
      },
      shouldReconnect: () => true,
    });

  // Update backlog with new messages
  useEffect(() => {
    if (lastJsonMessage == null) return;

    if (lastJsonMessage.hasOwnProperty("backlog")) {
      setBacklog((lastJsonMessage as BacklogResponse).backlog);
      return;
    }

    let newBacklog = [...backlog];
    newBacklog.push(lastJsonMessage as BacklogEntry);
    setBacklog(newBacklog);
  }, [lastJsonMessage]);

  // Scroll down when a new message arrives
  useEffect(() => {
    if (!messagesContainer.current) return;
    messagesContainer.current.scrollTop =
      messagesContainer.current.scrollHeight;
  }, [backlog]);

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
    if (readyState != ReadyState.OPEN || !message) return;

    let cmd: SendMessageCommand = {
      nickname: nicknameCtx.nickname,
      message: message,
    };

    sendJsonMessage(cmd);
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
      <div className="border dark:border-zinc-800 rounded-lg my-2 grow flex flex-col">
        <div className="px-2 py-1 border-b border-zinc-800">
          <p>
            Status:{" "}
            <span className={connectionColor[connectionStatus] + " font-bold"}>
              {connectionStatus}
            </span>
          </p>
        </div>
        <div className="grow relative">
          <div
            ref={messagesContainer}
            className="px-2 py-1 absolute top-0 overflow-y-scroll w-full h-full"
          >
            {backlog.map((entry, index) => (
              <p key={index} className="whitespace-pre-line">
                <span className="text-green-400">{entry.nickname}</span>@
                <span className="text-blue-400">{entry.ip_address}</span>:{" "}
                {entry.message}
              </p>
            ))}
          </div>
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
          onClick={sendMessageToServer}
        >
          <img src="/assets/images/send-message.png" className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
}
