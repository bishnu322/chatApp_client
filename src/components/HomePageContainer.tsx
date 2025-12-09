import React from "react";
import { stringData } from "../string";

interface IProps {
  children: React.ReactNode;
}

const HomePageContainer: React.FC<IProps> = ({ children }) => {
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-300 p-4">
      <div className="bg-white w-full max-w-[350px] p-6 rounded-xl shadow-xl">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-900 text-2xl font-bold text-center">
            {stringData.homePage.homePageTitle}
          </h1>
          {children}
        </div>
      </div>
    </main>
  );
};

export default HomePageContainer;
