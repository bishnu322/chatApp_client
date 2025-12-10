import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./components/Auth/SignUp";
import ChatPage from "./pages/ChatPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "./shared/store/userStore";

const App = () => {
  const setUser = useAuthStore((store) => store.setUser);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/is-auth", {
          withCredentials: true,
        });

        setUser(res.data);

        if (location.pathname === "/") {
          location.replace("/chat");
        }
      } catch {
        if (location.pathname !== "/") {
          location.replace("/");
        }
      } finally {
        setIsAuthenticating(false);
      }
    })();
  }, [setUser]);

  if (isAuthenticating) {
    return <>Loading...</>;
  }

  return (
    <main className="bg-gray-300 h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/chat"} element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
