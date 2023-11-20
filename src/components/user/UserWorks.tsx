// "use client";

import React from "react";

import Post from "@components/community/Post";
import ScriptCard from "@components/script/ScriptCard";
import ProfileCard from "@components/profile/ProfileCard";
import AudioBar from "@components/audio/player/AudioBar";

import { getPostsProcess } from "@utils/apis/services/post";
import { getScriptsProcess } from "@utils/apis/services/script";
import { getVoicesProcess } from "@utils/apis/services/voice";
import {
  getUserLikePosts,
  getUserLikeScripts,
  getUserLikeVoices,
  getUserPosts,
  getUserVoices,
} from "@utils/apis/api/users";
import { UserData } from "@type/user";
import { PostType } from "@type/post";
import { TabObjType } from "@type/tab";
import { VoiceInfo } from "@type/voice";
import { ScriptType } from "@type/scripts";

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

  const tabList: TabObjType = {
    voices: {
      tab: "voices",
      title: "녹음",
      api: async (user_id: string) => {
        await getUserVoices({ user_id })
          .then(res => getVoicesProcess(res.data))
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
      },
    },
    like_scripts: {
      tab: "like_scripts",
      title: "관심 대사",
      api: async (user_id: string) => {
        await getUserLikeScripts(user_id)
          .then(res => getScriptsProcess(res.data))
          .then(res => (scripts = res));
      },
    },
    like_voices: {
      tab: "like_voices",
      title: "관심 녹음",
      api: async (user_id: string) => {
        await getUserLikeVoices(user_id)
          .then(res => getVoicesProcess(res.data))
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
          .then(res => (posts = res));
      },
    },
  };

  try {
    if (["followers", "followings"].includes(tab)) {
    } else {
      await tabList[tab].api(user_id);
    }
  } catch (err) {
    await tabList["voices"].api(user_id);
  }

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
            followings: (
              <div>
                {followers?.map(following => (
                  <ProfileCard key={`followings-${following.id}`} {...following} isFollowed={true} />
                ))}
              </div>
            ),
            voices: (
              <>
                {tracks?.map(track => (
                  <AudioBar
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
                  <AudioBar
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
