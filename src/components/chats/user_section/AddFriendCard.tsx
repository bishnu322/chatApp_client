import { stringData } from "../../../string";
import type { IUser } from "../../../context/AuthContext";
const img =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";

const { addFriend } = stringData;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddFriendCard = ({ registeredUser, createChat }: any) => {
  return (
    <div className="grid md:grid-cols-5 gap-2 sm:grid-cols-3 p-2">
      {registeredUser.length < 1 ? (
        <div>user not found!</div>
      ) : (
        registeredUser.map((user: IUser) => (
          <div
            className=" bg-gray-100 rounded p-2 flex gap-5 items-center w-[200px] shadow shadow-gray-400 "
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
              <button
                onClick={() => createChat(user._id)}
                className="bg-violet-600 text-gray-100 font-semibold px-2 py-1 text-sm rounded hover:bg-violet-700 hover:cursor-pointer"
              >
                {addFriend.AddFriend}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AddFriendCard;
