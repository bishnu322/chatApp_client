import axios from "axios";
import AddFriendCard from "../components/chats/user_section/AddFriendCard";
import { useEffect, useState } from "react";
import { useAuth, type IUser } from "../context/AuthContext";
import SearchSection from "../components/chats/user_section/SearchSection";

const AddFriendPage = () => {
  const { user } = useAuth();
  const [allUser, setAllUser] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchingData, setSearchingData] = useState("");

  const searchDataFun = (searchValue: string) => {
    setSearchingData(searchValue);
  };

  // fetching all the users
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

        // filtering login user from all users
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

  // creating chat on to one
  const createChat = async (friendId: string) => {
    try {
      if (!user?._id) return;

      const response = await axios.post(
        `http://localhost:3000/api/chat`,
        {
          firstId: user._id,
          secondId: friendId,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("chat is created...");
      }
    } catch (error) {
      console.log("something went wrong while adding friend", error);
    }
  };

  return (
    <main className="flex flex-col gap-8">
      <div className="bg-white p-4">
        <SearchSection searchDataFun={searchDataFun} />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <AddFriendCard registeredUser={allUser} createChat={createChat} />
      )}
    </main>
  );
};

export default AddFriendPage;
