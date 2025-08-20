import React from 'react'
import * as s from "../services"
import { BsDot } from 'react-icons/bs'
import { BsStarFill } from 'react-icons/bs'
import { BiPlay } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const MovieCard:React.FC<{movie: s.Movies}>  = ({movie}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className='movie-card w-48 space-y-1 justify-center items-center'>
      <img 
       src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` :
      '/no-poster.jpg'}
        alt="image"
        />   
       <p>{movie.title}</p>

      <div className='flex items-center'>        
       <BsStarFill className='text-yellow-500 mr-1'/> 
       <p>{movie.vote_average ? movie.vote_average.toFixed(1): 'N/A'}</p>
        <BsDot/>
       <p className='first-letter:uppercase'>{movie.original_language}</p>

       <BsDot className='font-semibold'/>
       <p>{movie.release_date.split('-')[0]}</p>
      </div>
      <div className='flex p-2 bg-slate-500 rounded-md justify-center items-center'onClick={handleClick}>
        <BiPlay className='text-2xl'/>
        <p>Watch</p>
      </div>
    </div>
  )
}

export default MovieCard
