import React, { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const DiaryForm = ({ uid }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { addDocument, response } = useFirestore("diary");

  const handleData = (event) => {
    if (event.target.id === "tit") {
      setTitle(event.target.value);
    }
    if (event.target.id === "text") {
      setText(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDocument({ uid, title, text });
  };

  useEffect(() => {
    if (response.success) {
      setText("");
      setTitle("");
    }
  }, [response.success]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>일기 쓰기</legend>
          <label htmlFor="tit">일기 제목</label>
          <input
            type="text"
            id="tit"
            required
            onChange={handleData}
            value={title}
          />
          <label htmlFor="text">일기 내용</label>
          <textarea
            type="text"
            id="text"
            required
            onChange={handleData}
            value={text}
          />

          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  );
};

export default DiaryForm;
