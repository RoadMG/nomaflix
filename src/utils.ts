export function makeImagePath(id: string | undefined, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}${id}`;
}

export enum MovieCurrent {
  "now_playing" = "now_playing",
  "top_rated" = "top_rated",
  "upcoming" = "upcoming",
  "popular" = "popular",
}

export enum TvCurrent {
  "on_the_air" = "on_the_air",
  "popular" = "popular",
  "top_rated" = "top_rated",
}
