import { UserData } from "@/types/user";
import Profile from ".";
import Carousel from "../carousel";

import { getRecommendUser } from "@/utils/apis/api/users";
import { getUsersPureProcess } from "@/utils/apis/services/user";
import Skeleton, { SkeletonGroup, SkeletonWrapper } from "../sekeleton";

const ProfileList = async () => {
  const resUsers = await getRecommendUser();
  const users: UserData[] = getUsersPureProcess(resUsers.user);

  var setting = {
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          draggable: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          draggable: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Carousel setting={setting}>
      {users.map(user => (
        <Profile
          key={`rec-user-${user.id}`}
          profileID={user.id}
          nickname={user.nickname}
          profile_url={user.profile}
          size={5.25}
          $direction="col"
          $marginRight="1rem"
        />
      ))}
    </Carousel>
  );
};

export default ProfileList;

export const ProfileListSkeleton = () => {
  return (
    <SkeletonWrapper $overflow>
      {Array.from({ length: 10 }, (v, index) => (
        <SkeletonGroup key={index} $align="center">
          <Skeleton
            height="5.25rem"
            width="5.25rem"
            variant="circle"
            style={{
              margin: "0rem 0.5rem 0rem 0.5rem",
            }}
          />
          <Skeleton height="1rem" width="3rem" style={{ margin: "0.5rem 0rem 0rem 0rem" }} />
        </SkeletonGroup>
      ))}
    </SkeletonWrapper>
  );
};
