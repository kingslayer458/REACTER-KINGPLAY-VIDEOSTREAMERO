import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-8">
      <motion.div 
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory('All')}
          className={`px-6 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === 'All'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All Movies
        </motion.button>
        
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(category)}
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}