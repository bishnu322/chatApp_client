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

  // Fetch single chat on demand
  const fetchingSingleChat = useCallback(
    async (userId: string) => {
      if (!userId) return;

      try {
        setIsLoadingSingleUserChat(true);

        const response = await axios.get(
          `http://localhost:3000/api/chat/find/${userId}/${user?._id}`,
          { withCredentials: true }
        );

        if (!response.data.success) return;

        setFetchingChatData(response.data.data);
      } catch (error) {
        console.log("Fetching single chat failed!", error);
      } finally {
        setIsLoadingSingleUserChat(false);
      }
    },
    [user?._id]
  );

  console.log({ fetchingChatData, isLoadingSingleUserChat });

  return (
    <div className="h-screen w-full">
      <div className="grid grid-cols-5 h-screen">
        {/* Left panel: user list */}
        <div className="col-span-2 border-r">
          <UserData fetchingSingleChat={fetchingSingleChat} />
        </div>

        {/* Right panel: messages */}
        <div className="col-span-3">
          <Message fetchingChatData={fetchingChatData} />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
