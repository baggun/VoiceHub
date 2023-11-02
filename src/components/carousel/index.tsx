"use client";

import Slider from "react-slick";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from "react-router-dom";

type BannerData = {
  id: number | string;
  title: string;
  content: string;
  image: string;
  color: string;
};

const Carousel = () => {
  const router = useRouter();
  const slides: BannerData[] = [
    {
      id: 5,
      title: "KBS 방송국 성우 공채",
      content: "25번째 성우 공채 지금 지원하기",
      image:
        "https://cdn.inflearn.com/public/main_sliders/dd5c29ab-6be1-4bc2-b347-29e0c9388e99/%5B%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A6%E1%86%AB%E1%84%90%E1%85%B3%5D%E1%84%82%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8E%E1%85%A9%E1%84%87%E1%85%A9%E1%84%83%E1%85%A12_main_521.png",
      color: "#5806f0",
    },
    {
      id: 5,
      title: "KBS 방송국 성우 공채",
      content: "25번째 성우 공채 지금 지원하기",
      image: "https://grepp-programmers.s3.amazonaws.com/production/file_resource/1989/2022-SCHOOL-commulearning-7.png",
      color: "#3e4683",
    },
    {
      id: 5,
      title: "KBS 방송국 성우 공채",
      content: "25번째 성우 공채 지금 지원하기",
      image:
        "https://cdn.inflearn.com/public/main_sliders/04081c01-4aee-40ad-a500-5260f1cfd508/main_521_%EC%9D%B8%ED%94%84%EB%9F%B0%EC%86%8C%EA%B0%9C.png",
      color: "#59cf93",
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
      {slides.map(slide => (
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
  background-color: ${props => props.color};
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
    font-weight: 500;
    z-index: 2;
  }
  .content-desc {
    font-weight: 200;
    z-index: 2;
  }
  ${({ theme }) => theme.devices.max_tablet} {
    justify-content: flex-start;
  }
`;

const SliderImage = styled.img`
  height: 80%;
  width: auto;
  max-width: 100%;
  ${({ theme }) => theme.devices.max_tablet} {
    height: 60%;
  }
`;
export default Carousel;
