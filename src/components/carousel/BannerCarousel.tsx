"use client";

import Image from "next/image";
import Slider from "react-slick";
import styled from "styled-components";
import { useRouter } from "next/navigation";

// import { useNavigate } from "react-router-dom";

type BannerData = {
  id: number | string;
  title: string;
  content: string;
  image: string;
  color: string;
};

const BannerCarousel = () => {
  const router = useRouter();
  const slides: BannerData[] = [
    {
      id: 1,
      title: "OOO 방송국 성우 공채",
      content: "25번째 성우 공채 지금 지원하기",
      image: "/img/icon.png",
      color: "#5806f0",
    },
    {
      id: 2,
      title: "OOO 방송국 성우 공채",
      content: "25번째 성우 공채 지금 지원하기",
      image: "/img/icon.png",
      color: "#3e4683",
    },
    {
      id: 3,
      title: "OOO 방송국 성우 공채",
      content: "25번째 성우 공채 지금 지원하기",
      image: "/img/icon.png",
      color: "#7386f9",
    },
  ];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //   autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <CustomSlider {...settings}>
      {slides.map((slide) => (
        <SliderProvider
          key={slide.id}
          color={slide.color}
          onClick={() => {
            router.push(`/contest/${slide.id}`);
          }}
        >
          <FlexContainer>
            <ContainerLeft>
              <SliderContent>
                <p className="content-title">{slide.title}</p>
                <p className="content-desc">{slide.content}</p>
              </SliderContent>
            </ContainerLeft>
            <ContainerRight>
              <SliderImage src={slide.image} alt={slide.title} />
            </ContainerRight>
          </FlexContainer>
        </SliderProvider>
      ))}
    </CustomSlider>
  );
};

const SliderProvider = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  cursor: pointer;
`;
const CustomSlider = styled(Slider)`
  // background-color: tomato;
  ${({ theme }) => theme.devices.max_desktop} {
    margin-top: 0rem;
  }
  .slick-list {
    height: 320px;
    // border-radius: 2rem;
    ${({ theme }) => theme.devices.max_desktopLarge} {
      border-radius: 0px;
    }
  }
  .slick-dots {
    display: flex !important;
    position: absolute;
    bottom: 1.625rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    margin: 0px auto;
    max-width: 72rem;
    color: rgb(255, 255, 255);
    font-size: 1rem;
    padding: 0px 0px 0px 0.5rem;
    z-index: 100;

    li button:before {
      color: white;
    }
    ${({ theme }) => theme.devices.max_desktopLarge} {
      padding-left: 2rem;
      max-width: 62rem;
    }
  }
  .slick-prev,
  .slick-next {
    position: absolute;
    height: 100%;
    width: 3rem;
    border-radius: 1rem;
    z-index: 1;
  }
  .slick-prev {
    left: 0px;
  }
  .slick-next {
    right: 0px;
  }
  .slick-prev:before,
  .slick-next:before {
    // color: black;
  }
`;
const FlexContainer = styled.div`
  height: 320px;
  max-width: 72rem;
  margin: 0px auto;
  padding: 0px 1rem;
  position: relative;
  overflow: hidden;
  ${({ theme }) => theme.devices.max_desktopLarge} {
    max-width: 62rem;
  }
`;
const ContainerLeft = styled.div`
  height: 100%;
  max-width: 30rem;
  padding: 3rem 0rem 68px 0rem; // 3rem + 20px(slick-dots 크기) : 68px
  z-index: 2;
  ${({ theme }) => theme.devices.max_desktopLarge} {
    padding-left: 1rem;
  }
`;
const ContainerRight = styled.div`
  position: absolute;
  height: 100%;
  top: 0px;
  right: 5rem;
  display: flex;
  align-items: center;
  z-index: 1;
  ${({ theme }) => theme.devices.max_desktopLarge} {
    right: 0rem;
  }
  ${({ theme }) => theme.devices.max_tablet} {
    align-items: flex-end;
  }
`;

const SliderContent = styled.div`
  display: flex;
  height: 100%;
  max-height: 320px;
  flex-direction: column;
  justify-content: center;
  color: white;
  z-index: 2;
  .content-title {
    font-size: 2rem;
    font-weight: 600;
    z-index: 2;
  }
  .content-desc {
    font-weight: 300;
    font-size: 1.25rem;
    z-index: 2;
  }
  ${({ theme }) => theme.devices.max_tablet} {
    justify-content: flex-start;
  }
`;

// TODO : 외부 이미지 사용말고 나중에 자체 이미지 사용으로 바꿀떄 next/image 로 변경
const SliderImage = styled.img`
  height: 80%;
  width: auto;
  max-width: 100%;
  ${({ theme }) => theme.devices.max_tablet} {
    height: 60%;
  }
`;
export default BannerCarousel;
