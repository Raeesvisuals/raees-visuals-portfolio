"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassIcons from './GlassIcons';
import ElectricBorder from './ElectricBorder';
import { FiVideo, FiFilm, FiEdit3, FiTrendingUp, FiAward, FiZap } from 'react-icons/fi';

const ServicesSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const services = [
    { icon: <FiVideo />, color: 'cyan', label: 'Video Editing' },
    { icon: <FiFilm />, color: 'purple', label: 'Color Grading' },
    { icon: <FiEdit3 />, color: 'blue', label: 'Motion Graphics' },
    { icon: <FiTrendingUp />, color: 'green', label: 'Social Media' },
    { icon: <FiAward />, color: 'orange', label: 'Brand Videos' },
    { icon: <FiZap />, color: 'red', label: 'Fast Delivery' },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter/30 to-dark pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Our <span className="text-primary glow-text">Services</span>
          </h2>
          <p className="text-lg text-text-primary/70 max-w-3xl mx-auto">
            Professional video editing services tailored to bring your vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassIcons items={services} className="max-w-6xl mx-auto" />
        </motion.div>

        {/* Featured Service Card */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ElectricBorder
            color="#00FFFF"
            speed={1}
            chaos={0.5}
            thickness={2}
            style={{ borderRadius: 16 }}
          >
            <div className="bg-dark-lighter/50 backdrop-blur-md p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Premium Video Editing
              </h3>
              <p className="text-text-primary/70 mb-6">
                From cinematic storytelling to high-energy social media content, we deliver
                professional video editing that captures attention and drives results.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-text-primary/60">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Color Correction & Grading
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Motion Graphics & VFX
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Sound Design & Mixing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Fast Turnaround Time
                </li>
              </ul>
            </div>
          </ElectricBorder>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

