"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ProfileCard from './ProfileCard';
import LiquidEther from './LiquidEther';
import { FaEdit, FaPalette, FaMusic, FaVideo, FaMagic, FaCogs } from 'react-icons/fa';

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Software we use for video editing
  const software = [
    { name: "Adobe Premiere Pro", category: "Video Editing" },
    { name: "Adobe After Effects", category: "Motion Graphics" },
    { name: "DaVinci Resolve", category: "Color Grading" },
    { name: "Adobe Photoshop", category: "Graphic Design" },
    { name: "Blender", category: "3D Animation" },
    { name: "Audacity", category: "Audio Editing" },
  ];

  // Team members
  const teamMembers = [
    {
      name: "Raees VFX",
      role: "Lead Editor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Visual Effects Team",
      role: "VFX Specialists",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Motion Graphics",
      role: "Animation Team",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-20 px-4 overflow-hidden">
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <LiquidEther
          colors={["#7df9ff", "#ff6b9d", "#4ecdc4"]}
          mouseForce={15}
          cursorSize={100}
          isViscous={true}
          viscous={20}
          resolution={0.3}
          autoDemo={true}
          autoSpeed={0.2}
          autoIntensity={1.0}
        />
      </div>
      
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter/30 to-dark pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <ProfileCard
              name="Raees Visuals"
              title="Video Editor & Motion Graphics Designer"
              handle="raeesvisuals"
              status="Available for Projects"
              contactText="Contact"
              avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={handleContactClick}
            />
          </motion.div>

          {/* Right: About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-primary glow-text">Raees Visuals</span>
            </h2>

            <div className="space-y-6 text-text-primary/80 leading-relaxed">
              <p>
                Welcome to Raees Visuals — where every frame tells a story and every edit
                creates an experience. I&apos;m a passionate video editor specializing in
                cinematic storytelling and high-energy content creation.
              </p>

              <p>
                With years of experience in the industry, I&apos;ve worked with brands,
                influencers, and businesses to create compelling video content that
                captures attention and drives results.
              </p>

              {/* CV Section - Software We Use */}
              <div className="pt-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <FaCogs className="text-primary" />
                  Software & Tools
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {software.map((tool, index) => (
                    <div key={index} className="bg-dark-lighter/30 backdrop-blur-md border border-text-primary/10 rounded-lg p-3">
                      <div className="text-sm font-semibold text-text-primary">{tool.name}</div>
                      <div className="text-xs text-text-primary/60">{tool.category}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  What I Offer:
                </h3>
                <ul className="space-y-2 text-text-primary/70">
                  <li className="flex items-start gap-2">
                    <FaEdit className="text-primary mt-1 text-sm" />
                    <span>Professional video editing with cinematic quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaPalette className="text-primary mt-1 text-sm" />
                    <span>Color correction and grading for stunning visuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaMagic className="text-primary mt-1 text-sm" />
                    <span>Motion graphics and VFX integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaVideo className="text-primary mt-1 text-sm" />
                    <span>Fast turnaround without compromising quality</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Members Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Meet Our <span className="text-primary glow-text">Team</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-dark-lighter/30 backdrop-blur-md border border-text-primary/20 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative mb-4 w-20 h-20 mx-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="absolute inset-0 w-20 h-20 rounded-full mx-auto bg-primary/20 animate-pulse" />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-1">{member.name}</h4>
                <p className="text-text-primary/60 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

