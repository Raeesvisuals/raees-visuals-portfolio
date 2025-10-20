"use client";

import React from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { shopProducts } from "@/data/shop";
import ElectricBorder from "@/components/ElectricBorder";
import LiquidEther from "@/components/LiquidEther";
import { FaPlay, FaDownload, FaStar, FaShoppingCart, FaArrowLeft, FaTag, FaCalendar, FaFile } from "react-icons/fa";
import Link from "next/link";


interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = parseInt(params.id);
  const product = shopProducts.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dark">
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
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter/20 to-dark pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/shop">
            <motion.button
              className="flex items-center gap-2 text-text-primary hover:text-primary transition-colors"
              whileHover={{ x: -5 }}
            >
              <FaArrowLeft />
              Back to Shop
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Media */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ElectricBorder
              color="#7df9ff"
              speed={1}
              chaos={0.3}
              thickness={2}
              style={{ borderRadius: 20 }}
            >
              <div className="relative aspect-video bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-2xl overflow-hidden">
                {product.thumbnail && !product.thumbnail.includes('placeholder') ? (
                  <Image 
                    src={product.thumbnail} 
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark-lighter to-primary/5" />
                )}
                
                {/* Preview Video Overlay */}
                {product.previewVideo && (
                  <motion.div
                    className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-primary/30 backdrop-blur-md border border-primary flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaPlay className="text-primary text-2xl ml-1" />
                    </motion.div>
                  </motion.div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/50 rounded-full text-sm text-primary font-semibold">
                      NEW
                    </span>
                  )}
                  {product.isPopular && (
                    <span className="px-3 py-1 bg-secondary/20 backdrop-blur-md border border-secondary/50 rounded-full text-sm text-secondary font-semibold">
                      POPULAR
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="px-3 py-1 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-full text-sm text-red-400 font-semibold">
                      SALE
                    </span>
                  )}
                </div>
              </div>
            </ElectricBorder>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Title and Category */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/50 rounded-full text-sm text-primary font-semibold">
                  {product.category}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    <span className="text-text-primary">{product.rating}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                {product.title}
              </h1>
              
              <p className="text-lg text-text-primary/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-text-primary/50 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-text-primary/60">
                {product.currency}
              </span>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-text-primary/70">
                <FaFile />
                <span>{product.fileSize}</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary/70">
                <FaTag />
                <span>{product.format}</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary/70">
                <FaDownload />
                <span>{product.resolution}</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary/70">
                <FaCalendar />
                <span>{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-text-primary/70">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Download Stats */}
            {product.downloads && (
              <div className="text-text-primary/60">
                <span className="font-semibold">{product.downloads.toLocaleString()}</span> downloads
              </div>
            )}

            {/* Buy Button */}
            <motion.button
              className="w-full py-4 bg-primary/10 backdrop-blur-md border border-primary/50 rounded-lg text-primary font-semibold text-lg flex items-center justify-center gap-3 hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaShoppingCart />
              Add to Cart - ${product.price}
            </motion.button>

            {/* Download Button */}
            <motion.button
              className="w-full py-3 bg-dark-lighter/50 backdrop-blur-md border border-text-primary/20 rounded-lg text-text-primary font-semibold flex items-center justify-center gap-3 hover:border-primary/50 hover:text-primary transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDownload />
              Download Now
            </motion.button>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Related Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`}>
                  <motion.div
                    className="group relative bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-2xl overflow-hidden cursor-pointer"
                    whileHover={{ borderColor: "rgba(125, 249, 255, 0.5)" }}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-dark-lighter overflow-hidden">
                      {relatedProduct.thumbnail && !relatedProduct.thumbnail.includes('placeholder') ? (
                        <Image 
                          src={relatedProduct.thumbnail} 
                          alt={relatedProduct.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark-lighter to-primary/5" />
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold">
                          ${relatedProduct.price}
                        </span>
                        <span className="text-text-primary/60 text-sm">
                          {relatedProduct.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
