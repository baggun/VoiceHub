"use client";

import React from "react";
import { useRecoilState } from "recoil";

import Search from ".";
import { ModalBackground } from "@components/common/modal";
import { searchModalState } from "@recoil/search/atom";
import useRouteHandler from "@hooks/useRouteHandler";

const SearchModal = () => {
  const [openSearchModal, setOpenSearchModal] = useRecoilState(searchModalState);

  const closedSearchModal = () => {
    setOpenSearchModal(false);
  };
  useRouteHandler(closedSearchModal);

  return (
    <>
      {openSearchModal && (
        <>
          <Search />
          <ModalBackground onClick={closedSearchModal} />
        </>
      )}
    </>
  );
};

export default SearchModal;
