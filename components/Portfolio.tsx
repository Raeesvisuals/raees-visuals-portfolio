"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { portfolioData, categories } from "@/data/portfolio";
import VideoModal from "./VideoModal";
import { FaPlay } from "react-icons/fa";
import LiquidEther from "./LiquidEther";

interface PortfolioProps {
  isHomepage?: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ isHomepage = false }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(9); // For portfolio page pagination (9 initially)
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    isYouTube?: boolean;
    youtubeId?: string;
  } | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory);

  // Reset visible items when category changes (only for portfolio page)
  useEffect(() => {
    if (!isHomepage) {
      setVisibleItems(9);
    }
  }, [activeCategory, isHomepage]);

  // Display logic based on page type
  const displayedProjects = isHomepage 
    ? filteredProjects.slice(0, 8) // Homepage: show 8 items
    : filteredProjects.slice(0, visibleItems); // Portfolio page: show based on visibleItems

  const hasMoreProjects = isHomepage 
    ? filteredProjects.length > 8 // Homepage: has more if total > 8
    : visibleItems < filteredProjects.length; // Portfolio page: has more if visible < total

  // Function to load more items (portfolio page only)
  const loadMoreItems = () => {
    if (!isHomepage) {
      setVisibleItems(prev => Math.min(prev + 3, filteredProjects.length));
    }
  };

  return (
    <section id="portfolio" className="relative py-20 px-4 overflow-hidden">
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <LiquidEther
          colors={["#00FFFF", "#FF9FFC", "#5227FF"]}
          mouseForce={15}
          cursorSize={100}
          isViscous={true}
          viscous={20}
          resolution={0.4}
          autoDemo={true}
          autoSpeed={0.2}
          autoIntensity={1.2}
        />
      </div>
      
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter/50 to-dark pointer-events-none" />
      
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Our <span className="text-primary glow-text">Work</span>
          </h2>
          <p className="text-lg text-text-primary/70 max-w-3xl mx-auto">
            Every Frame, A Story — Explore Our Creative Universe
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full backdrop-blur-md border transition-all ${
                activeCategory === category
                  ? "bg-primary/20 border-primary text-primary font-semibold glow-border"
                  : "bg-dark-lighter/50 border-text-primary/20 text-text-primary/70 hover:border-primary/50 hover:text-text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  glareEnable={true}
                  glareMaxOpacity={0.3}
                  glareColor="#00FFFF"
                  glareBorderRadius="16px"
                  scale={1.02}
                >
                  <motion.div
                    className="group relative bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-2xl overflow-hidden cursor-pointer"
                    whileHover={{ borderColor: "rgba(0, 255, 255, 0.5)" }}
                    onClick={() => setSelectedVideo({
                      src: project.video,
                      isYouTube: project.isYouTube,
                      youtubeId: project.youtubeId,
                    })}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-dark-lighter overflow-hidden">
                      {/* Display actual thumbnail if available, otherwise gradient */}
                      {project.thumbnail && !project.thumbnail.includes('placeholder') ? (
                        <Image 
                          src={project.thumbnail} 
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark-lighter to-primary/5" />
                      )}
                      
                      {/* Overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-16 h-16 rounded-full bg-primary/30 backdrop-blur-md border border-primary flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FaPlay className="text-primary text-xl ml-1" />
                        </motion.div>
                      </motion.div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/50 rounded-full text-xs text-primary font-semibold">
                        {project.category}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-primary/60 text-sm">{project.type}</p>
                    </div>

                    {/* Glow Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        boxShadow: "inset 0 0 20px rgba(0, 255, 255, 0.2)",
                      }}
                    />
                  </motion.div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show More Button */}
        {hasMoreProjects && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isHomepage ? (
              // Homepage: Link to portfolio page
              <motion.a
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 backdrop-blur-md border border-primary/50 rounded-lg text-primary font-semibold hover:bg-primary/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More Projects
                <svg
                  className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            ) : (
              // Portfolio page: Load more items (3 at a time)
              <motion.button
                onClick={loadMoreItems}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 backdrop-blur-md border border-primary/50 rounded-lg text-primary font-semibold hover:bg-primary/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More Projects
                <svg
                  className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative p-12 bg-dark-lighter/30 backdrop-blur-md border border-primary/20 rounded-3xl overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
                Do you have a specific video style in mind?
              </h3>
              <p className="text-text-primary/70 mb-8 max-w-2xl mx-auto">
                Let&apos;s talk about your vision and create something extraordinary together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => {
                    const element = document.getElementById("contact");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative px-8 py-4 bg-primary/10 backdrop-blur-md border border-primary/50 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-primary font-semibold">
                    Get a Quote
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-primary/20 glow-border"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-dark-lighter/50 backdrop-blur-md border border-text-primary/20 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05, borderColor: "rgba(0, 255, 255, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-text-primary font-semibold">
                    View on Twitter/X
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoSrc={selectedVideo?.src || ""}
        isYouTube={selectedVideo?.isYouTube}
        youtubeId={selectedVideo?.youtubeId}
      />
    </section>
  );
};

export default Portfolio;

