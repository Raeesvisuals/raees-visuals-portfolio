"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { FiPlay } from 'react-icons/fi';

const IntroVideoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Left Side - Text and Actions */}
          <div className="flex-1 text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Bringing Ideas to Life
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
              With years of experience in creative visual design and video editing, I transform concepts into captivating visual stories that resonate with audiences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => setIsOpen(true)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <FiPlay className="text-white text-sm ml-0.5" />
                  </div>
                  <span className="text-white font-semibold text-lg">Watch Story</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/30 rounded-lg overflow-hidden text-white font-semibold text-lg"
                whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>

          {/* Right Side - Video Player */}
          <div className="flex-1 relative">
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative w-full aspect-video bg-dark-lighter rounded-2xl overflow-hidden border border-primary/30 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Video Placeholder Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-dark-lighter to-primary/10" />
              
              {/* Central Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md border-2 border-primary flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(0, 255, 255, 0.4)",
                      "0 0 0 20px rgba(0, 255, 255, 0)",
                      "0 0 0 0 rgba(0, 255, 255, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FiPlay className="text-primary text-3xl ml-1" />
                </motion.div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              {/* Modal Content */}
              <motion.div
                className="relative z-10 w-full max-w-5xl"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center bg-primary/10 backdrop-blur-md border border-primary/50 rounded-full text-primary hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-xl" />
                </motion.button>

                {/* Video Container */}
                <div className="relative aspect-video bg-dark-lighter rounded-2xl overflow-hidden border border-primary/30">
                  {/* Placeholder for video */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-dark-lighter to-primary/5">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary flex items-center justify-center">
                        <FiPlay className="text-primary text-4xl ml-1" />
                      </div>
                      <p className="text-text-primary/70">Intro Video Placeholder</p>
                      <p className="text-text-primary/50 text-sm mt-2">
                        Replace with your intro video
                      </p>
                    </div>
                  </div>

                  {/* Uncomment when you have a real video */}
                  {/* <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    src="/placeholders/intro-video.mp4"
                  >
                    Your browser does not support the video tag.
                  </video> */}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default IntroVideoModal;

