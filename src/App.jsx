import { useEffect } from "react"
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import { useUserStore } from "./lib/userStore"
import { useChatStore } from "./lib/chatStore"
const App = () => {
  const {currentUser , isLoading , fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore();

  //listen to authentication Login or Register + send the latest status
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth,(user)=>{
      fetchUserInfo(user?.uid);  // Fetch user info from Firestore if user is authenticated
    })
    return()=>{
      unSub(); // Cleanup subscription on component unmount
    };
  },[fetchUserInfo])

  console.log(currentUser)

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    
    <div className='container'>
      
    {
      /* user connected ?  */
      currentUser ? (<>
        <List></List>
        {chatId && <Chat></Chat>}
        {chatId && <Detail></Detail>}</>)
        :/*else*/
        (<Login></Login>)}

        <Notification></Notification>
    </div>
    
  )
}

export default App