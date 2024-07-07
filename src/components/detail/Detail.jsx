import { auth } from "../../lib/firebase"
import "./detail.css"
const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="userPhoto" />
        <h2>Username</h2>
        <p>User Desciptiommmmmmmm</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div> 
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            

            <div className="photoItem">
              <div className="photoDetail">
              <img src="./SIA.jpeg" alt="" />
              <span>Photo name</span>
              </div>
            <img src="./download.png" alt="" className="icon"/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
              <img src="./SIA.jpeg" alt="" />
              <span>Photo name</span>
              </div>
            <img src="./download.png" alt="" className="icon"/>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
      </div>
  )
}

export default Detail