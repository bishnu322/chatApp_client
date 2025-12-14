import axios from "axios";
import AddFriendCard from "../components/chats/user_section/AddFriendCard";
import { useEffect, useState } from "react";
import { useAuth, type IUser } from "../context/AuthContext";

const AddFriendPage = () => {
  const { user } = useAuth();
  const [allUser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchingAllUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/user`, {
          withCredentials: true,
        });

        if (!response.data.success) return;

        const allFetchedUSer = response.data.data.filter(
          (fetchedUser: IUser) => fetchedUser._id !== user?._id
        );

        setAllUser(allFetchedUSer);
      } catch (error) {
        console.log("fetching all the friend failed!", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchingAllUser();
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  console.log({ allUser });

  return (
    <main className="p-4">
      <AddFriendCard registeredUser={allUser} />
    </main>
  );
};

export default AddFriendPage;
