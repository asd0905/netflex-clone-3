export const API_KEY = "80f770ab394bc4a45cdcf0d5a157354e";
export const BASE_PATH = `https://api.themoviedb.org/3`;
export const NOW_PLAYING_MOVIE = `${BASE_PATH}/movie/now_playing`;

export interface IMovieApiProps extends Record<string, string> {
	language: string;
	region: string;
	page: string;
	api_key: string;
}

export interface IGetMoviesResult {
	dates: IDates;
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export interface IDates {
	maximum: string;
	minimum: string;
}

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export const getMovies = async () => {
	const paramsObj = {
		language: "en-US",
		region: "kr",
		page: "1",
		api_key: API_KEY,
	};
	return await (
		await fetch(
			`${NOW_PLAYING_MOVIE}?${new URLSearchParams(paramsObj).toString()}`
		)
	).json();
};
