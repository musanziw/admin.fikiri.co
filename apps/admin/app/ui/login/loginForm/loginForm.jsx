"use client";

import { useState } from "react";
import styles from "./loginForm.module.css";
import {signIn} from "next-auth/react";
import axios from "@/app/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginForm =  () => {
  const [account, setAccout] = useState();
  const [email, setEmail] = useState();
  const [passWord, setPassWord] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      setLoading(true);
      const payload = {
        email,
        password: passWord
      };
      const response = await axios.post("/auth/login", JSON.stringify(payload));
      if(response){
        setAccout(response.data.data);
        setLoading(false);
      }
    }catch(e){

    }
  }



  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="mot de passe" onChange={(e)=>setPassWord(e.target.value)}/>
      <button type="submit">Se connecter</button>
      <hr/>
      <button onClick={()=> signIn("google")}>Se connecter avec google</button>
    </form>
  );
};

export default LoginForm;