import { useQuery } from "@tanstack/react-query";
import { getTv, IGetTvResult } from "../api";
import { TvSlider } from "../Components/Slider";
import { makeImagePath, TvCurrent } from "../utils";
import { Banner, Loader, OverView, Title, Wrapper } from "./Home";

const Tv = () => {
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["Tv", TvCurrent.on_the_air],
    () => getTv(TvCurrent.on_the_air)
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].name}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
          <TvSlider current={TvCurrent.on_the_air} />
          <TvSlider current={TvCurrent.popular} />
          <TvSlider current={TvCurrent.top_rated} />
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
