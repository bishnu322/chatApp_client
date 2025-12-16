import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useChat, type IUsers } from "../../../context/chatContext";
import AddFriendSection from "./AddFriend";

const img =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";

interface IProps {
  fetchingSingleChat: (userId: string) => void;
}

const UserData: React.FC<IProps> = ({ fetchingSingleChat }) => {
  const { logoutUser, user } = useAuth();
  const { chat, onlineUsers } = useChat();

  const [friends, setFriends] = useState<IUsers[]>([]);

  useEffect(() => {
    if (!chat || !user) return;

    const extractedFriends = chat.flatMap((chatItem) =>
      chatItem.users.filter((u) => u._id !== user._id)
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFriends(extractedFriends);
  }, [chat, user]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-white border-b flex justify-between items-center">
        <h3 className="text-xl font-bold text-violet-600">Chat Nepal</h3>
        <button
          onClick={logoutUser}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {friends.map((friend) => {
          const isOnline = onlineUsers.some(
            (onlineUser) => onlineUser.userId === friend._id
          );

          return (
            <div
              key={friend._id}
              onClick={() => fetchingSingleChat(friend._id)}
              className="flex items-center gap-4 bg-white p-4 rounded-xl cursor-pointer
                         hover:bg-violet-50 border transition"
            >
              {/* image  */}
              <img
                src={img}
                alt={friend.userName}
                className="w-14 h-14 rounded-full ring-2 ring-gray-200"
              />

              {/* Name */}
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800">
                  {friend.userName}
                </h2>
              </div>

              {/* Online Status */}
              <span
                className={`w-3 h-3 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-red-400"
                }`}
              />
            </div>
          );
        })}
      </div>

      <AddFriendSection />
    </div>
  );
};

export default UserData;
