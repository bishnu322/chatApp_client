import UserData from "../components/chats/UserData";
import Message from "../components/chats/Message";

const ChatLayout = () => {
  return (
    <div className="h-screen w-full">
      <div className="grid grid-cols-5 h-screen">
        <div className="col-span-2  border-r">
          {/* userdata */}
          <UserData />
        </div>

        <div className="col-span-3">
          {/* user message */}
          <Message />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
