import React, { useState, useEffect } from 'react';
import { Play, Search, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieDetails from './components/MovieDetails';
import MovieSlider from './components/MovieSlider';
import Preloader from './components/Preloader';
import SearchOverlay from './components/SearchOverlay';
import CategoryFilter from './components/CategoryFilter';
// Import all movie images
import piratesImage from './assets/images/posters/pirates.jpeg';
import fantasticBeastsImage from './assets/images/posters/fantastic-beasts.jpg';
import interstellarImage from './assets/images/posters/interstellar.jpg';
import spiderVerseImage from './assets/images/posters/spider-verse.jpg';
import passengersImage from './assets/images/posters/passengers.jpeg';
import ironManImage from './assets/images/posters/iron-man.jpg';
import topGunImage from './assets/images/posters/top-gun.jpg';
import laLaLandImage from './assets/images/posters/la-la-land.jpg';
import trainToBusanImage from './assets/images/posters/train-to-busan.jpeg';
// Import banner images
import piratesBanner from './assets/images/banners/pirates-banner.jpg';
import fantasticBeastsBanner from './assets/images/banners/fantastic-beasts-banner.jpg';
import interstellarBanner from './assets/images/banners/interstellar-banner.jpg';
import spiderVerseBanner from './assets/images/banners/spider-verse-banner.jpg';
import passengersBanner from './assets/images/banners/passengers-banner.jpg';
import ironManBanner from './assets/images/banners/iron-man-banner.jpg';
import topGunBanner from './assets/images/banners/top-gun-banner.jpg';
import laLaLandBanner from './assets/images/banners/la-la-land-banner.jpg';
import trainToBusanBanner from './assets/images/banners/train-to-busan-banner.jpg';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const movies = [
    {
      id: 1,
      title: "Pirates of the Caribbean: Salazar's Revenge",
      image: piratesImage,
      bannerImage: piratesBanner,
      quality: "HD",
      rating: "8.2",
      year: "2017",
      duration: "87min",
      language: "English",
      description: "Captain Jack Sparrow is pursued by old rival Captain Salazar and a crew of deadly ghosts who have escaped from the Devil's Triangle. They're determined to kill every pirate at sea...notably Jack.",
      categories: ["Horror", "Mystery", "Thriller"],
      trailerUrl: "https://www.youtube.com/watch?v=ZgQkEf3dQ08",
      videoUrl: "https://d1zdgfr6aj3r34.cloudfront.net/poc.mkv"
    },
    {
      id: 2,
      title: "Fantastic Beasts: The Secrets of Dumbledore",
      image: fantasticBeastsImage,
      bannerImage: fantasticBeastsBanner,
      quality: "HD",
      rating: "6.2",
      year: "2022",
      duration: "142min",
      language: "English",
      description: "Professor Albus Dumbledore must assist Newt Scamander and his partners as Grindelwald begins to lead an army to eliminate all Muggles.",
      categories: ["Adventure", "Family", "Fantasy"],
      trailerUrl: "https://youtu.be/Y9dr2zw-TXQ",
      videoUrl: "https://d2z9ebr6c1y2ty.cloudfront.net/test2.mkv"
    },
    {
      id: 3,
      title: "Interstellar",
      image: interstellarImage,
      bannerImage: interstellarBanner,
      quality: "HD",
      rating: "8.7",
      year: "2014",
      duration: "169min",
      language: "English",
      description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
      categories: ["Adventure", "Drama", "Sci-Fi"],
      trailerUrl: "https://youtu.be/zSWdZVtXT7E",
      videoUrl: "https://d2chprohawh2ca.cloudfront.net/test3.mkv"
    },
    {
      id: 4,
      title: "Spider-Man: Into the Spider-Verse",
      image: spiderVerseImage,
      bannerImage: spiderVerseBanner,
      quality: "HD",
      rating: "8.4",
      year: "2018",
      duration: "117min",
      language: "English",
      description: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
      categories: ["Adventure", "Animation", "Action"],
      trailerUrl: "https://youtu.be/ii3n7hYQOl4",
      videoUrl: "https://d1p4wl39ahdegl.cloudfront.net/test4.mkv"
    },
    {
      id: 5,
      title: "Passengers",
      image: passengersImage,
      bannerImage: passengersBanner,
      quality: "HD",
      rating: "7.0",
      year: "2017",
      duration: "116min",
      language: "English",
      description: "A malfunction in a sleeping pod on a spacecraft traveling to a distant colony planet wakes one passenger 90 years early.",
      categories: ["Drama", "Romance", "Sci-Fi"],
      trailerUrl: "https://youtu.be/7BWWWQzTpNU",
      videoUrl: "https://d1ejdy54omqqjw.cloudfront.net/test5.mkv"
    },
    {
      id: 6,
      title: "Iron Man 3",
      image: ironManImage,
      bannerImage: ironManBanner,
      quality: "Full HD",
      rating: "7.1",
      year: "2013",
      duration: "130min",
      language: "English",
      description: "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.",
      categories: ["Action", "Adventure", "Sci-Fi"],
      trailerUrl: "https://youtu.be/Ke1Y3P9D0Bc",
      videoUrl: "https://d3c6gmzdxe2rvf.cloudfront.net/test6.mkv"
    },
    {
      id: 7,
      title: "Top Gun: Maverick",
      image: topGunImage,
      bannerImage: topGunBanner,
      quality: "Full HD",
      rating: "8.2",
      year: "2022",
      duration: "130min",
      language: "English",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
      categories: ["Action", "Drama"],
      trailerUrl: "https://youtu.be/giXco2jaZ_4",
      videoUrl: "https://d2d34czvcj3dm0.cloudfront.net/test7.mkv"
    },
    {
      id: 8,
      title: "La La Land",
      image: laLaLandImage,
      bannerImage: laLaLandBanner,
      quality: "Full HD",
      rating: "8.0",
      year: "2016",
      duration: "128min",
      language: "English",
      description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
      categories: ["Comedy", "Drama", "Music"],
      trailerUrl: "https://youtu.be/0pdqf4P9MB8",
      videoUrl: "https://d1rf67sczoz55m.cloudfront.net/test8.mkv"
    },
    {
      id: 9,
      title: "Train to Busan",
      image: trainToBusanImage,
      bannerImage: trainToBusanBanner,
      quality: "Full HD",
      rating: "7.6",
      year: "2016",
      duration: "118min",
      language: "English",
      description: "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
      categories: ["Action", "Horror", "Thriller"],
      trailerUrl: "https://youtu.be/1ovgxN2VWNc",
      videoUrl: "https://d3tnc0g5s3bgvx.cloudfront.net/test9.mkv"
    }
  ];

  const allCategories = Array.from(
    new Set(movies.flatMap(movie => movie.categories))
  );

  const filteredMovies = selectedCategory === 'All'
    ? movies
    : movies.filter(movie => movie.categories.includes(selectedCategory));

  if (isLoading) {
    return <Preloader />;
  }

  if (selectedMovie) {
    const movie = movies.find(m => m.id === parseInt(selectedMovie));
    if (movie) {
      return <MovieDetails movie={movie} onClose={() => setSelectedMovie(null)} />;
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <nav className={`fixed w-full z-50 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>KingPlay</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`}>Home</a>
                <a href="#movies" className={`px-3 py-2 rounded-md text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`}>Movies</a>
                <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`}>TV Shows</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                <Search className="h-5 w-5" />
                <span className="hidden md:inline">Search movies...</span>
              </motion.button>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          src="https://dpraeabp1kcfq.cloudfront.net/Top 25 Most Badass Superhero Scenes in Movies.mp4"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to KingPlay
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Stream your favorite movies and TV shows in high quality
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-red-700 transition-colors"
            >
              Start Watching
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-gradient-to-b from-black to-transparent">
        <MovieSlider
          title="Featured Movies"
          movies={movies}
          onMovieClick={setSelectedMovie}
        />
      </div>

      <CategoryFilter
        categories={allCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <section id="movies" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {selectedCategory === 'All' ? 'Trending Now' : selectedCategory + ' Movies'}
        </h2>
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ y: -5 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden shadow-lg cursor-pointer group`}
              onClick={() => setSelectedMovie(movie.id.toString())}
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded">
                  {movie.quality}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                >
                  <div className="absolute bottom-4 left-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="flex gap-2"
                    >
                      {movie.categories.map((category, index) => (
                        <span
                          key={index}
                          className="bg-red-600/80 text-white text-sm px-2 py-1 rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {movie.title}
                </h3>
                <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} gap-4`}>
                  <span>⭐ {movie.rating}</span>
                  <span>{movie.year}</span>
                  <span>{movie.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>KingPlay</span>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2024 KingPlay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        movies={movies}
        onMovieClick={setSelectedMovie}
      />
    </div>
  );
}

export default App;