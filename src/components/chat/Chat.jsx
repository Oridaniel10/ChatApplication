import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [Text, setText] = useState("");

  const {chatId}= useChatStore();


  const endRef = useRef(null)

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"});
  }, []);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db , "chats",chatId), (res)=>{
      setChat(res.data())
    })

    return ()=>{
      unSub();
    } ;
  },[chatId]);

  console.log(chat)

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="ProfilePicture" />
          <div className="texts">
            <span>Ori D</span>
            <p>User Description...</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="phone" />
          <img src="./video.png" alt="video" />
          <img src="./info.png" alt="info" />
        </div>
      </div>

      <div className="center">
        { chat?.messages?.map((message) => (
        <div className="message own" key={message?.createdAt}>
          <div className="texts">
          {message.img && <img src={message.img} alt="Husky" />}
          <p>{message.text}</p>
            {/*<span>{message.createdAt}</span>*/}
          </div>
        </div>
        ))}

        <div ref={endRef}></div>   {/* UseEffect hook to scroll to this div every refresh*/}
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="img" />
          <img src="./camera.png" alt="camera" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message.."
          onChange={(e) => setText(e.target.value)}
          value={Text}
        />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji}></EmojiPicker>
          </div>
        </div>
        <button className="sendButton">send</button>
      </div>
    </div>
  );
};

export default Chat;
