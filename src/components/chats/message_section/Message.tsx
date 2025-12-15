import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const img =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";

interface IBaseTimestamps {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IUser {
  _id: string;
  userName: string;
  email: string;
}

interface IChat {
  _id: string;
  users: IUser[];
}

interface IMessage extends IBaseTimestamps {
  senderId: IUser;
  chatId: IChat;
  text: string;
}

interface IMessageProps {
  fetchingChatData?: IChat | null;
}

const Message: React.FC<IMessageProps> = ({ fetchingChatData }) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  //  finding friend data to show friends userName in  heading
  const friend = fetchingChatData?.users.find((u) => u._id !== user?._id);
  const senderId = user?._id;

  //  fetching message using chat id
  const fetchMessages = useCallback(async (chatId?: string) => {
    if (!chatId) return;

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/message/${chatId}`,
        { withCredentials: true }
      );

      if (!response.data?.success) return;

      setMessages(response.data.data);
    } catch (error) {
      console.error("fetching user message failed!", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchingChatData?._id) {
      fetchMessages(fetchingChatData._id);
    }
  }, [fetchingChatData?._id, fetchMessages]);

  // if fetching Chat Data is empty
  if (!fetchingChatData) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a chat to start messaging 💬
      </div>
    );
  }

  // creating message

  const creatingMessage = async (chatId: string, text: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/message`,
        { senderId, chatId, text },
        { withCredentials: true }
      );

      if (!response.data.success) return null;
    } catch (error) {
      console.log("unable to create message", error);
    }
  };

  console.log({ textMessage });

  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <div className="flex gap-4 bg-white px-6 py-4 items-center border-b">
        <img src={img} className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="font-semibold text-lg">
            {friend?.userName || "Unknown User"}
          </h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100">
        {isLoading && <div>Loading messages...</div>}

        {!isLoading && messages.length === 0 && (
          <div className="text-center text-gray-500">
            No messages yet. Start chatting 👋
          </div>
        )}

        {messages.map((msg) => {
          const isOwnMessage = msg.senderId._id === user?._id;

          return (
            <div
              key={msg._id}
              className={`flex items-end gap-3 ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwnMessage && (
                <img src={img} className="w-8 h-8 rounded-full" />
              )}

              <div
                className={`max-w-md px-4 py-2 rounded-2xl text-sm shadow
                  ${
                    isOwnMessage
                      ? "bg-violet-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border"
                  }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`block text-xs mt-1 ${
                    isOwnMessage ? "text-violet-200" : "text-gray-400"
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>

              {isOwnMessage && (
                <img src={img} className="w-8 h-8 rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="flex gap-3 bg-white px-6 py-4 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          defaultValue={textMessage}
          className="flex-1 px-4 py-2 border rounded-lg"
          onChange={(e) => setTextMessage(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-violet-600 text-white rounded-lg"
          onClick={() => creatingMessage(fetchingChatData._id, textMessage)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
