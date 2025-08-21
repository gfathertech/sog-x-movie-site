import { useEffect, useState } from 'react';
import Search from '../components/search';
import axios from 'axios';
import * as s from "../services";
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
        const popularMovies = await axios.get(
          search ? `${s.URI}/search?text=${search}` : `${s.URI}/movies`
        );
        setMovies(popularMovies.data || []);
      } catch (error) {
        console.error(error);
        setErr(`${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies(search);
  }, [search]);

  return (
    <div className='relative min-h-screen w-full overflow-x-hidden'>
      {/* Background Video */}
      <video 
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        src="/background.mp4"
        autoPlay 
        muted 
        loop 
        playsInline 
      />
      
      {/* Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/70 -z-10"></div>
      
      {/* Header */}
      <header className="px-4 py-3 flex flex-col items-center sm:flex-row sm:justify-between">
        {/* Logo - Responsive sizing */}
        <div className='mb-4 sm:mb-0'>
          <img 
            className='rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'
            src="/logo.jpg" 
            alt="logo"
          />
        </div>
        
        {/* Search - Centered on mobile, adjusted on larger screens */}
        <div className='w-full sm:w-auto flex justify-center mb-4 sm:mb-0'>
          <Search search={search} setSearch={setSearch} />
        </div>
        
        {/* Empty div for flex spacing on larger screens */}
        <div className='hidden sm:block sm:w-20 md:w-24'></div>
      </header>
      
      {/* Hero Section */}
      <section className="text-center px-4 mt-4 mb-8">
        <div className="flex flex-col items-center">
          <img
            src='/vite.svg'
            className='w-12 h-12 mb-4'
            alt="Vite logo"
          />
          <h1 className='text-green-600 text-2xl sm:text-3xl md:text-4xl font-bold'>
            Stream 1000+{' '}
            <span className='bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent whitespace-nowrap'>
              Movies Nonstop
            </span>
          </h1>
          <p className='text-gray-300 mt-2 max-w-md mx-auto'>
            Discover the latest blockbusters and timeless classics
          </p>
        </div>
      </section>
      
      {/* Movies Section */}
      <section className='px-4 pb-8'>
        <h2 className='text-2xl font-bold mb-6 text-center text-white'>
          {search ? `Search Results for "${search}"` : 'All Movies'}
        </h2>
        
        {loading ? (
          <div className="text-purple-600 text-center">Loading.....</div>
        ) : err ? (
          <div className='text-red-500 text-center'>{err}</div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-center'>
            {Array.isArray(movies) && movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        
        {Array.isArray(movies) && movies.length === 0 && !loading && (
          <div className='text-center text-gray-400 mt-8'>
            No movies found. Try a different search.
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;