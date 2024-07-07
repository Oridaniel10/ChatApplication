import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, signInWithGoogle } from "../../lib/firebase";
import { doc , setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {

//state to show the picture the user has chosen

//usestate for avatar img
const[avatar , setAvatar] = useState({
    file: null,
    url:""
})

//useState for loading while register or LOGIN

const[loading , setLoading] = useState(flase)

const handleAvatar = (e)=>{
    if(e.target.files[0]){ // if img Uploaded
    setAvatar({
        file: e.target.files[0],
        url:URL.createObjectURL(e.target.files[0])
    })
}
}

const handleRegister = async(e) =>{   // async function because we use database request
    e.preventDefault()   // prevent from refresh the page after submit
    setLoading(true);
    const formData = new FormData(e.target)    //create formDate

    const{username , email , password} = Object.fromEntries(formData);
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const imgUrl = await upload(avatar.file)

        //creating the users cluster and adding the new user
        await setDoc(doc(db, "users" , res.user.uid),{ //db / collection name // passing the id of the user form res
            username,
            email,
            avatar : imgUrl,
            id: res.user.uid ,
            blocked:[] ,
 
        });
         //creating userchats cluster
        await setDoc(doc(db, "userchats" , res.user.uid),{ //db / collection name // passing the id of the user form res
            chats:[] , 
 
        });

        toast.success(`Account Created !! : \nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);


    } catch (error) {
        console.error(error);
        toast.error(error.message);
      }finally{                   //no matter if try/catch , finnaly will allways work
        setLoading(false);
      }
    };

const handleLogin = (e)=>{
    e.preventDefault()  // prevent from refresh the page after submit
    //toast.success("Hello") // success message
}



  return (
    <div className="login">
        <div className="item">
            <h2>Welcome back,</h2>
            <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <button disabled={loading}>{loading ? "Loadin..." : "Sign In"}</button>

            </form>
        </div> 

        <div className="seperator"></div>

        <div className="image">  
            <img src="./Begin-chat.png" alt="" />
        </div>

        <div className="seperator"></div>



        <div className="item">
        <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>        {/*register form*/}
                <label htmlFor="file">
                <img src={avatar.url || "./avatar.png"} alt="" />
                Upload an image</label>
                <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                <input type="username" name="username" placeholder="Username"/>
                <input type="text" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <button disabled={loading}>{loading ? "Loadin..." : "Sign Up"}</button>

            </form>
        </div>



    </div>
  )
}

export default Login