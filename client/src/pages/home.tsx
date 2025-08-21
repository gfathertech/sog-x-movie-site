import { useEffect, useState } from 'react'
import Search from '../components/search'
import axios from 'axios';
import * as s from "../services"
import MovieCard from '../components/MovieCard';


const Home = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<s.Movies[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
 const fetchMovies = async (search: string) => {
    try {
         const popularMovies = await axios.get(search ? `${s.URI}/search?text=${search}` : `${s.URI}/movies`)
         setMovies(popularMovies.data || [])
    } catch (error) {
        console.error(error)
        setErr(`${error}`)
    } finally{
      setLoading(false)
    }
}
fetchMovies(search)
}, [search]) 

  return (
    <div className='relative h-screen w-screen overflow-x-hidden'>
      <video className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      src="/background.mp4"
      autoPlay 
      muted 
      loop 
      playsInline 
      />
      <div className="fixed top-0 left-0 w-full h-full bg-black/70 -z-10"></div>
    <header>
  {/* My logo insertion */}
    <div className=''>
     <img className='flex mt-3 ml-3 rounded-full'
     src="/logo.jpg" 
     alt="logo"
     width={100}
      />
    </div>
    <div className='flex flex-col items-center justify-center'>
      <img
    src='/vite.svg'
    className=''
    />
    <search/>
     <h1 className=' text-green-600 text-3xl font-bold mt-3'>Stream 1000+ 
      <span className='bg-gradient-to-r from-green-500 to-blue-400
     bg-clip-text text-transparent'>Movies</span> Nonstop</h1>
    </div>
    <div className='flex items-center justify-center'>
     <Search search={search} setSearch={setSearch}/>
    </div>
    </header>
        <h1>{search}</h1>
    <section className='p-8'>
      <h2 className='text-2xl font-bold mb-6 text-center'>All Movies</h2>
      {loading ? ( <div className="text-purple-600">Loading.....</div>) : err ? (
         <div className='text-red-500'>{err}</div>): 
      (<ul className='flex flex-wrap gap-4 justify-center overflow-y-auto'>
        {Array.isArray(movies) && movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>)}
    </section>
    </div>
  )
}

export default Home