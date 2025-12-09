import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUp from "./components/Auth/SignUp";

const App = () => {
  return (
    <main className="bg-gray-300 h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/signup"} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
