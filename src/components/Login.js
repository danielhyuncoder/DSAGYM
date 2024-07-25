import React, { useEffect, useState } from 'react'
import '../css/LoginRegister.css'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import app from '../firebase'
import { GoogleAuthProvider } from 'firebase/auth'
import { useSelector } from 'react-redux'
const Login = () => {
  const navigate=useNavigate()
  const auth = getAuth(app)
  const[error, setError] = useState("")
  const[email,setEmail] = useState("");
  const[password,setPassword]=useState("");
  const provider = new GoogleAuthProvider();
  const user = useSelector(state=>state.user.user)
  useEffect(() => {
       if (user){
           navigate('/')
       }
  }, [user])
  return (
    <div className="loginContainer">
        <div>
            <h2>Login</h2>
            <input onChange={(e)=>{
                setEmail(e.target.value)
            }} placeholder="Email"/>
            <br/>
            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} placeholder="Password" type="password"/>
            <br/>
            <button onClick={()=>{
               if (email.length===0||password.length===0){
                  setError("Email or password fields cannot be blank.")
               } else {
                  signInWithEmailAndPassword(auth, email, password).catch(err=>{
                     setError("Incorrect email or password.")
                  });
               }
            }}>Login</button>
            <p style={{margin_top: 10, color:"red"}}>{error}</p>
            <p className="classicRow">Don't have an account, <p className="bb" onClick={()=>navigate('/register')}>sign up instead.</p></p>
            <p style={{margin: 0}}>or</p>
            <br/>
            <button onClick={()=>{
                signInWithPopup(auth, provider).catch(err=>{});
            }}>Sign in with Google</button>
        </div>
    </div>
  )
}

export default Login