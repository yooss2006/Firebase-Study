import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Nav = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>비밀 일기</h1>
      <ul className={styles.list_nav}>
        {user ? (
          <li>
            <strong>환영합니다. {user.displayName}님</strong>
            <button type="button" onClick={logout}>
              로그아웃
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/login"}>로그인</Link>
            </li>
            <li>
              <Link to={"/signup"}>가입하기</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
