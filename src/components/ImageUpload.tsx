"use client";

import React from "react";

const ImageUpload = () => {
  const [imageFile, setImageFile] = React.useState<File>();

  // 사진이 입력되었을 때 처리를 해줌
  const handleImageSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const targetData = new FormData();
    targetData.append("image", imageFile as File);
    // 전송
    const res = await fetch("http://localhost:3000/api/upload", {
      method: "POST",

      body: targetData,
    });

    console.log('dㅇㅇㅇ', res)

    const data = await res.json();
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSignupSubmit}>
      <section>
        <label htmlFor="signup-profileimage">프로필 이미지</label>
        <input id="signup-profileimage" type="file" accept="image/*" onChange={handleImageSubmit} />
      </section>
      <button type="submit"> 제출</button>
    </form>
  );
};

export default ImageUpload;
