import axios from "axios";
import AddFriendCard from "../components/chats/user_section/AddFriendCard";
import { useEffect, useState, useCallback } from "react";
import { useAuth, type IUser } from "../context/AuthContext";
import SearchSection from "../components/chats/user_section/SearchSection";

const AddFriendPage = () => {
  const { user } = useAuth();
  const [allUser, setAllUser] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchingData, setSearchingData] = useState("");

  // memoize function
  const searchDataFun = useCallback((searchValue: string) => {
    setSearchingData(searchValue);
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchingAllUser = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `http://localhost:3000/api/user?query=${searchingData}`,
          { withCredentials: true }
        );

        if (!response.data.success) return;

        const filteredUsers = response.data.data.filter(
          (fetchedUser: IUser) => fetchedUser._id !== user._id
        );

        setAllUser(filteredUsers);
      } catch (error) {
        console.log("fetching all the friend failed!", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchingAllUser();
  }, [searchingData, user]);

  return (
    <main className="flex flex-col gap-8">
      <div className="bg-white p-4">
        <SearchSection searchDataFun={searchDataFun} />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <AddFriendCard registeredUser={allUser} />
      )}
    </main>
  );
};

export default AddFriendPage;
