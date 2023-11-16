"use client";
import { UserData } from "@/types/user"; 
import Profile from "."; 
import Carousel from "../carousel";

type ProfileListProps = {
  users: UserData[];
};

const ProfileList = ({ users }: ProfileListProps) => {
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
          direction="col"
          $marginRight="1rem"
        />
      ))}
    </Carousel>
  );
};

export default ProfileList;
