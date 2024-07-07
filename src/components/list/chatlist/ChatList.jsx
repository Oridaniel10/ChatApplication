import { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [addMode, setAddmode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const {chatId, changeChat}= useChatStore();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const docRef = doc(db, "userchats", currentUser.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const chatPromises = (data.chats || []).map(async (chat) => {
            const chatDocRef = doc(db, "chats", chat.chatId);
            const chatDocSnap = await getDoc(chatDocRef);

            if (chatDocSnap.exists()) {
              const userDocRef = doc(db, "users", chat.receiverId);
              const userDocSnap = await getDoc(userDocRef);

              if (userDocSnap.exists()) {
                const user = userDocSnap.data();
                return { ...chat, user };
              } else {
                console.error(`User document not found for ID: ${chat.receiverId}`);
                return null;
              }
            } else {
              console.error(`Chat document not found for ID: ${chat.chatId}`);
              return null;
            }
          });

          const resolvedChats = await Promise.all(chatPromises);
          setChats(resolvedChats.filter(chat => chat !== null).sort((a, b) => b.updatedAt - a.updatedAt));
        } else {
          console.log("No user chats document found.");
          setChats([]);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
        setChats([]);
      }
    };

    if (currentUser && currentUser.id) {
      fetchChats();
    }

    const unsubscribe = onSnapshot(doc(db, "userchats", currentUser.id), () => {
      fetchChats();
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleSelect = async(chat)=>{
    changeChat(chat.chatId , chat.user)
  }

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="searchButton" />
          <input type="text" placeholder="search.." />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="plus"
          className="add"
          onClick={() => setAddmode(!addMode)}
        />
      </div>
      {chats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)}>
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user ? chat.user.username : "Unknown User"}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
