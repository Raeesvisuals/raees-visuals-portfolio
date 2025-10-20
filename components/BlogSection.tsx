"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import { blogPosts, blogCategories } from "@/data/blog";
import LiquidEther from "./LiquidEther";

const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <LiquidEther
          colors={["#B19EEF", "#FF9FFC", "#00FFFF"]}
          mouseForce={18}
          cursorSize={110}
          isViscous={false}
          resolution={0.4}
          autoDemo={true}
          autoSpeed={0.25}
          autoIntensity={1.8}
        />
      </div>
      
      {/* Background Effects */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-primary glow-text">Stories</span>
          </h2>
          <p className="text-lg text-text-primary/70 max-w-3xl mx-auto">
            Insights, Behind the Scenes, and Creative Highlights
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filter */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {blogCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm backdrop-blur-md border transition-all ${
                    selectedCategory === category
                      ? "bg-primary/20 border-primary text-primary font-semibold"
                      : "bg-dark-lighter/50 border-text-primary/20 text-text-primary/70 hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Tilt
                    tiltMaxAngleX={3}
                    tiltMaxAngleY={3}
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    glareColor="#00FFFF"
                    glareBorderRadius="16px"
                    scale={1.02}
                  >
                    <Link href={`/blog/${post.id}`}>
                      <motion.div
                        className="group bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-2xl overflow-hidden cursor-pointer h-full"
                        whileHover={{ borderColor: "rgba(0, 255, 255, 0.5)" }}
                      >
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-gradient-to-br from-primary/10 via-dark-lighter to-primary/5 overflow-hidden">
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/50 rounded-full text-xs text-primary font-semibold">
                            {post.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="text-xs text-text-primary/50 mb-2">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-text-primary/60 text-sm line-clamp-2">
                            {post.excerpt}
                          </p>
                          <motion.div
                            className="mt-4 flex items-center text-primary text-sm font-medium"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                          >
                            Read More
                            <svg
                              className="w-4 h-4 ml-2"
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
                          </motion.div>
                        </div>

                        {/* Glow Effect */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            boxShadow: "inset 0 0 20px rgba(0, 255, 255, 0.1)",
                          }}
                        />
                      </motion.div>
                    </Link>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            className="lg:w-80 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Recent Posts */}
            <div className="bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <motion.div
                      className="group cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <div className="text-sm text-text-primary/50 mb-1">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {blogCategories
                  .filter((cat) => cat !== "All")
                  .map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-primary/20 text-primary"
                          : "text-text-primary/70 hover:bg-primary/10 hover:text-primary"
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      {category}
                    </motion.button>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

