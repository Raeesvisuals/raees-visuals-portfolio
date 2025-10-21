"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import LiquidEther from '@/components/LiquidEther';
import ProfileCard from '@/components/ProfileCard';
import { FaEdit, FaPalette, FaVideo, FaMagic, FaCogs } from 'react-icons/fa';
import { getAboutContent } from '@/data/about';

// Updated to use dynamic content from admin panel
export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const aboutData = getAboutContent();

  const handleContactClick = () => {
    // Open Instagram profile
    window.open('https://instagram.com/raeesvisuals', '_blank');
  };


  // Icon mapping for services
  const iconMap = {
    FaEdit,
    FaPalette,
    FaMagic,
    FaVideo,
  } as const;

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <section ref={sectionRef} className="relative min-h-screen py-20 px-4 overflow-hidden bg-dark">
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
            <div className="relative">
              <ProfileCard
                name={aboutData.profileName}
                title={aboutData.profileTitle}
                handle={aboutData.profileHandle}
                status={aboutData.profileStatus}
                contactText="Contact"
                        avatarUrl={aboutData.profileAvatarUrl}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={handleContactClick}
              />
              
            </div>
          </motion.div>

          {/* Right: About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {aboutData.title} <span className="text-primary glow-text">{aboutData.subtitle}</span>
            </h1>

            <div className="space-y-6 text-text-primary/80 text-lg leading-relaxed">
              <p>
                {aboutData.description}
              </p>

              <p>
                {aboutData.description2}
              </p>

              {/* CV Section - Software We Use */}
              <div className="pt-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <FaCogs className="text-primary" />
                  Software & Tools
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {aboutData.software.map((tool) => (
                    <div key={tool.id} className="bg-dark-lighter/30 backdrop-blur-md border border-text-primary/10 rounded-lg p-3">
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
                  {aboutData.services.map((service) => {
                    const IconComponent = iconMap[service.icon as keyof typeof iconMap];
                    return (
                      <li key={service.id} className="flex items-start gap-2">
                        <IconComponent className="text-primary mt-1 text-sm" />
                        <span>{service.title}</span>
                      </li>
                    );
                  })}
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
            {aboutData.teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
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

    </div>
  );
}

