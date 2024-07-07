import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, signInWithGoogle } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  // State to store the user's avatar image
  const [avatar, setAvatar] = useState({ file: null, url: "" });
  // State to manage loading state during login or register
  const [loading, setLoading] = useState(false);

  // Handle avatar image selection
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
    }
  };

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setLoading(true); // Set loading to true
    const formData = new FormData(e.target); // Get form data
    const { username, email, password } = Object.fromEntries(formData);

    // Check if all fields are filled
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Upload avatar image if selected
      const imgUrl = avatar.file ? await upload(avatar.file) : "";

      // Add user data to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      // Initialize user chats in Firestore
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success(`Account Created !! : \nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setLoading(true); // Set loading to true
    const formData = new FormData(e.target); // Get form data
    const { email, password } = Object.fromEntries(formData);

    // Check if all fields are filled
    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Sign in with email and password
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", res.user);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
        </form>
      </div>

      <div className="seperator"></div>

      <div className="image">
        <img src="./Begin-chat.png" alt="" />
      </div>

      <div className="seperator"></div>

      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
