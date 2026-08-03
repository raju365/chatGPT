import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import { ChatProvider } from "../context/ChatContext";
import NetworkStatus from "@/components/common/NetworkStatus";


const Chat = () => {
  return (
    <ChatProvider>
      <main className="flex h-screen flex-col overflow-hidden bg-zinc-950 text-white lg:flex-row">
        <NetworkStatus />
        <Sidebar />
        <section className="flex flex-1 flex-col">
          <ChatHeader />
          <ChatMessages />
          <ChatInput />
        </section>
      </main>
    </ChatProvider>
  );
};

export default Chat;
