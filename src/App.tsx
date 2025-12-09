import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <main className="bg-gray-300 h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/chat"} element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
