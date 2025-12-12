import { createContext } from "react";
import type { IAuthContext } from "./AuthContext";
import type { IChatContext } from "./chatContext";

export const AuthContext = createContext<IAuthContext | null>(null);

export const ChatContext = createContext<IChatContext | null>(null);
