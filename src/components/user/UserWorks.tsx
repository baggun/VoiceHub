// "use client";

import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

import ProfileCard from "@components/profile/ProfileCard";

import { getPostsProcess } from "@/apis/services/post";
import { getScriptsProcess } from "@/apis/services/script";
import { getVoicesProcess } from "@/apis/services/voice";
import { getUserLikePosts, getUserLikeScripts, getUserLikeVoices, getUserPosts, getUserVoices } from "@/apis/api/users";

import { PostType } from "@/types/post";
import { TabObjType } from "@/types/tab";
import { VoiceInfo } from "@/types/voice";
import { ScriptType } from "@/types/scripts";
import { AudioFileBar } from "../audio/AudioFile";
import ScriptCard from "../script/ScriptCard";
import Post from "../community/Post";
import { UserData } from "@/types/user";

import { ProfileNavCollapse, ProfileNavLink } from "./UserWorks.styled";

type UserWorksProps = {
  user_id: string;
  tab: string;
};

const UserWorks = async ({ user_id, tab }: UserWorksProps) => {
  let posts!: PostType[];
  let tracks!: VoiceInfo[];
  let scripts!: ScriptType[];
  let followers!: UserData[];
  //   const [posts, setPosts] = React.useState<PostType[]>([]);
  //   const [tracks, setTracks] = React.useState<VoiceInfo[]>([]);
  //   const [scripts, setScripts] = React.useState<ScriptType[]>([]);
  //   const [followers, setFollowers] = React.useState<UserData[]>([]);

  const tabList: TabObjType = {
    voices: {
      tab: "voices",
      title: "녹음",
      api: async (user_id: string) => {
        await getUserVoices(user_id)
          .then(res => getVoicesProcess(res.data))
          //   .then((res) => setTracks(res));
          .then(res => {
            tracks = res;
          });
      },
    },
    posts: {
      tab: "posts",
      title: "게시글",
      api: async (user_id: string) => {
        await getUserPosts(user_id)
          .then(res => getPostsProcess(res.data))
          .then(res => {
            posts = res;
          });
        //   .then((res) => setPosts(res));
      },
    },
    like_scripts: {
      tab: "like_scripts",
      title: "관심 대사",
      api: async (user_id: string) => {
        await getUserLikeScripts(user_id)
          .then(res => getScriptsProcess(res.data))
          //   .then((res) => setScripts(res));
          .then(res => (scripts = res));
      },
    },
    like_voices: {
      tab: "like_voices",
      title: "관심 녹음",
      api: async (user_id: string) => {
        await getUserLikeVoices(user_id)
          .then(res => getVoicesProcess(res.data))
          //   .then((res) => setTracks(res));
          .then(res => {
            tracks = res;
          });
      },
    },
    like_posts: {
      tab: "like_posts",
      title: "관심 게시글",
      api: async (user_id: string) => {
        await getUserLikePosts(user_id)
          .then(res => getPostsProcess(res.data))
          //   .then((res) => setPosts(res));
          .then(res => (posts = res));
      },
    },
  };

  await tabList[tab].api(user_id);
  console.log(scripts);
  return (
    <>
      {/* 동적 페이지 (작업물, 팔로워, 좋아요 목록 등등..) */}
      <div className="col-md-7">
        <ProfileNavCollapse>
          {Object.values(tabList).map(t => (
            <ProfileNavLink
              key={t.tab}
              href={{
                pathname: `/${user_id}`,
                query: { tab: t.tab },
              }}
              $active={(tab ?? Object.values(tabList)[0].tab) === t.tab}
            >
              {t.title}
            </ProfileNavLink>
          ))}
        </ProfileNavCollapse>
        {
          {
            followers: (
              <div>
                {followers?.map(follower => (
                  <ProfileCard key={`follower-${follower.id}`} {...follower} isFollowed={true} />
                ))}
              </div>
            ),
            following: (
              <div>
                {followers?.map(following => (
                  <ProfileCard key={`following-${following.id}`} {...following} isFollowed={true} />
                ))}
              </div>
            ),
            voices: (
              <>
                {tracks?.map(track => (
                  <AudioFileBar
                    key={`track-${track.id}`}
                    audioSrc={track.url}
                    userId={track.ownerID}
                    audioId={track.id}
                    likes={3}
                    info={{ ...track }}
                  />
                ))}
              </>
            ),
            posts: <>{posts?.map(post => <Post key={`post-${post.id}`} post={post} />)}</>,
            like_scripts: <>{scripts?.map(sc => <ScriptCard key={`script-${sc.id}`} script={sc} />)}</>,
            like_voices: (
              <>
                {tracks?.map(track => (
                  <AudioFileBar
                    key={`like-track-${track.id}`}
                    audioSrc={track.url}
                    userId={track.ownerID}
                    audioId={track.id}
                    likes={3}
                    info={{ ...track }}
                  />
                ))}
              </>
            ),
            like_posts: <>{posts?.map(post => <Post key={`like-post-${post.id}`} post={post} />)}</>,
          }[tab ?? "voices"]
        }
      </div>
    </>
  );
};
export default UserWorks;
