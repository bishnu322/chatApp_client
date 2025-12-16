import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { ChatContext } from "./context";
import { io, Socket } from "socket.io-client";

export interface IUsers {
  userName: string;
  _id: string;
  email: string;
  updatedAt: string;
  createdAt: string;
}

interface IChat {
  _id: string;
  chatId: string;
  senderId: string;
  users: IUsers[];
}

export interface IChatContext {
  chat: IChat[] | null;
  setChat: React.Dispatch<React.SetStateAction<IChat[] | null>>;
  isUserChatLoading: boolean;
  onlineUsers: IOnlineUser[];
  socket: Socket | null;
}

interface IProps {
  children: React.ReactNode;
  user?: { _id?: string } | null;
}

interface IOnlineUser {
  socketId: string;
  userId: string;
}

export const ChatContextProvider: React.FC<IProps> = ({ children, user }) => {
  const [chat, setChat] = useState<IChat[] | null>(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUser] = useState<IOnlineUser[]>([]);

  const getChat = async () => {
    try {
      if (!user) return null;
      if (user?._id) {
        setIsUserChatLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/chat/${user._id}`
        );

        if (response.data.success) {
          setChat(response.data.data);
          setIsUserChatLoading(false);

          console.log(response.data.data);
        }
      }
    } catch (error) {
      console.log("fetching chat error", error);
    }
  };

  console.log({ user });
  useEffect(() => {
    getChat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // for connection to backend socket
  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    console.log({ newSocket });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // for online users
  const userId = user?._id;

  useEffect(() => {
    if (!socket || !userId) return;

    socket.emit("addNewUser", userId);

    socket.on("getOnlineUser", (res) => {
      setOnlineUser(res);
    });

    return () => {
      socket.off("getOnlineUser");
    };
  }, [socket, userId]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        setChat,
        isUserChatLoading,
        onlineUsers,
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useChat must be used within ChatContextProvider");
  return context;
};
