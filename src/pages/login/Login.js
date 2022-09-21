import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import styles from "./Login.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleForm = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    }
    if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>로그인</legend>
        <label htmlFor="myEmail">email :</label>
        <input
          type="email"
          id="myEmail"
          required
          value={email}
          onChange={handleForm}
        />
        <label htmlFor="myPassword">password :</label>
        <input
          type="password"
          id="myPassword"
          required
          value={password}
          onChange={handleForm}
        />
        {isPending ? (
          <strong>로그인 진행중</strong>
        ) : (
          <button type="submit" className={styles.btn}>
            로그인
          </button>
        )}
        {error && <strong>에러 발생</strong>}
      </fieldset>
    </form>
  );
};
export default Login;
