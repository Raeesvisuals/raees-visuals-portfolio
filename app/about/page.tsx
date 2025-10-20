"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-[calc(100vh-8rem)] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            About <span className="text-primary glow-text">Us</span>
          </h1>
          <div className="space-y-6 text-text-primary/80 text-lg leading-relaxed">
            <p>
              Raees Studio is a creative video editing studio dedicated to bringing your
              vision to life through the art of cinematic storytelling.
            </p>
            <p>
              With years of experience in the industry, we specialize in creating
              high-quality video content that captivates audiences and delivers results.
            </p>
            <p>
              Our passion for visual storytelling drives us to push creative boundaries
              and deliver exceptional work for every project.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

