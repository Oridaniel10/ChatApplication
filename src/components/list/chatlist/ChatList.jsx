import { useState } from "react"
import "./chatlist.css"
import AddUser from "./addUser/AddUser";

const ChatList = () => {
    const [addMode , setAddmode] = useState(false);
  return (
    <div className="chatlist">
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="searchButton" />
                <input type="text" placeholder="search.." />
            </div>
            <img src= { addMode ? "./minus.png" : "./plus.png"} alt="plus" className="add"  onClick={()=>setAddmode(!addMode)}/>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Ori D</span>
                <p>Hello</p>  {/* latest message*/}
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Ori D</span>
                <p>Hello</p>  {/* latest message*/}
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Ori D</span>
                <p>Hello</p>  {/* latest message*/}
            </div>
        </div>
        {addMode && <AddUser/>}  {/* if we clicked on plus , adduser will display*/}
    </div>
  )
}

export default ChatList