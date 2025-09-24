import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiVolumeX, FiVolume2, FiX } from 'react-icons/fi';
import { FaImdb, FaYoutube } from 'react-icons/fa';
import * as s from "../services.ts"


const MovieId: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<s.Movies | null>(null);
  const [videos, setVideos] = useState<s.Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<s.Video | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'trailers' | 'teasers' | 'featurettes'>('trailers');

  // Fetch movie details
  const getMovieById = async (id: string) => {
    try {
      const response = await s.api.get(`/movie?id=${id}`);
      setMovie(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };
  // Fetch videos
  const getMovieVideos = async (id: string) => {
    try {
      const res = await s.api.get(`/movie/trailer?id=${id}`);
      const data = res.data.results;
      setVideos(data);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([getMovieById(id), getMovieVideos(id)])
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Filter videos by type
  const filteredVideos = videos.filter(video => {
    if (activeTab === 'trailers') return video.type === 'Trailer';
    if (activeTab === 'teasers') return video.type === 'Teaser';
    if (activeTab === 'featurettes') return ['Featurette', 'Behind the Scenes', 'Clip'].includes(video.type);
    return false;
  });
  // Play video in modal
  const playVideo = (video: s.Video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center flex-col">
        <div className="text-red-500 text-2xl mb-4">{error || 'Network Error'}</div>
        <Link to="/" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
          Go Back Home
        </Link>
      </div>
    );
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <Link to="/" className="flex items-center text-white hover:text-gray-300 transition">
          <FiArrowLeft className="mr-2" /> Back to Browse
        </Link>
        <h1 className="text-xl font-bold">SOG-X</h1>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-24">
        <div className="max-w-4xl">
          {/* Title and Basic Info */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-2 py-1 bg-green-600 rounded text-sm font-semibold">
              {movie.status}
            </span>
            <span className="text-lg">{new Date(movie.release_date).getFullYear()}</span>
            <span className="text-lg">{formatRuntime(movie.runtime)}</span>
            <span className="flex items-center">
              <FaImdb className="text-yellow-400 mr-1 text-2xl" />
              <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
            </span>
          </div>

          {/* Tagline */}
          {movie.tagline && (
            <p className="text-xl italic text-gray-300 mb-6">Tagline "{movie.tagline}"</p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8 py-3 rounded-md font-medium transition">
            {videos.length > 0 && (
              <button 
                className="flex items-center bg-red-600 hover:bg-red-700 px-6 "
                onClick={() => playVideo(videos.find(v => v.type === 'Trailer') || videos[0])}
              >
                <FiPlay className="mr-2 text-xl" /> Play Trailer
              </button>
            )}
            <button 
              className="flex items-center bg-gray-700 hover:bg-gray-600 px-4"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <FiVolumeX className="mr-2" /> : <FiVolume2 className="mr-2" />}
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </div>

          {/* Overview */}
          <p className="text-lg max-w-2xl mb-8 leading-relaxed">{movie.overview}</p>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <p><span className="text-gray-400">Original Title:</span> {movie.original_title}</p>
              <p><span className="text-gray-400">Language:</span> {movie.original_language.toUpperCase()}</p>
              <p><span className="text-gray-400">Budget:</span> ${movie.budget.toLocaleString()}</p>
              <p><span className="text-gray-400">Revenue:</span> ${movie.revenue.toLocaleString()}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold mt-4 mb-2">Production</h3>
              <div className="flex flex-wrap gap-2">
                {movie.production_companies.map(company => (
                  <span key={company.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {company.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Videos Section */}
          {videos.length > 0 && (
            <div className="mb-12">
              <div className="flex border-b border-gray-700 mb-6 justify-evenly">
                <button
                  className={`pb-2 px-4 font-medium ${activeTab === 'trailers' ? 'border-b-2 border-red-600 text-white' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('trailers')}
                >
                  Trailers
                </button>
                <button
                  className={`pb-2 px-4 font-medium ${activeTab === 'teasers' ? 'border-b-2 border-red-600 text-white' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('teasers')}
                >
                  Teasers
                </button>
                <button
                  className={`pb-2 px-4 font-medium ${activeTab === 'featurettes' ? 'border-b-2 border-red-600 text-white' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('featurettes')}
                >
                  Featurettes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <div 
                    key={video.id} 
                    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => playVideo(video)}
                  >
                    <div className="relative">
                      <img 
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} 
                        alt={video.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="bg-red-600 rounded-full p-3">
                          <FiPlay className="text-xl" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs">
                        {video.type}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm mb-1 line-clamp-1">{video.name}</h4>
                      <div className="flex items-center text-gray-400 text-xs">
                        <FaYoutube className="mr-1 text-red-500" />
                        <span>YouTube</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(video.published_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full  max-w-4xl">
            <button 
              className="absolute w-5 right-0 text-white text-2xl hover:text-gray-300 z-10"
              onClick={() => setShowVideoModal(false)}
            >
              <FiX className='flex mr-6 justify-center items-center'/>
            </button>
            <div className="relative pt-[56.25%]"> 
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
                className="absolute inset-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 text-white">
              <h3 className="text-xl font-bold">{selectedVideo.name}</h3>
              <p className="text-gray-400">{selectedVideo.type} • {new Date(selectedVideo.published_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieId;
