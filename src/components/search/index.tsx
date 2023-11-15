import React from "react";
import { Input } from "@common/input";
import styled from "styled-components";
import { IconSearch, IconScript, IconUser } from "@tabler/icons-react";
import { Nav } from "@common/nav";
import { NavItemActive } from "@common/nav";
import { IconHeadphones } from "@tabler/icons-react";
import Badge from "@common/badge";
import { ModalBackground } from "@common/modal";
import { search } from "@utils/apis/api/search";
import { ScriptBaseType } from "@type/scripts";
import { VoiceInfo } from "@type/voice";
import { getVoicesProcess } from "@utils/apis/services/voice";
import { getScriptBaseProcess } from "@utils/apis/services/script";
import { ScriptList, VoiceList, UserList } from "./SearchList";
import { Button } from "@common/button";
import { UserData } from "@type/user";
import { getUsersPureProcess } from "@utils/apis/services/user";

const iconProps = {
  className: "icon",
  strokeWidth: 1.25,
};

const Search = () => {
  const [searchTxt, setSearchTxt] = React.useState<string>("");
  const [searchFilter, setSearchFilter] = React.useState<"all" | "voice" | "script" | "profile">("all");
  const [scripts, setScripts] = React.useState<ScriptBaseType[]>();
  const [voices, setVoices] = React.useState<VoiceInfo[]>();
  const [users, setUsers] = React.useState<UserData[]>();

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchTxt(e.target.value);
  };

  const itemProps = (item: "all" | "voice" | "script" | "profile") => {
    return {
      $isActive: searchFilter === item,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSearchFilter(item);
      },
    };
  };

  const searchAPI = async () => {
    console.log("1");
    if (!searchTxt) {
      return;
    }
    const res = await search(searchTxt);
    setVoices(getVoicesProcess(res.voices));
    setScripts(getScriptBaseProcess(res.scripts));
    setUsers(getUsersPureProcess(res.users));
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // e.stopPropagation();
    // e.preventDefault();
    if (e.key === "Enter") {
      searchAPI();
    }
  };

  return (
    <SearchModal>
      <SearchWrap className="search-wrap">
        <Input
          className="search-input"
          value={searchTxt}
          onChange={searchInputHandler}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력해주세요.."
        ></Input>
        <Button
          variant="transparent"
          onClick={() => {
            searchAPI();
          }}
        >
          <IconSearch className="icon" />
        </Button>
      </SearchWrap>
      <SearchNav className="search-nav">
        <Nav $alignItems="center">
          <NavItemActive {...itemProps("all")}>전체</NavItemActive>
          <NavItemActive {...itemProps("voice")}>
            <IconHeadphones {...iconProps} /> 목소리
            {voices && <Badge>{voices?.length}</Badge>}
          </NavItemActive>
          <NavItemActive {...itemProps("script")}>
            <IconScript {...iconProps} /> 대사
            {scripts && <Badge>{scripts?.length}</Badge>}
          </NavItemActive>
          <NavItemActive {...itemProps("profile")}>
            <IconUser {...iconProps} /> 성우
            <Badge>{users?.length}</Badge>
          </NavItemActive>
        </Nav>
      </SearchNav>
      <SearchResult className="scroll light">
        {["all", "voice"].includes(searchFilter) && voices && <VoiceList voices={voices} />}
        {["all", "script"].includes(searchFilter) && scripts && <ScriptList scripts={scripts} />}
        {["all", "profile"].includes(searchFilter) && users && <UserList users={users} />}
      </SearchResult>
    </SearchModal>
  );
};

export default Search;

const SearchModal = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 40rem;
  // height: 40rem;
  max-height: 40rem;
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  top: 15rem;
  left: 50%;
  transform: translate(-50%, -10rem);
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.modal};
  box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.2);
  -webkit-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.2);
  -moz-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.2);
`;
const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0rem 1rem 1rem;
  .search-input {
  }
`;
const SearchNav = styled.div`
  padding: 0rem 1rem 0.25rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;
const SearchResult = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
`;
