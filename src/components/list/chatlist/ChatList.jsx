import { useState } from "react"
import "./chatlist.css"

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
    </div>
  )
}

export default ChatList