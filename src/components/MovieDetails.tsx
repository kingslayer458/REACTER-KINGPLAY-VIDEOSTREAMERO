import React, { useState, useEffect } from 'react';
import { Play, Home, Star, X, Server, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Preloader from './Preloader';

interface Movie {
  id: number;
  title: string;
  bannerImage: string;
  quality: string;
  rating: string;
  year: string;
  duration: string;
  language: string;
  description: string;
  categories: string[];
  trailerUrl: string;
  videoUrl: string;
}

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const downloadOptions = [
    {
      server: 1,
      quality: "480p",
      language: movie.language,
      url: movie.videoUrl
    },
    {
      server: 2,
      quality: "720p",
      language: movie.language,
      url: movie.videoUrl
    },
    {
      server: 3,
      quality: "1080p",
      language: movie.language,
      url: movie.videoUrl
    }
  ];

  const scrollToDownload = () => {
    const downloadSection = document.getElementById('download-section');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClose = () => {
    // Target the movie banner instead of the download section
    const movieBannerSection = document.querySelector('.movie-banner');
    if (movieBannerSection) {
      movieBannerSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(onClose, 500);
    } else {
      onClose();
    }
  };

  const handlePlayClick = () => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      setIsVideoPlaying(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {isLoading && <Preloader />}
      
      {/* Movie Banner */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <img 
            src={movie.bannerImage}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-end p-8">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                <span className="bg-red-600 px-2 py-1 rounded">{movie.quality}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{movie.rating}</span>
                </div>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="bg-gray-800/50 px-2 py-1 rounded">{movie.language}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayClick}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full"
                >
                  <Play className="w-5 h-5" />
                  Watch Now
                </motion.button>
                
                <motion.a
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full"
                >
                  Watch Trailer
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToDownload}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
                >
                  <Download className="w-5 h-5" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">About the Movie</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {movie.categories.map((category, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>

          <div id="download-section">
            <h3 className="text-xl font-bold mb-6 dark:text-white">Download Options</h3>
            <div className="space-y-6">
              {downloadOptions.map((option) => (
                <motion.div
                  key={option.server}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Server className="w-5 h-5" />
                      <span className="font-medium">Server {option.server}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-gray-600 dark:text-gray-400">{option.language}</span>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                        {option.quality}
                      </span>
                    </div>
                  </div>
                  <a
                    href={option.url}
                    download
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 text-center font-medium flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-6xl aspect-video">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-500"
            >
              Close
            </button>
            <video
              controls
              className="w-full h-full rounded-lg"
              autoPlay
            >
              <source src={movie.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      )}

      {/* Close Button */}
      <motion.button
        onClick={handleClose}
        whileHover={{ scale: 1.1 }}
        className="fixed top-4 right-4 z-50 bg-white/10 hover:bg-white/20 p-2 rounded-full"
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      {/* Back to Home */}
      <motion.button
        onClick={handleClose}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg"
      >
        <Home className="w-6 h-6" />
      </motion.button>
    </div>
  );
}