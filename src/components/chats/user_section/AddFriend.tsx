import { Link } from "react-router-dom";
import { stringData } from "../../../string";

const { addFriend } = stringData;

const AddFriendSection = () => {
  return (
    <main className="bg-white h-20 shadow-lg shadow-gray-600 flex items-center justify-end">
      <Link
        to={"/addFriend"}
        className="px-6 py-2.5 bg-violet-600 text-white font-semibold rounded-lg 
                           hover:bg-violet-700 active:scale-95 transition-all shadow-sm
                           hover:shadow-md mr-5"
      >
        {addFriend?.AddFriend}
      </Link>
    </main>
  );
};

export default AddFriendSection;
