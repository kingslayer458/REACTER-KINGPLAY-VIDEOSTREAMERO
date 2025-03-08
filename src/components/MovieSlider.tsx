import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

interface Movie {
  id: number;
  title: string;
  image: string;
  quality: string;
}

interface MovieSliderProps {
  title: string;
  movies: Movie[];
  onMovieClick: (id: string) => void;
}

export default function MovieSlider({ title, movies, onMovieClick }: MovieSliderProps) {
  const [sliderPosition, setSliderPosition] = React.useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const autoplayRef = useRef<NodeJS.Timeout>();

  const getMaxScroll = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      return -(width * (movies.length / 3) - width);
    }
    return 0;
  };

  const slideLeft = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      const newPosition = Math.min(sliderPosition + width / 2, 0);
      setSliderPosition(newPosition);
      controls.start({ x: newPosition });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      const maxScroll = getMaxScroll();
      const newPosition = Math.max(sliderPosition - width / 2, maxScroll);
      setSliderPosition(newPosition);
      controls.start({ x: newPosition });
    }
  };

  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      if (sliderRef.current) {
        const maxScroll = getMaxScroll();
        const newPosition = sliderPosition <= maxScroll 
          ? 0 
          : sliderPosition - sliderRef.current.offsetWidth / 2;
        
        setSliderPosition(newPosition);
        controls.start({ 
          x: newPosition,
          transition: { type: "spring", stiffness: 100, damping: 20 }
        });
      }
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [sliderPosition]);

  return (
    <div className="relative group">
      <h2 className="text-2xl font-bold mb-4 text-white px-4">{title}</h2>
      
      <div className="relative overflow-hidden">
        <motion.div
          ref={sliderRef}
          animate={controls}
          initial={{ x: 0 }}
          className="flex gap-4 px-4"
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="flex-shrink-0 w-[300px] relative cursor-pointer"
              onClick={() => onMovieClick(movie.id.toString())}
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-[169px] object-cover rounded-lg"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg"
              >
                <div className="absolute bottom-0 p-4 w-full">
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-white font-semibold"
                  >
                    {movie.title}
                  </motion.h3>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="text-sm text-white/80"
                  >
                    {movie.quality}
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          onClick={slideLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white transition-opacity duration-300 hover:bg-black/70"
          style={{ display: sliderPosition === 0 ? 'none' : 'block' }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          onClick={slideRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white transition-opacity duration-300 hover:bg-black/70"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}