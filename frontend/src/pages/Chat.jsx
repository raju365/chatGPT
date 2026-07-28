import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";

const Chat = () => {
  return (
    <main className="flex h-screen bg-zinc-950 text-white">

      <Sidebar />

      <section className="flex flex-1 flex-col">

        <ChatHeader />

        <ChatMessages />

        <ChatInput />

      </section>

    </main>
  );
};

export default Chat;