import "./adduser.css"
const AddUser = () => {
  return (
    <div className="addUser">

        <form action="">
            <input type="text" placeholder="Username" name="username" />  {/* search input*/}
            <button>Search</button>
        </form>
        <div className="user">
            <div className="detail">
                <img src="./avatar.png" alt="" />
                <span>Gal levi</span>
            </div>
            <button>Add User</button>
        </div>
    </div> 
  )
}

export default AddUser