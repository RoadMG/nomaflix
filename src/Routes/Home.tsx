import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { MovieSlider } from "../Components/Slider";
import { makeImagePath, MovieCurrent } from "../utils";
import { Helmet } from "react-helmet";

export const Wrapper = styled.div`
  background: black;
  overflow: hidden;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding: 60px;
  background-image: radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-size: cover;

  @media screen and (max-width: 500px) {
    visibility: hidden;
    height: 20vh;
  }
`;

export const Title = styled.h2`
  font-size: 58px;
  margin-bottom: 20px;
  margin-top: 300px;
`;

export const OverView = styled.p`
  font-size: 20px;
  width: 50%;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  text-overflow: ellipsis;
  height: 7.8em;
  word-wrap: break-word;
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  font-weight: 300;
`;

///////////// styled components //////////////

////////////// variants ////////////////

const Home = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    () => getMovies(MovieCurrent.now_playing)
  );

  return (
    <>
      <Helmet>
        <title>Netflix</title>
      </Helmet>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner
              bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            >
              <Title>{data?.results[0].title}</Title>
              <OverView>{data?.results[0].overview}</OverView>
            </Banner>
            <MovieSlider current={MovieCurrent.now_playing} />
            <MovieSlider current={MovieCurrent.upcoming} />
            <MovieSlider current={MovieCurrent.popular} />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
