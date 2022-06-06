import { useState } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../db/firebase-config"
export function Registration() {
    const [regEmail, setEmail] = useState([]),
        [regPassword, setPassword] = useState([]),
        [loginEmail,setLoginEmail]=useState([]),
    [loginPassword,setLoginPassword]=useState([]);

        const user=null;
        function regUser(){
        createUserWithEmailAndPassword(auth,regEmail,regPassword).then((userCredential)=>{
             user=userCredential.user;
           
        }).catch((error)=>{
            console.log(error);
        })
        console.log(user);
        }
        function loginUser(){
            signInWithEmailAndPassword(auth,loginEmail,loginPassword).then((userCredential)=>{
                console.log(userCredential);
            }).catch((error)=>{
                console.log(error);
            })
        }
    
    return <div>
        <input type="text" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
        <input type="text" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
    <button  onClick={regUser}>register</button>
    <input type="text" placeholder="login Email" onChange={(e)=>{ setLoginEmail(e.target.value) }} />
    <input type="text" placeholder="login Password" onChange={(e)=>{setLoginPassword(e.target.value)}}/>
    <button onClick={loginUser}>Login</button>

    </div>
}