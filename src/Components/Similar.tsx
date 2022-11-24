import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  getMovieSimilar,
  getTvSimilar,
  IGetMovieSimilar,
  IGetTvSimilar,
} from "../api";
import { makeImagePath } from "../utils";

const Wrap = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 10px;
`;

const SimilarBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SimilarImg = styled.div<{ bgPhoto: string | undefined }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
  height: 200px;
  width: auto;
  margin-top: 5px;
  display: flex;
  align-items: flex-end;
  padding: 5px;
  font-size: 20px;
  font-weight: 400;
  -webkit-text-stroke-color: #5c5c5c;
  -webkit-text-stroke-width: 0.1px;
`;

const SimilarOverView = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  height: 9.6em;
  white-space: normal;
  text-align: left;
  font-size: 15px;
  -webkit-line-clamp: 8;
  word-wrap: break-word;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-weight: 250;
`;

const SimilarYear = styled.p`
  font-size: 15px;
  font-weight: 350;
  margin: 5px 0px;
`;

const SimilarTitle = styled.h1`
  font-size: 23px;
  margin: 30px auto -25px 15px;
  font-weight: 400;
`;
/////////////style components////////////////

interface IMovieForm {
  movieId: string | undefined;
}

interface ITvForm {
  tvId: string | undefined;
}

export const MovieSimilar = ({ movieId }: IMovieForm) => {
  const { data: similarData } = useQuery<IGetMovieSimilar>(
    ["SimilarMovie", movieId],
    () => getMovieSimilar(movieId),
    {
      enabled: !!movieId,
    }
  );

  return (
    <>
      <SimilarTitle>Similar contents</SimilarTitle>
      <Wrap>
        {similarData?.results.slice(0, 6).map((props) => (
          <SimilarBox key={props.id}>
            {" "}
            <SimilarImg
              bgPhoto={makeImagePath(
                props.backdrop_path || props.poster_path,
                "w500"
              )}
            >
              {props.title}
            </SimilarImg>
            <SimilarYear>{props.release_date.slice(0, 4)}</SimilarYear>
            <SimilarOverView>{props.overview}</SimilarOverView>
          </SimilarBox>
        ))}
      </Wrap>
    </>
  );
};

export const TvSimilar = ({ tvId }: ITvForm) => {
  const { data: similarData } = useQuery<IGetTvSimilar>(
    ["SimilarTv", tvId],
    () => getTvSimilar(tvId),
    {
      enabled: !!tvId,
    }
  );

  return (
    <>
      <SimilarTitle>Similar contents</SimilarTitle>
      <Wrap>
        {similarData?.results.slice(0, 6).map((props) => (
          <SimilarBox key={"tv" + props.id}>
            {" "}
            <SimilarImg
              bgPhoto={makeImagePath(
                props.backdrop_path || props.poster_path,
                "w500"
              )}
            >
              {props.name}
            </SimilarImg>
            <SimilarYear>{props.first_air_date.slice(0, 4)}</SimilarYear>
            <SimilarOverView>{props.overview}</SimilarOverView>
          </SimilarBox>
        ))}
      </Wrap>
    </>
  );
};
