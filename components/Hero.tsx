"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LaserFlow from "./LaserFlow";


const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile on client side only
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        ('ontouchstart' in window);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        height: '50vh', 
        minHeight: '400px',
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: '#060010'
      }}
    >
      {/* LaserFlow Background */}
      <LaserFlow
        className="absolute inset-0"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        dpr={isMobile ? 0.8 : 1}
        horizontalBeamOffset={0.1}
        verticalBeamOffset={0.0}
        color="#FF79C6"
        wispDensity={isMobile ? 0.5 : 1}
        fogIntensity={isMobile ? 0.3 : 0.45}
        wispIntensity={isMobile ? 3 : 5}
      />
      
      {/* Content Container */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '86%',
        height: '60%',
        backgroundColor: '#060010',
        borderRadius: '20px',
        border: '2px solid #FF79C6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        zIndex: 6
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          {/* Headline */}
          <h1 className="font-bold mb-6 leading-[1.02]">
            <span className="block text-[28px] sm:text-[40px] md:text-[64px] text-primary glow-text">
              Raees Visuals
            </span>
            <span className="block text-[28px] sm:text-[40px] md:text-[64px] text-text-primary mt-2">
              — We Make Stories Move.
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-text-primary/70 mb-12 max-w-2xl mx-auto leading-[1.5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Crafting cinematic experiences that captivate, inspire, and leave lasting
            impressions through the power of video editing.
          </motion.p>
        </motion.div>
      </div>


      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

