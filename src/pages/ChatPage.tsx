// import { useAuthStore } from "../shared/store/userStore";

import { useChat } from "../context/chatContext";
import ChatLayout from "../layout/ChatLayout";

const ChatPage = () => {
  // const user = useAuthStore((store) => store.user);
  const { chat } = useChat();

  console.log({ chat });

  return (
    <>
      <ChatLayout />
    </>
  );
};

export default ChatPage;
