"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import Image from 'next/image';

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const testimonials = [
    {
      id: 1,
      name: 'Alex Thompson',
      role: 'Tech Entrepreneur',
      niche: 'Technology',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'Working with Raees was an absolute game-changer for our startup. Raees\'s video editing skills brought our product launch video to life in ways we never imagined possible. The attention to detail and cinematic quality exceeded all our expectations.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      role: 'Fashion Influencer',
      niche: 'Fashion & Lifestyle',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Raees transformed my fashion content with incredible video editing that perfectly captures my brand aesthetic. Raees\'s work helped increase my engagement by over 300%. The color grading and transitions are absolutely stunning!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Marcus Rodriguez',
      role: 'Fitness Coach',
      niche: 'Fitness & Health',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Raees made my fitness videos absolutely incredible! The energy and pacing Raees created through expert editing made all the difference. My clients love the professional quality and my follower count skyrocketed after working with Raees.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Emily Chen',
      role: 'Restaurant Owner',
      niche: 'Food & Beverage',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'Our restaurant\'s marketing videos went viral thanks to Raees\'s amazing editing work. Raees perfectly captured the essence of our brand and made our dishes look absolutely mouth-watering. The customer response has been phenomenal!',
      rating: 5,
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Music Producer',
      niche: 'Music & Entertainment',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      content: 'Raees\'s video editing for my music videos is next-level. Raees perfectly synced every beat and created visual storytelling that elevated my tracks beyond what I thought possible. The artistic vision Raees brings is unmatched.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Lisa Washington',
      role: 'Travel Blogger',
      niche: 'Travel & Tourism',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      content: 'My travel content reached millions of views after Raees edited my videos. Raees\'s ability to capture the magic of each destination and weave it into compelling narratives is remarkable. Working with Raees was the best decision I made for my brand.',
      rating: 5,
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-lighter/30 via-dark to-dark-lighter/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Client <span className="text-primary glow-text">Testimonials</span>
          </h2>
          <p className="text-lg text-text-primary/70 max-w-3xl mx-auto">
            Don&apos;t just take our word for it — hear from satisfied clients
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="h-full bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-2xl p-6 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-text-primary/80 mb-6 leading-relaxed text-sm">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold text-text-primary text-base">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-text-primary/60 mb-1">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {testimonial.niche}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;

