export interface Movie {
  id: string;
  title: string;
  genre: string;
  production: string;
  directior: string;
  duration: string;
  adult: boolean;
  original_language: string;
  subtitles: string[];
  releaseDate: string;
  ratings: {
    rated_by: number;
    value: number;
  }[];
  overview: string;
  cover_photo: string;
  trailer: string;
  gallery: string[];
  actors: { photo: string; real_name: string; movie_name: string }[];
}
