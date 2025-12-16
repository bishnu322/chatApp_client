import { useCallback, useState } from "react";
import Message from "../components/chats/message_section/Message";
import UserData from "../components/chats/user_section/UserData";
import axios from "axios";
import { useAuth, type IUser } from "../context/AuthContext";

interface IMessage {
  message: string;
}

interface IChatFind {
  _id: string;
  chatId: string;
  users: IUser[];
  messages?: IMessage[];
}

const ChatLayout = () => {
  const { user } = useAuth();

  const [isLoadingSingleUserChat, setIsLoadingSingleUserChat] = useState(false);
  const [fetchingChatData, setFetchingChatData] = useState<IChatFind | null>(
    null
  );

  // 👇 mobile message visibility
  const [showMessageMobile, setShowMessageMobile] = useState(false);

  const fetchingSingleChat = useCallback(
    async (userId: string) => {
      if (!userId || !user?._id) return;

      try {
        setIsLoadingSingleUserChat(true);

        const response = await axios.get(
          `http://localhost:3000/api/chat/find/${userId}/${user._id}`,
          { withCredentials: true }
        );

        if (!response.data.success) return;

        setFetchingChatData(response.data.data);

        // 👇 open message page on mobile
        setShowMessageMobile(true);
      } catch (error) {
        console.error("Fetching single chat failed!", error);
      } finally {
        setIsLoadingSingleUserChat(false);
      }
    },
    [user?._id]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-1 h-screen">
      {/* user list mobile responsive */}
      <div
        className={`md:col-span-1 border-r ${
          showMessageMobile ? "hidden md:block" : "block"
        }`}
      >
        <UserData fetchingSingleChat={fetchingSingleChat} />
      </div>

      {/* message section mobile responsive */}
      <div
        className={`md:col-span-3 ${
          showMessageMobile ? "block" : "hidden md:block"
        }`}
      >
        <Message
          fetchingChatData={fetchingChatData}
          isLoading={isLoadingSingleUserChat}
          onBack={() => setShowMessageMobile(false)}
        />
      </div>
    </div>
  );
};

export default ChatLayout;
