import axios from "axios";
import dotenv from "dotenv";
dotenv.config()
import type { MovieResponse, Movies } from "../models/moviesModel.js";

const tmdbApiKey = process.env.TMDB_API;
        if (!tmdbApiKey) {
            throw new Error("API key for TMDB is missing.");
        }

const URL = 'https://api.themoviedb.org/3';

const tmdbClient = axios.create({
    baseURL: URL,
    headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${tmdbApiKey}`
        }
});

export const getMovies = async (): Promise<MovieResponse> => {
    try {
        const response = await tmdbClient.get('/discover/movie?sort_by=popularity.desc');

        console.log(response)
        const movies = await response.data.results; // Extract the movie list

        console.info(`Successfully fetched ${movies.length} movies`);
        console.log(`Successfully fetched ${movies} movies`);

        return {
            status: response.status, 
            result: movies
        };

    } catch (error:any) {
        console.error(`Error while fetching movies: ${error.message || error}`);

        return {
            status: 500, 
            result: "Failed to fetch movies ba" 
        };
    }
};

export const searchMovies = async (
    query: string
): Promise<MovieResponse> => {
    try {
        const response = await tmdbClient.get(`/search/movie?query=${query}`);

        console.log(response)
        const res = await response.data.results; 

        return {
            status: response.status, 
            result: res
        };

    } catch (error:any) {
        console.error(`Error while fetching movies: ${error.message || error}`);

        return {
            status: 500, 
            result: "Failed to fetch movies search" 
        };
    }
};

export const getMoviesById = async (
    id: number
): Promise<MovieResponse> => {
    try {
        const response = await tmdbClient.get(`/movie/${id}`);

        console.log(response)
        const res = await response.data

        return {
            status: response.status, 
            result: res
        };

    } catch (error:any) {
        console.error(`Error while fetching movies: ${error.message || error}`);

        return {
            status: 500, 
            result: `Failed to fetch movies id ${error} `
        };
    }
};

export const getTrailers = async (
    id: number
): Promise<MovieResponse> => {
    try {
        const response = await tmdbClient.get(`/movie/${id}/videos`);

        console.log(response)
        const res = await response.data

        return {
            status: response.status, 
            result: res
        };

    } catch (error:any) {
        console.error(`Error while fetching movies: ${error.message || error}`);

        return {
            status: 500, 
            result: `Failed to fetch movies Trailers ${error} `
        };
    }
};

