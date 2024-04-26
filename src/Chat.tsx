import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export default function Chat() {
  return (
    <div className="flex flex-col mt-2 grow mx-8 text-lg">
      <h1 className="font-bold text-xl text-center">Messages</h1>
      <div className="border dark:border-zinc-800 rounded-lg my-2 grow px-2 py-1">
        <p>hello</p>
      </div>
      <div className="pb-8 flex items-center">
        <Input
          placeholder="Enter a message"
          className="px-2 py-2 rounded-md grow"
        />
        <button className="px-2 rounded-full">
          <img src="/assets/images/send-message.png" className="h-12" />
        </button>
      </div>
    </div>
  );
}
