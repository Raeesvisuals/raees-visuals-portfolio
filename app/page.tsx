"use client";

import React from "react";
// Shop component removed from home page
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import IntroVideoModal from "@/components/IntroVideoModal";
import Portfolio from "@/components/Portfolio";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <IntroVideoModal />
      <Portfolio isHomepage={true} />
      <TestimonialsSection />
      <AboutSection />
      <ContactForm />
      <ContactSection />
    </>
  );
}

