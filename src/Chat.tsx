export default function Chat() {
  return (
    <div className="flex flex-col mt-2 grow mx-8 text-lg">
      <h1 className="font-bold text-xl text-center">Messages</h1>
      <div className="border rounded-lg my-2 grow px-2 py-1">
        <p>hello</p>
      </div>
      <div className="pb-8 flex">
        <div className="border grow flex rounded-md">
          <input placeholder="Enter a message" className="px-2 py-2 rounded-md grow"/>
          <button className="border-l px-2">Send</button>
        </div>
      </div>
    </div>
  );
}
