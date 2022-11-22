import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import {
  getMovieCredit,
  getMovieDetail,
  getMovies,
  getTv,
  getTvCredit,
  getTvDetail,
  IGetMoiveDetail,
  IGetMovieCredit,
  IGetMoviesResult,
  IGetTvCredit,
  IGetTvDetail,
  IGetTvResult,
} from "../api";
import { makeImagePath, MovieCurrent, TvCurrent } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { MovieSimilar, TvSimilar } from "./Similar";

export const Wrap = styled.div`
  position: relative;
  height: 200px;
  top: -100px;
  margin-bottom: 50px;
`;

export const Category = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const Arrows = styled.div`
  opacity: 0;
  transition: all 0.5s;
  &:hover {
    opacity: 1;
  }
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  position: absolute;

  &:hover ~ ${Arrows} {
    opacity: 1;
  }
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const Info = styled(motion.div)`
  padding: 10px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8));
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const NavArrow = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 40px;
  height: 200px;
  cursor: pointer;
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${document.documentElement.clientHeight}px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 3;
`;

export const BigMovie = styled(motion.div)<{ scrolly: number }>`
  position: absolute;
  width: 50vw;
  height: 80vh;
  top: 75px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: linear-gradient(rgba(7, 7, 7, 0), rgb(7, 7, 7, 0.9));
  background-color: rgb(93, 92, 92);
  border-radius: 10px;
  z-index: 4;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BigCover = styled.div<{ bgPhoto: string }>`
  width: 100%;
  position: relative;
  background-size: cover;
  background-position: center center;
  height: 400px;
  cursor: pointer;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
`;

export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 30px;
  font-weight: 500;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: black;
  position: relative;
  top: -80px;
`;

export const BigOverView = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  font-weight: 400;
  width: 80%;
`;

export const CloseBtn = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.darker};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 0;
  opacity: 0.7;
  margin: 10px 10px;
  cursor: pointer;
  z-index: 5;
  top: 0;
  right: 0;
`;

export const Details = styled.div`
  margin-top: -60px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

export const BigRuntime = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin: auto auto auto 20px;
`;

export const BigRelease = styled.div`
  font-size: 20px;
  margin: auto 0px auto 20px;
  font-weight: 400;
`;

export const BigCast = styled.p`
  font-size: 16px;
  margin-left: 20px;
  font-weight: 350;
`;

//////////////styled components///////////////////////

export const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    zIndex: 6,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

export const rowVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? window.outerWidth : -window.outerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -window.outerWidth : window.outerWidth,
  }),
};

////////////variatns///////////////
const offset = 6;

export const MovieSlider = ({ current }: { current: MovieCurrent }) => {
  const { data } = useQuery<IGetMoviesResult>(["movies", current], () =>
    getMovies(current)
  );

  const { scrollY } = useScroll();
  const history = useNavigate();
  const bigMovieMatch = useMatch(`/movies/${current}/:movieId`);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const { data: detailData } = useQuery<IGetMoiveDetail>(
    ["movieDetail", bigMovieMatch?.params.movieId],
    async () => getMovieDetail(bigMovieMatch?.params.movieId),
    { enabled: !!bigMovieMatch?.params.movieId }
  );
  const { data: creditData } = useQuery<IGetMovieCredit>(
    ["movieCredit", bigMovieMatch?.params.movieId],
    () => getMovieCredit(bigMovieMatch?.params.movieId),
    { enabled: !!bigMovieMatch?.params.movieId }
  );

  const increaseIndex = (newDirection: number) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setDirection(newDirection);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + newDirection));
    }
  };

  const decreaseIndex = (newDirection: number) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setDirection(newDirection);
      setIndex((prev) => (prev === 0 ? maxIndex : prev + newDirection));
    }
  };

  const onBoxClicked = ({
    movieId,
    category,
  }: {
    movieId: number;
    category: string;
  }) => {
    history(`/movies/${category}/${movieId}`);
  };

  const toggleLeaving = () => setLeaving(!leaving);

  const onOverlayClick = () => history("../");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    );

  const RuntimeCalculator = (runtime: number | undefined) => {
    if (runtime) {
      let hour = Math.floor(runtime / 60);
      let min = Math.floor(runtime % 60);

      let hourValue = hour > 0 ? hour + "시간" : "";
      let minValue = min > 0 ? min + "분" : "";

      return hourValue + minValue;
    }
  };

  const detailPage = detailData && detailData.homepage;
  return (
    <>
      <Wrap>
        <Category>
          {current === "now_playing"
            ? "Now Playing Movie"
            : current === "upcoming"
            ? "Upcoming Movie"
            : "Popular Movie"}
        </Category>

        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={direction}
        >
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
            transition={{ type: "tween", duration: 1 }}
            key={current + index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={current + movie.id}
                  key={current + movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={BoxVariants}
                  onClick={() =>
                    onBoxClicked({ movieId: movie.id, category: current })
                  }
                  transition={{ type: "tween" }}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <Arrows>
          <NavArrow
            onClick={() => {
              decreaseIndex(-1);
            }}
            style={{
              background:
                "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)",
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: 100 }} />
          </NavArrow>
          <NavArrow
            style={{
              right: 0,
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)",
            }}
            onClick={() => {
              increaseIndex(1);
            }}
          >
            <NavigateNextIcon sx={{ fontSize: 100 }} />
          </NavArrow>
        </Arrows>
      </Wrap>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BigMovie
                scrolly={scrollY.get() - 50}
                layoutId={current + bigMovieMatch.params.movieId}
              >
                {clickedMovie && (
                  <>
                    <BigCover
                      bgPhoto={makeImagePath(
                        clickedMovie.backdrop_path || clickedMovie.poster_path
                      )}
                      onClick={() => {
                        detailData?.homepage
                          ? window.open(detailPage)
                          : alert("There doesn't exist a homepage!");
                      }}
                    ></BigCover>
                    <CloseBtn onClick={onOverlayClick}>
                      <CloseOutlinedIcon
                        sx={{ fontSize: 25, fontWeight: 500 }}
                      />
                    </CloseBtn>
                    <BigTitle>{clickedMovie.title}</BigTitle>
                    <Details>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <BigRelease>
                          {detailData?.release_date.slice(0, 4)}
                        </BigRelease>
                        <BigRuntime>
                          {RuntimeCalculator(detailData?.runtime)}
                        </BigRuntime>
                      </div>
                      <BigOverView>{clickedMovie.overview}</BigOverView>
                      <BigCast>
                        <span style={{ fontSize: "15px", fontWeight: "200" }}>
                          Cast
                        </span>
                        :{" "}
                        {creditData?.cast
                          .splice(0, 3)
                          .map((prop) => prop.name + ", ")}
                      </BigCast>
                      <BigCast>
                        <span style={{ fontSize: "15px", fontWeight: "200" }}>
                          Genre
                        </span>
                        :{" "}
                        {detailData?.genres
                          .splice(0, 2)
                          .map((prop) => prop.name + ", ")}
                      </BigCast>
                    </Details>
                  </>
                )}
                <hr />
                <MovieSimilar movieId={bigMovieMatch.params.movieId} />
              </BigMovie>
            </Overlay>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

/////////////////////////////Movie//////////////////////////////////////

export function TvSlider({ current }: { current: TvCurrent }) {
  const { data } = useQuery<IGetTvResult>(["Tv", current], () =>
    getTv(current)
  );

  const { scrollY } = useScroll();
  const history = useNavigate();
  const bigTvMatch = useMatch(`/tv/show/${current}/:tvId`);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const { data: detailData } = useQuery<IGetTvDetail>(
    ["tvDetail", bigTvMatch?.params.tvId],
    () => getTvDetail(bigTvMatch?.params.tvId),
    { enabled: !!bigTvMatch?.params.tvId }
  );
  const { data: creditData } = useQuery<IGetTvCredit>(
    ["tvCredit", bigTvMatch?.params.tvId],
    () => getTvCredit(bigTvMatch?.params.tvId),
    { enabled: !!bigTvMatch?.params.tvId }
  );

  const increaseIndex = (newDirection: number) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalTv = data?.results.length - 1;
      const maxIndex = Math.floor(totalTv / offset) - 1;
      setDirection(newDirection);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + newDirection));
    }
  };

  const decreaseIndex = (newDirection: number) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalTv = data?.results.length - 1;
      const maxIndex = Math.floor(totalTv / offset) - 1;
      setDirection(newDirection);
      setIndex((prev) => (prev === 0 ? maxIndex : prev + newDirection));
    }
  };

  const onBoxClicked = ({
    tvId,
    category,
  }: {
    tvId: number;
    category: string;
  }) => {
    history(`/tv/show/${category}/${tvId}`);
  };

  const toggleLeaving = () => setLeaving(!leaving);

  const onOverlayClick = () => history("./");
  const clickedTv =
    bigTvMatch?.params.tvId &&
    data?.results.find((tv) => tv.id + "" === bigTvMatch.params.tvId);

  const detailPage = detailData && detailData.homepage;

  const RuntimeCalculator = (runtime: number | undefined) => {
    if (runtime) {
      let hour = Math.floor(runtime / 60);
      let min = Math.floor(runtime % 60);

      let hourValue = hour > 0 ? hour + "시간" : "";
      let minValue = min > 0 ? min + "분" : "";

      return hourValue + minValue;
    }
  };

  return (
    <>
      <Wrap>
        <Category>
          {current === "on_the_air"
            ? "On Air TVshows"
            : current === "popular"
            ? "Popular TVshows"
            : "Top Rated TVshows"}
        </Category>

        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={direction}
        >
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
            transition={{ type: "tween", duration: 1 }}
            key={current + index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((tv) => (
                <Box
                  layoutId={current + tv.id}
                  key={current + tv.id}
                  whileHover="hover"
                  initial="normal"
                  variants={BoxVariants}
                  onClick={() =>
                    onBoxClicked({ tvId: tv.id, category: current })
                  }
                  transition={{ type: "tween" }}
                  bgphoto={makeImagePath(
                    tv.backdrop_path || tv.poster_path,
                    "w500"
                  )}
                >
                  <Info variants={infoVariants}>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <Arrows>
          <NavArrow
            onClick={() => {
              decreaseIndex(-1);
            }}
            style={{
              background:
                "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)",
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: 100 }} />
          </NavArrow>
          <NavArrow
            style={{
              right: 0,
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)",
            }}
            onClick={() => {
              increaseIndex(1);
            }}
          >
            <NavigateNextIcon sx={{ fontSize: 100 }} />
          </NavArrow>
        </Arrows>
      </Wrap>
      <AnimatePresence>
        {bigTvMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BigMovie
                scrolly={scrollY.get()}
                layoutId={current + bigTvMatch.params.tvId}
              >
                {clickedTv && (
                  <>
                    <BigCover
                      bgPhoto={makeImagePath(
                        clickedTv.backdrop_path || clickedTv.poster_path
                      )}
                      onClick={() => {
                        detailData?.homepage
                          ? window.open(detailPage)
                          : alert("There doesn't exist a homepage!");
                      }}
                    ></BigCover>
                    <CloseBtn onClick={onOverlayClick}>
                      <CloseOutlinedIcon
                        sx={{ fontSize: 25, fontWeight: 500 }}
                      />
                    </CloseBtn>
                    <BigTitle>{clickedTv.name}</BigTitle>
                    <Details>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <BigRelease>
                          {detailData?.first_air_date} ~{" "}
                          {detailData?.next_episode_to_air
                            ? ""
                            : detailData?.last_episode_to_air.air_date}
                        </BigRelease>
                        <BigRuntime>
                          {RuntimeCalculator(detailData?.episode_run_time)}
                        </BigRuntime>
                      </div>
                      <BigOverView>{clickedTv.overview}</BigOverView>
                      <BigCast>
                        <span style={{ fontSize: "15px", fontWeight: "200" }}>
                          Number of episodes:
                        </span>{" "}
                        {detailData?.number_of_episodes}
                      </BigCast>
                      <BigCast>
                        <span style={{ fontSize: "15px", fontWeight: "200" }}>
                          Number of seasons:
                        </span>{" "}
                        {detailData?.number_of_seasons}
                      </BigCast>
                      <BigCast>
                        <span style={{ fontSize: "15px", fontWeight: "200" }}>
                          Cast
                        </span>
                        :{" "}
                        {creditData?.cast
                          .splice(0, 3)
                          .map((prop) => prop.name + ", ")}
                      </BigCast>
                      <BigCast>
                        {detailData?.genres ? (
                          <span style={{ fontSize: "15px", fontWeight: "200" }}>
                            Genre
                          </span>
                        ) : (
                          ""
                        )}
                        :{" "}
                        {detailData?.genres
                          .splice(0, 2)
                          .map((prop) => prop.name + ", ")}
                      </BigCast>
                    </Details>
                  </>
                )}
                <hr />
                <TvSimilar tvId={bigTvMatch.params.tvId} />
              </BigMovie>
            </Overlay>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
