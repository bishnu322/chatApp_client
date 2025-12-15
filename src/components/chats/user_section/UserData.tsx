import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useChat, type IUsers } from "../../../context/chatContext";
import AddFriendSection from "./AddFriend";

const img =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";

export interface IUserDetail {
  _id: string;
  chatName: string;
  createdAt: string;
  updatedAt: string;
}
interface IProps {
  fetchingSingleChat: (userId: string) => void;
}

const UserData: React.FC<IProps> = ({ fetchingSingleChat }) => {
  const { logoutUser } = useAuth();
  const { chat } = useChat();
  const { user } = useAuth();

  const [friends, setFriends] = useState<IUsers[]>([]);

  // console.log({ chat });

  useEffect(() => {
    if (!chat || !user) return;

    const extractedFriends = chat.flatMap((userData) =>
      userData.users.filter((singleUser) => singleUser._id !== user._id)
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFriends(extractedFriends);
  }, [chat, user]);
  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="p-4 bg-white shadow-sm border-b border-gray-200">
        <div className="flex  justify-between items-center">
          <h3 className="text-2xl font-bold bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Chat Nepal
          </h3>
          <button
            onClick={logoutUser}
            className="px-2 py-1 bg-red-600 rounded text-gray-100 font-semibold"
          >
            logout
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search friends..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                     placeholder-gray-400 text-gray-700 transition-all"
          />
          <button
            className="px-6 py-2.5 bg-violet-600 text-white font-semibold rounded-lg 
                           hover:bg-violet-700 active:scale-95 transition-all shadow-sm
                           hover:shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-200">
        {friends.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-4 bg-white hover:bg-violet-50 
                     p-4 rounded-xl cursor-pointer transition-all duration-200
                     border border-gray-100 hover:border-violet-200 hover:shadow-md
                     group"
            onClick={() => fetchingSingleChat(user._id)}
          >
            {/* Profile Image */}
            <div className="shrink-0">
              <img
                src={img}
                alt={`${user.userName}'s profile`}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 
                         group-hover:ring-violet-300 transition-all"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h2
                className="font-semibold text-gray-800 text-base mb-0.5 
                           group-hover:text-violet-700 transition-colors"
              >
                {user.userName}
              </h2>
              {/* <p className="text-sm text-gray-500 truncate">{user.message}</p> */}
            </div>

            {/* Online Indicator (Optional) */}
            <div className="shrink-0">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* add friend section */}
      <AddFriendSection />
    </div>
  );
};

export default UserData;
