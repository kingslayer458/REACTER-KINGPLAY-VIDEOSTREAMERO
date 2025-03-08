import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  image: string;
  quality: string;
  year: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onMovieClick: (id: string) => void;
}

export default function SearchOverlay({ isOpen, onClose, movies, onMovieClick }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm"
        >
          <div className="max-w-4xl mx-auto pt-24 px-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white pl-14 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
                autoFocus
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.div 
              layout
              className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {filteredMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer group"
                  onClick={() => {
                    onMovieClick(movie.id.toString());
                    onClose();
                  }}
                >
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full aspect-[16/9] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 p-4">
                        <h3 className="text-white font-semibold">{movie.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span>{movie.year}</span>
                          <span className="bg-red-600 px-2 py-0.5 rounded">
                            {movie.quality}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredMovies.length === 0 && searchTerm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 mt-12"
              >
                <p className="text-xl">No movies found matching "{searchTerm}"</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}