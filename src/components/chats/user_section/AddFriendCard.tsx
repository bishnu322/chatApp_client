import { stringData } from "../../../string";
import type { IUser } from "../../../context/AuthContext";

const { addFriend } = stringData;

const img =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddFriendCard = ({ registeredUser }: any) => {
  if (registeredUser.length === 0) return <div>No user available</div>;

  return (
    <div className="grid md:grid-cols-5 gap-2 sm:grid-cols-3">
      {registeredUser.map((user: IUser) => (
        <div
          className=" bg-gray-400 rounded p-2 flex gap-5 items-center w-[200px] "
          key={user._id}
        >
          <div>
            <img
              src={img}
              alt={`user`}
              width={"50px"}
              className="rounded-4xl object-cover"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold">{user.userName}</h4>
            <button className="bg-violet-600 text-gray-100 font-semibold px-2 py-1 text-sm rounded hover:bg-violet-700 hover:cursor-pointer">
              {addFriend.AddFriend}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddFriendCard;
