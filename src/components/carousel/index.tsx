"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Slider from "react-slick";
import styled from "styled-components";

type CarouselProps = {
  children?: React.ReactNode;
  setting?: object;
};

const Carousel = ({ setting, children }: CarouselProps) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 200,
    draggable: false,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          draggable: true,
          arrows: false,
        },
      },
    ],
    ...setting,
  };

  return <CarouselStyled {...settings}>{children}</CarouselStyled>;
};
export default Carousel;

const CarouselStyled = styled(Slider)`
  .slick-track {
    margin-left: 0px;
    margin-right: 0px;
    display: flex;
  }
`;

type ArrowProps = {
  className?: string;
  onClick?: (e: any) => void;
};
const NextArrow = ({ className, onClick }: ArrowProps) => {
  return (
    <ArrowButton className={className} onClick={onClick}>
      <IconChevronRight className="icon" />
    </ArrowButton>
  );
};

const PrevArrow = ({ className, onClick }: ArrowProps) => {
  return (
    <ArrowButton className={className} onClick={onClick}>
      <IconChevronLeft className="icon" />
    </ArrowButton>
  );
};

const ArrowButton = styled.div`
  display: block;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  top: calc(50% - 48px);
  transform: translate(0, calc(-50% + 24px));
  border-radius: 50%;
  box-shadow: rgb(0, 0, 0, 0.2) 0px 4px 10px;
  z-index: ${({ theme }) => theme.zIndex.interaction};
  background: white;
  &::before {
    content: "";
  }
  &:hover {
    background: white;
  }
  .icon {
    color: black;

    /* border: 1px solid ${({ theme }) => theme.colors.secondary}; */
  }
`;
