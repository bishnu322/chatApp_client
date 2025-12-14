import React, { useEffect, useState } from "react";

interface IProps {
  searchDataFun: (searchValue: string) => void;
}

const SearchSection: React.FC<IProps> = ({ searchDataFun }) => {
  const [tempSearchData, setTempSearchData] = useState("");
  const [searchData, setSearchData] = useState("");

  // for debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchData(tempSearchData);
    }, 500);

    return () => clearTimeout(timer);
  }, [tempSearchData]);

  // run search AFTER debounce
  useEffect(() => {
    if (!searchData) return;

    searchDataFun(searchData);
  }, [searchData, searchDataFun]);

  return (
    <div className="flex gap-3 ">
      <input
        type="text"
        value={tempSearchData}
        placeholder="Search friends..."
        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                     placeholder-gray-400 text-gray-700 transition-all"
        onChange={(e) => setTempSearchData(e.target.value)}
      />
      <button
        className="px-6 py-2.5 bg-violet-600 text-white font-semibold rounded-lg 
                           hover:bg-violet-700 active:scale-95 transition-all shadow-sm
                           hover:shadow-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchSection;
