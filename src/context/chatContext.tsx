import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { ChatContext } from "./context";

interface IChat {
  _id: string;
  chatId: string;
  senderId: string;
}

export interface IChatContext {
  chat: IChat | null;
  setChat: React.Dispatch<React.SetStateAction<IChat | null>>;
}

interface IProps {
  children: React.ReactNode;
  user?: { _id?: string } | null;
}

export const ChatContextProvider: React.FC<IProps> = ({ children, user }) => {
  //   const { user } = useAuth();
  const [chat, setChat] = useState<IChat | null>(null);

  const getChat = async () => {
    try {
      if (user?._id) {
        const response = await axios.get(
          `http://localhost:3000/api/chat/${user._id}`
        );

        if (response.data.success) {
          setChat(response.data.data);

          console.log(response.data.data);
        }
      }
    } catch (error) {
      console.log("fetching chat error", error);
    }
  };

  useEffect(() => {
    getChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatContextProvider");
  return ctx;
};
