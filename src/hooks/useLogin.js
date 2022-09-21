import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  //통신 상태 저장, 처음에는 통신하지 않으니 false
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const login = (email, password) => {
    setError(null);
    setIsPending(true); //통신 시작

    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setError(null);
        setIsPending(false);
        if (!user) {
          throw new Error("로그인에 실패했습니다.");
        }
      })
      .catch((error) => {
        setError(error);
        setIsPending(false);
      });
  };
  return { error, isPending, login };
};

export default useLogin;
