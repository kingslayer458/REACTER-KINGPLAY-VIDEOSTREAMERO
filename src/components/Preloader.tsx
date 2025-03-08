import React from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1.2, 1, 1],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="w-24 h-24 mb-8 bg-red-600"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <motion.h2 
            className="text-2xl font-bold text-white"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Loading KingPlay
          </motion.h2>
          
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-red-600 rounded-full"
                animate={{
                  y: ["0%", "-50%", "0%"],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}