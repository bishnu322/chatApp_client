import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/chatContext";

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
  onBack?: () => void;
}

interface ISocketMessage {
  senderId: string;
  message: IMessage;
}

const Message: React.FC<IMessageProps> = ({ fetchingChatData, onBack }) => {
  const { user } = useAuth();
  const { socket } = useChat();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  // finding friend
  const friend = fetchingChatData?.users.find((u) => u._id !== user?._id);

  // fetching all messages related to chatId
  const fetchMessages = useCallback(async (chatId?: string) => {
    if (!chatId) return;

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/message/${chatId}`,
        { withCredentials: true }
      );

      if (response.data?.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.log("fetching messages failed", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // load messages when chat changes
  useEffect(() => {
    if (fetchingChatData?._id) {
      fetchMessages(fetchingChatData._id);
    }
  }, [fetchingChatData?._id, fetchMessages]);

  // socket receiving message
  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (data: ISocketMessage) => {
      if (data.message.chatId._id === fetchingChatData?._id) {
        setMessages((prev) => [...prev, data.message]);
      }
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, fetchingChatData?._id]);

  // sending message
  const creatingMessage = async () => {
    if (!textMessage.trim() || !user || !fetchingChatData) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/api/message`,
        {
          senderId: user._id,
          chatId: fetchingChatData._id,
          text: textMessage,
        },
        { withCredentials: true }
      );

      if (!response.data.success) return;

      const newMessage: IMessage = response.data.data;

      setMessages((prev) => [...prev, newMessage]);
      setTextMessage("");

      if (friend?._id) {
        socket?.emit("sendMessage", {
          senderId: user._id,
          receiverId: friend._id,
          message: newMessage,
        });
      }
    } catch (error) {
      console.log("send message failed", error);
    }
  };

  // when no chat selected
  if (!fetchingChatData) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a chat to start messaging 💬
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* ================= HEADER UI (UNCHANGED + BACK BUTTON) ================= */}
      <div className="flex gap-4 bg-white px-6 py-4 items-center border-b">
        {/* ✅ Mobile Back Button */}
        {onBack && (
          <button onClick={onBack} className="md:hidden text-lg font-semibold">
            ←
          </button>
        )}

        <img src={img} className="w-12 h-12 rounded-full" />

        <div>
          <h2 className="font-semibold text-lg">
            {friend?.userName || "Unknown User"}
          </h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/* ================= MESSAGE UI (UNCHANGED) ================= */}
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
              className={`flex gap-3 ${
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
                <span className="block text-xs mt-1 opacity-70">
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

      {/* ================= INPUT UI (UNCHANGED) ================= */}
      <div className="flex gap-3 bg-white px-6 py-4 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && creatingMessage()}
        />

        <button
          className="px-6 py-2 bg-violet-600 text-white rounded-lg"
          onClick={creatingMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
