export interface Movies {
  id: number;
  title: string;
  overview:string;
  poster_path:string;
  backdrop_path:string;
  original_language:string;
  release_date:string;
}

export interface MovieResponse {
  status: number;
  result: Movies[] | string;
}