import { useState } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"

const Chat = () => {
  const [open , setOpen] = useState(false);
  const [Text , setText] = useState("");

  const handleEmoji = (e) =>{
    setText(perv=> perv + e.emoji)
    setOpen(false);

  }


  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="ProfilePicture" />
          <div className="texts">
          <span> Ori D</span>
          <p> User Description...</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="phone" />
          <img src="./video.png" alt="video" />
          <img src="./info.png" alt="info" />
        </div>
      </div>

      <div className="center"></div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="img" />
          <img src="./camera.png" alt="camera" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="Type a message.." onChange={e=>setText(e.target.value)} value={Text}></input>
        <div className="emoji">
          <img src="./emoji.png" alt=""  onClick={()=>setOpen(!open)}/>
          <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji}></EmojiPicker>
          </div>
        </div>
        <button className="sendButton">send</button>
      </div>
    </div>
  )
}  

export default Chat