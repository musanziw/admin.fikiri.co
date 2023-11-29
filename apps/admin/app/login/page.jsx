"use client";

import styles from "@/app/ui/login/login.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

const LoginPage = () => {

  const { status, data: session } = useSession();

  const router = useRouter()

  if(status === "authenticated"){
    router.push('/dashboard')
  }else{
    return (
      <div className={styles.container}>
        <LoginForm/>
      </div>
    );
  }
}

export default LoginPage;