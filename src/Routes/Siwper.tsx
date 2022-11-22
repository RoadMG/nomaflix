import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";
import { Pagination } from "swiper";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  height: 150px;
  background-color: purple;
`;

const SwiperSlideBox = styled(SwiperSlide)`
  height: 150px;
  background-color: purple;
`;

const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Siwper = () => {
  return (
    <Wrap>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={4}
        pagination={{ clickable: true }}
        onSlideChange={() => {
          console.log("changed");
        }}
        onSwiper={(swipe) => console.log(swipe)}
      >
        {Array.map((n) => (
          <SwiperSlideBox>{n}</SwiperSlideBox>
        ))}
      </Swiper>
    </Wrap>
  );
};

export default Siwper;
