import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  //통신 상태 저장, 처음에는 통신하지 않으니 false
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = (email, password, displayName) => {
    setError(null);
    setIsPending(true); //통신 시작

    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user; //회원가입시 유저의 정보가 담겨온다.
        console.log(user);

        if (!user) {
          throw new Error("회원가입이 실패했습니다.");
        }

        updateProfile(appAuth.currentUser, { displayName })
          .then(() => {
            dispatch({ type: "LOGIN", payload: user });
            setError(null);
            setIsPending(false);
          })
          .catch((error) => {
            setError(error);
            setIsPending(false);
          });
      })
      .catch((error) => {
        setError(error);
        setIsPending(false);
      });
  };
  return { error, isPending, signup };
};

export default useSignup;
