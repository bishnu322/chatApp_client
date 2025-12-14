import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./components/Auth/SignUp";
import ChatPage from "./pages/ChatPage";
import { useAuth } from "./context/AuthContext";
import { ChatContextProvider } from "./context/chatContext";
import AddFriendPage from "./pages/AddFriendPage";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuthStore } from "./shared/store/userStore";

const App = () => {
  const { user } = useAuth();
  // const setUser = useAuthStore((store) => store.setUser);
  // const [isAuthenticating, setIsAuthenticating] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3000/api/auth/is-auth", {
  //         withCredentials: true,
  //       });

  //       setUser(res.data);

  //       if (location.pathname === "/") {
  //         location.replace("/chat");
  //       }
  //     } catch {
  //       if (location.pathname !== "/") {
  //         location.replace("/");
  //       }
  //     } finally {
  //       setIsAuthenticating(false);
  //     }
  //   })();
  // }, [setUser]);

  // if (isAuthenticating) {
  //   return <>Loading...</>;
  // }

  return (
    <main className="bg-gray-300 h-screen w-full">
      <ChatContextProvider user={user}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={user ? <ChatPage /> : <HomePage />} />
            <Route
              path={"/signup"}
              element={user ? <ChatPage /> : <SignUp />}
            />
            <Route
              path={"/chat"}
              element={user ? <ChatPage /> : <HomePage />}
            />
            <Route
              path={"/addFriend"}
              element={user ? <AddFriendPage /> : <HomePage />}
            />
          </Routes>
        </BrowserRouter>
      </ChatContextProvider>
    </main>
  );
};

export default App;
