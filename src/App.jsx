import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login"

const App = () => {
// if there is no user connect - we will show the login page
  const user = false
  return (
    
    <div className='container'>
      
    {
      /* user connected ?  */
      user ? (<>
        <List></List>
        <Chat></Chat>
        <Detail></Detail></>)
        :/*else*/
        <Login></Login>
    }
    </div>
    
  )
}

export default App