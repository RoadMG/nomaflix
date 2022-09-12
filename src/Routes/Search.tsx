import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, useScroll } from "framer-motion";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieCredit,
  getMovieDetail,
  getMovieSearch,
  getTvCredit,
  getTvDetail,
  getTVSearch,
  IGetMoiveDetail,
  IGetMovieCredit,
  IGetMovieSearch,
  IGetTvCredit,
  IGetTvDetail,
  IGetTVSearch,
} from "../api";
import { MovieSimilar } from "../Components/Similar";
import {
  BigCast,
  BigCover,
  BigMovie,
  BigOverView,
  BigRelease,
  BigRuntime,
  BigTitle,
  Box,
  BoxVariants,
  infoVariants,
  Category,
  CloseBtn,
  Details,
  Info,
  Overlay,
} from "../Components/Slider";
import { makeImagePath } from "../utils";
import { Loader, Wrapper } from "./Home";

const RowBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const movieMatch = useMatch(`/search/movie/:movieId`);
  const tvMatch = useMatch(`/search/tv/:tvId`);
  const { scrollY } = useScroll();
  const { data: searchMovieData, isLoading } = useQuery<IGetMovieSearch>(
    ["SearchMovie", keyword],
    () => getMovieSearch(keyword)
  );

  const { data: movieDetailData } = useQuery<IGetMoiveDetail>(
    ["SearchDetailMovie", movieMatch?.params.movieId],
    () => getMovieDetail(movieMatch?.params.movieId),
    { enabled: !!movieMatch?.params.movieId }
  );

  const { data: movieCreditData } = useQuery<IGetMovieCredit>(
    ["SearchCreditMovie", movieMatch?.params.movieId],
    () => getMovieCredit(movieMatch?.params.movieId),
    {
      enabled: !!movieMatch?.params.movieId,
    }
  );

  const { data: searchTVData } = useQuery<IGetTVSearch>(
    ["SearchTV", keyword],
    () => getTVSearch(keyword)
  );

  const { data: tvDetailData } = useQuery<IGetTvDetail>(
    ["SearchTvDetail", tvMatch?.params.tvId],
    () => getTvDetail(tvMatch?.params.tvId),
    { enabled: !!tvMatch?.params.tvId }
  );

  const onMovieBoxClicked = (movieId: number) => {
    navigate(`/search/movie/${movieId}?keyword=${keyword}`);
  };

  const { data: tvCreditData } = useQuery<IGetTvCredit>(
    ["searchTvCredit", tvMatch?.params.tvId],
    () => getTvCredit(tvMatch?.params.tvId),
    { enabled: !!tvMatch?.params.tvId }
  );

  const onTvBoxClicked = (tvId: number) => {
    navigate(`/search/tv/${tvId}?keyword=${keyword}`);
  };

  const clickedTv =
    tvMatch?.params.tvId &&
    searchTVData?.results.find((tv) => tv.id + "" === tvMatch.params.tvId);

  const onOverlayClicked = () => {
    navigate(-1);
  };

  const clickedMovie =
    movieMatch?.params.movieId &&
    searchMovieData?.results.find(
      (movie) => movie.id + "" === movieMatch.params.movieId
    );

  const runtimeCalculator = (runtime: number | undefined) => {
    if (runtime) {
      let hour = Math.floor(runtime / 60);
      let min = Math.floor(runtime % 60);

      let hourValue = hour > 0 ? hour + "시간" : "";
      let minValue = min > 0 ? min + "분" : "";

      return hourValue + minValue;
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>isLoading...</Loader>
      ) : (
        <>
          <div style={{ marginTop: "100px", padding: "50px" }}>
            <Category>Movies</Category>
            <RowBox>
              {searchMovieData?.results.map((movie) => (
                <Box
                  bgphoto={makeImagePath(
                    movie.backdrop_path || movie.poster_path,
                    "w500"
                  )}
                  key={"movie" + movie.id}
                  onClick={() => onMovieBoxClicked(movie.id)}
                  layoutId={"movie" + movie.id}
                  variants={BoxVariants}
                  whileHover="hover"
                  initial="normal"
                >
                  <Info variants={infoVariants}>
                    {" "}
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
            </RowBox>
          </div>
          <AnimatePresence>
            {movieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <BigMovie
                    scrolly={scrollY.get()}
                    layoutId={"movie" + movieMatch.params.movieId}
                  >
                    {clickedMovie && (
                      <>
                        <BigCover
                          bgPhoto={makeImagePath(
                            clickedMovie.backdrop_path ||
                              clickedMovie.poster_path
                          )}
                        ></BigCover>
                        <CloseBtn>
                          <CloseOutlinedIcon
                            sx={{ fontSize: 25, fontWeight: 500 }}
                          />
                        </CloseBtn>
                        <BigTitle>{clickedMovie.original_title}</BigTitle>
                        <Details>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <BigRelease>
                              {movieDetailData?.release_date.slice(0, 4)}
                            </BigRelease>
                            <BigRuntime>
                              {runtimeCalculator(movieDetailData?.runtime)}
                            </BigRuntime>
                          </div>
                          <BigOverView>{clickedMovie.overview}</BigOverView>
                          <BigCast>
                            <span
                              style={{ fontSize: "15px", fontWeight: "200" }}
                            >
                              Cast
                            </span>
                            :{" "}
                            {movieCreditData?.cast
                              .splice(0, 3)
                              .map((prop) => prop.name + ", ")}
                          </BigCast>
                        </Details>
                      </>
                    )}
                    <hr />
                    <MovieSimilar movieId={movieMatch.params.movieId} />
                  </BigMovie>
                </Overlay>
              </>
            ) : null}
          </AnimatePresence>
          <div style={{ padding: "50px" }}>
            <Category>TV Shows</Category>
            <RowBox>
              {searchTVData?.results.map((tv) => (
                <Box
                  bgphoto={makeImagePath(
                    tv.backdrop_path || tv.poster_path,
                    "w500"
                  )}
                  key={"tv" + tv.id}
                  onClick={() => onTvBoxClicked(tv.id)}
                  layoutId={"tv" + tv.id}
                  variants={BoxVariants}
                  whileHover="hover"
                  initial="normal"
                >
                  <Info variants={infoVariants}>
                    {" "}
                    <h4>{tv.original_name}</h4>
                  </Info>
                </Box>
              ))}
            </RowBox>
          </div>
          <AnimatePresence>
            {tvMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <BigMovie
                    scrolly={scrollY.get()}
                    layoutId={"tv" + tvMatch.params.tvId}
                  >
                    {clickedTv && (
                      <>
                        <BigCover
                          bgPhoto={makeImagePath(
                            clickedTv.backdrop_path || clickedTv.poster_path
                          )}
                        ></BigCover>
                        <CloseBtn>
                          <CloseOutlinedIcon
                            sx={{ fontSize: 25, fontWeight: 500 }}
                          />
                        </CloseBtn>
                        <BigTitle>{clickedTv.original_name}</BigTitle>
                        <Details>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <BigRelease>
                              {tvDetailData?.first_air_date} ~{" "}
                              {tvDetailData?.next_episode_to_air
                                ? ""
                                : tvDetailData?.last_episode_to_air.air_date}
                            </BigRelease>
                            <BigRuntime>
                              {runtimeCalculator(
                                tvDetailData?.episode_run_time
                              )}
                            </BigRuntime>
                          </div>
                          <BigOverView>{clickedTv.overview}</BigOverView>
                          <BigCast>
                            <span
                              style={{ fontSize: "15px", fontWeight: "200" }}
                            >
                              Cast
                            </span>
                            :{" "}
                            {tvCreditData?.cast
                              .splice(0, 3)
                              .map((prop) => prop.name + ", ")}
                          </BigCast>
                        </Details>
                      </>
                    )}
                    <hr />
                    <MovieSimilar movieId={tvMatch.params.tvId} />
                  </BigMovie>
                </Overlay>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Search;
