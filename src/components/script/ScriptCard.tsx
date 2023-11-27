"use client";

import React from "react";
import styled, { css } from "styled-components";
// import { Link } from "react-router-dom";

import Tag from "@/components/common/tag";
import { Button } from "@common/button";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { IconBinaryTree2 } from "@tabler/icons-react";
import { ScriptType } from "@type/scripts";
import Link from "next/link";

export type ScriptCardProps = {
  script: ScriptType;
  className?: string;
  $fixedWidth?: string;
};

const ScriptCard = ({ script, className, $fixedWidth }: ScriptCardProps) => {
  const [scrollContent, setScrollContent] = React.useState<boolean>(false);

  const scrollContentHandler = (e: any) => {
    e.preventDefault();
    setScrollContent(!scrollContent);
  };

  return (
    <div className={className}>
      <ScriptBody $fixedWidth={$fixedWidth}>
        <ScriptOverview>
          <Link href={`/script/${script.id}`}>
            <ScriptTitle>{script.title}</ScriptTitle>
          </Link>
          {script.tags.length > 0 && (
            <div>
              {script.tags.map(t => (
                <Tag key={t} tag={t}></Tag>
              ))}
            </div>
          )}
          <ScriptContent className="scroll" onClick={scrollContentHandler} $enableScroll={scrollContent}>
            {script.script}
          </ScriptContent>
          <ScriptFooter>
            <ScriptChallenge>
              {script.likedByUser ? <IconHeartFilled className="icon" /> : <IconHeart className="icon" />}
              {script.likeCount}
            </ScriptChallenge>
            <ScriptChallenge>
              <IconBinaryTree2 className="icon" /> {script.voiceCount}
            </ScriptChallenge>
            <Link className="detail-btn" href={`/script/${script.id}`}>
              <Button
                variant="transparent"
                $borderRadius="0.25rem"
                $padding="padding: 0.5rem 0.75rem"
                $float="right"
                outline
              >
                자세히 보기
              </Button>
            </Link>
          </ScriptFooter>
        </ScriptOverview>
      </ScriptBody>
    </div>
  );
};

export default ScriptCard;

const ScriptBody = styled.div<{ $fixedWidth?: string }>`
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;

  border: 0.1rem solid #e9e6f7;
  box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.05);
  -webkit-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.05);
  -moz-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.05);
  background-color: white;

  ${props =>
    props.$fixedWidth &&
    css`
      width: ${props.$fixedWidth};
      margin-right: 1rem;
    `}
`;
const ScriptOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ScriptTitle = styled.h2``;

const ScriptFooter = styled.div`
  display: flex;
  align-items: center;
  .detail-btn {
    margin-left: auto;
  }
`;
const ScriptChallenge = styled.span`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 2rem;
  color: ${({ theme }) => theme.colors.grey};
  .icon {
    margin-right: 0.5rem;
  }
`;

const ScriptContent = styled.div<{ $enableScroll: boolean }>`
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-line;
  opacity: 0.5;

  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 1rem 0rem;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.hover};
  }

  ${props => {
    if (props.$enableScroll)
      return css`
        -webkit-line-clamp: 12;
        overflow-y: scroll;
      `;
  }}

  ${({ theme }) => theme.devices.max_desktop} {
    -webkit-line-clamp: 9;
  }
  ${({ theme }) => theme.devices.max_tablet} {
    -webkit-line-clamp: 8;
  }
  ${({ theme }) => theme.devices.max_mobile} {
    -webkit-line-clamp: 7;
  }
  ${({ theme }) => theme.devices.max_only_mobile} {
    -webkit-line-clamp: 6;
  }
`;
