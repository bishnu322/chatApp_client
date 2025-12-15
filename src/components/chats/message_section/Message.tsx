import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const img =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";

interface IResponseTimeStamps {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
interface ISender {
  _id: string;
  userName: string;
  email: string;
}
interface IChat extends IResponseTimeStamps {
  users: string[];
}

interface IMessage extends IResponseTimeStamps {
  senderId: ISender[];
  chatId: IChat;
  text: string;
}

const Message = ({ fetchingChatData }) => {
  const [userMessage, setUserMessage] = useState<IMessage | null>(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  // console.log("fetchingid", fetchingChatData?._id);

  const fetchingUserChatMessage = useCallback(async (chatId?: string) => {
    if (!chatId) return;
    try {
      setIsMessageLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/message/${chatId}`,
        { withCredentials: true }
      );

      if (!response.data.success) return null;

      setUserMessage(response.data.data);
    } catch (error) {
      console.log("fetching user message failed!", error);
    } finally {
      setIsMessageLoading(false);
    }
  }, []);

  console.log({ userMessage });

  useEffect(() => {
    fetchingUserChatMessage(fetchingChatData?._id);
  }, [fetchingChatData?._id, fetchingUserChatMessage]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header - Fixed height */}
      <div className="flex gap-4 bg-white px-6 py-4 items-center shadow-sm border-b border-gray-200">
        <div>
          <img
            src={img}
            alt="profile_img"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-800 text-lg">Friend's Name</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Body - Takes remaining space */}
      <div className="flex-1 bg-liner-to-br  overflow-y-auto p-6">
        <div className="max-w-4xl">
          {/* Sample received message */}
          <div className="flex items-start gap-3">
            <img
              src={img}
              alt="sender"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200"
            />
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 max-w-md">
              <p className="text-gray-700">Hey! How are you doing?</p>
              <span className="text-xs text-gray-400 mt-1 block">10:30 AM</span>
            </div>
          </div>

          {/* Sample sent message */}
          <div className="flex items-start gap-3 justify-end">
            <div className="bg-violet-600 px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm max-w-md">
              <p className="text-white">I'm doing great! Thanks for asking.</p>
              <span className="text-xs text-violet-200 mt-1 block text-right">
                10:32 AM
              </span>
            </div>
          </div>

          {/* Sample received message */}
          <div className="flex items-start gap-3">
            <img
              src={img}
              alt="sender"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200"
            />
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 max-w-md">
              <p className="text-gray-700">
                That's wonderful! Want to catch up later?
              </p>
              <span className="text-xs text-gray-400 mt-1 block">10:33 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed height */}
      <div className="flex gap-3 bg-white px-6 py-4 items-center shadow-sm border-t border-gray-200">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                   placeholder-gray-400 text-gray-700 transition-all"
        />
        <button
          className="px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold 
                         hover:bg-violet-700 active:scale-95 transition-all shadow-sm
                         hover:shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
