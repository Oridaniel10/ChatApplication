import { useEffect, useState } from "react"
import "./chatlist.css"
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {db} from "../../../lib/firebase"

const ChatList = () => {
    const [addMode , setAddmode] = useState(false);
    const [chats , setChats] = useState([]);

    const {currentUser} = useUserStore()

    //fetching user chats from database
    useEffect(()=>{
        const unSub = onSnapshot(doc(db , "userchats" , currentUser.id),async (res)=>{
        const items = res.data().chats;

        const promisses = items.map( async(item)=>{
            const userDocRef = doc(db , 'users' , item.reciverId);
            const userDocSnap = await getDoc(docRef);

            const user = userDocSnap.data();
            return{...item ,user }
        });

        const chatData = await Promise.all(promisses)

        setChats(chatData.sort((a,b)=>b.updatedAt - a.updatedAt));
        });
            return()=>{
                unSub()
            }

    },[currentUser.id])


  return (
    <div className="chatlist">
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="searchButton" />
                <input type="text" placeholder="search.." />
            </div>
            <img src= { addMode ? "./minus.png" : "./plus.png"} alt="plus" className="add"  onClick={()=>setAddmode(!addMode)}/>
        </div>
        {chats.map((chat)=>(
               <div className="item" key={chat.chatId}>
               <img src="./avatar.png" alt="" />
               <div className="texts">
                   <span>Ori D</span>
                   <p>{chat.lastMessage}</p>  {/* latest message*/}
               </div>
           </div>

        ))}


        {addMode && <AddUser/>}  {/* if we clicked on plus , adduser will display*/}
    </div>
  )
}

export default ChatList