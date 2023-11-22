"use client";

import styles from "./loginForm.module.css";


const LoginForm = () => {

  return (
    <form className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="Login" name="username" />
      <input type="password" placeholder="mot de passe" name="password" />
      <button>Se connecter</button>
    </form>
  );
};

export default LoginForm;