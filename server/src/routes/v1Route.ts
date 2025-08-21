import Fastify from 'fastify';
import dotenv from "dotenv";
import { getMovies, searchMovies, getMoviesById, getTrailers } from '../storage/movies.js';
import { json } from 'stream/consumers';
import axios from 'axios';
dotenv.config()

const app = Fastify();

export async function apiRoute(app:any, options:any) {
app.get("/movies", async (req: any, res: any) => {
    try {
         const movies = await getMovies();
         if (movies.status === 500) {
          return res.status(403).send(movies.result); 
         }
        return res.status(200).send(movies.result); 
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }  
})

app.get("/search", async (req: any, res: any) => {
    try {
        const query = req.query.text;
         const reply = await searchMovies(query);
                 console.dir(`This is movie search query accepted :::::::::${query}`);

         if (reply.status === 500) {
          return res.status(403).send(reply.result); 
         }
        return res.status(200).send(reply.result); 
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }  
})

app.get("/movie", async (req: any, res: any) => {
    try {
        const query = req.query.id;
         const reply = await getMoviesById(query);
                 console.dir(`This is movie By Id query accepted :::::::::${query}`);

         if (reply.status === 500) {
          return res.status(403).send(reply.result); 
         }
        return res.status(200).send(reply.result); 
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }  
})

app.get("/movie/trailer", async (req: any, res: any) => {
    try {
        const query = req.query.id;
         const reply = await getTrailers(query);
                 console.dir(`This is movie Trailer query accepted :::::::::${query}`);

         if (reply.status === 500) {
          return res.status(403).send(reply.result); 
         }
        return res.status(200).send(reply.result); 
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }  
})




}

