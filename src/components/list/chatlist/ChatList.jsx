import { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [addMode, setAddmode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");



  
  const { currentUser } = useUserStore();
  const {chatId, changeChat}= useChatStore();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const docRef = doc(db, "userchats", currentUser.id); // Reference to the current user's chat document
        const docSnap = await getDoc(docRef); // Fetch the user's chat document

        if (docSnap.exists()) {
          const data = docSnap.data();
          const chatPromises = (data.chats || []).map(async (chat) => {
            const chatDocRef = doc(db, "chats", chat.chatId); // Reference to each chat document
            const chatDocSnap = await getDoc(chatDocRef); // Fetch each chat document

            if (chatDocSnap.exists()) {
              const userDocRef = doc(db, "users", chat.receiverId); // Reference to each receiver's user document
              const userDocSnap = await getDoc(userDocRef); // Fetch each receiver's user document

              if (userDocSnap.exists()) {
                const user = userDocSnap.data();
                return { ...chat, user }; // Combine chat and user data
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

    const userChats = chats.map(item=>{
      const {user , ...rest} = item;
      return rest;

    });

    const chatIndex = userChats.findIndex(item=> item.chatId=== chat.chatId)
    userChats[chatIndex].isSeen = true;

    const userChatsRef =doc(db , "userchats" , currentUser.id);

    try{

      await updateDoc(userChatsRef ,{
        chats :userChats,
      } )
      changeChat(chat.chatId , chat.user)

    }catch(err){
      console.log(err);
    }

  };

  const filteredChats = chats.filter((c)=> c.user.username.toLowerCase().includes(input.toLowerCase()))

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="searchButton" />
          <input type="text" placeholder="search.." onChange={(e)=>setInput(e.target.value)}/>
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="plus"
          className="add"
          onClick={() => setAddmode(!addMode)}
        />
      </div>
      {filteredChats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)}
        style={{
          backgroundColor : chat?.isSeen ? "transparent" : "#5183fe" , 
        }}
        >
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
