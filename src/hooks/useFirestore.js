import { useReducer } from "react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { appFireStore, timestamp } from "../firebase/config";
const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, error: null, success: false };
    case "ADD_DOC":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    case "DELETE_DOC":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

//transaction는 컬렉션의 이름
export const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initState);
  //컬렉션의 레퍼런스로 컬렌션의 참조를 요구한다. 주소 전달
  //컬렉션의 상수가 colRef에 저장된다.
  //컬렉션을 만들지 않았었다면 생성하고 주소를 전달해준다.
  const colRef = collection(appFireStore, transaction);
  //컬렉션의 문서를 추가
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef);
      dispatch({ type: "ADD_DOC", payload: docRef });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };
  //컬렉션에서 문서제거
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: "DELETE_DOC", payload: docRef });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };
  return { addDocument, deleteDocument, response };
};
