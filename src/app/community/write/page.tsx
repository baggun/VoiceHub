"use client";

import React from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";
// import { RootState } from "@modules/index";
// import { Link, useNavigate } from "react-router-dom";

import { Button } from "@common/button";
import Textarea from "@common/textarea";
import Select from "@common/input/Select";
import { FormGroup } from "@common/form/Form";
import Label from "@common/Label";
import { Input } from "@components/common/input";
import { DefaultLayout } from "@components/layout";
import Selector, { OptionType } from "@common/input/Selector";

import { postPost } from "@apis/api/post";
import { _CATEGORY_DATA_ } from "@data/category";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atom";

const CommunityWrite = () => {
  const router = useRouter();
  // const user = useSelector((state: RootState) => state.users);
  const user = useRecoilValue(userState);
  const [selectorValue, setSelectorValue] = React.useState<readonly OptionType[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [category, setCategory] = React.useState(_CATEGORY_DATA_[0].value);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.id) {
      router.push("/auth/login");
      return;
    }

    await postPost({
      title: title,
      content: content,
      type: category,
      tags: selectorValue.map(val => val.value),
    }).then(res => {
      console.log(res);
      if (res.success) {
        router.push(`/community/${res.id}`);
      }
    });
  };

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <DefaultLayout>
      <WriteContainer>
        <WriteForm onSubmit={submitHandler} className="col-md-10">
          <FormGroup>
            <Label htmlFor="selectCategory" $require>
              카테고리
            </Label>
            <Select id="selectCategory" value={category} onChange={onSelect} options={_CATEGORY_DATA_} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="inputTitle" $require>
              제목
            </Label>
            <Input id="inputTitle" onChange={e => setTitle(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="inputContent" $require>
              내용
            </Label>
            <Textarea rows={10} id="inputContent" onChange={e => setContent(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>태그</Label>
            <Selector value={selectorValue} setValue={setSelectorValue} />
            <Button
              type="submit"
              $margin="2rem 0rem 0rem 0rem"
              $customStyle={"float: right"}
              disabled={title === "" || content === ""}
            >
              완료
            </Button>
          </FormGroup>
        </WriteForm>
      </WriteContainer>
    </DefaultLayout>
  );
};

export default CommunityWrite;

const WriteContainer = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
  margin: 3rem 0rem;
`;
const WriteForm = styled.form`
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: rgba(149, 157, 165, 0.3) 0px 3px 24px;
`;
