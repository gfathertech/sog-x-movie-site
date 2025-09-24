import { useEffect, useState } from 'react'
import Search from '../components/search'
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
         const popularMovies = await s.api.get(search ? `/search?text=${search}` : `/movies`)
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
    
    <header className="px-4 py-3">
      {/* My logo insertion - responsive sizing */}
      <div className=''>
        <img className='flex mt-3 ml-3 rounded-full w-16 sm:w-20 md:w-24 lg:w-28'
        src="/logo.jpg" 
        alt="logo"
        />
      </div>
      
      <div className='flex flex-col items-center justify-center mt-4'>
        <img
        src='/favicon.png'
        className='w-20'
        />
        
        {/* Fixed text wrapping and responsive font sizes */}
        <h1 className='text-green-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-3 text-center px-4'>
          <span className="whitespace-nowrap">Stream 1000+</span>{' '}
          <span className='bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent whitespace-nowrap'>
            Movies
          </span>{' '}
          <span className="whitespace-nowrap">Nonstop</span>
        </h1>
          <search/>
      </div>
      
      <div className='flex items-center justify-center mt-6'>
        <Search search={search} setSearch={setSearch}/>
      </div>
    </header>
    
    <h1 className="text-center text-white">{search}</h1>
    
    <section className='p-4 sm:p-6 md:p-8'>
      <h2 className='text-xl sm:text-2xl font-bold mb-6 text-center text-white'>All Movies</h2>
      {loading ? ( 
        <div className="text-purple-600 text-center">Loading.....</div>
      ) : err ? (
        <div className='text-red-500 text-center'>{err}</div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center'>
          {Array.isArray(movies) && movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
    </div>
  )
}

export default Home
