"use client";

import React from "react";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import IntroVideoModal from "@/components/IntroVideoModal";
import Portfolio from "@/components/Portfolio";
import Shop from "@/components/Shop";
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
      <Shop isHomepage={true} />
      <TestimonialsSection />
      <AboutSection />
      <ContactForm />
      <ContactSection />
    </>
  );
}

