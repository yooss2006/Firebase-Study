import React, { useState } from "react";
import useSignup from "../../hooks/useSignup";
import styles from "./Signup.module.css";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { error, isPending, signup } = useSignup();

  const handleForm = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    }
    if (e.target.type === "password") {
      setPassword(e.target.value);
    }
    if (e.target.type === "text") {
      setDisplayName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
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
        <label htmlFor="myNickname">nickname :</label>
        <input
          type="text"
          id="myNickname"
          required
          value={displayName}
          onChange={handleForm}
        />
        <button type="submit" className={styles.btn}>
          회원가입
        </button>
      </fieldset>
    </form>
  );
};

export default Signup;
