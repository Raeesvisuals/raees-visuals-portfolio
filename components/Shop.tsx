"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { shopProducts, shopCategories, shopTags, ShopProduct } from "@/data/shop";
import ElectricBorder from "./ElectricBorder";
import LiquidEther from "./LiquidEther";
import PaymentModal from "./PaymentModal";
import { isProductPurchased, addPurchase } from "@/data/user";
import { FaPlay, FaDownload, FaStar, FaTag, FaShoppingCart, FaUser, FaGift } from "react-icons/fa";
import Link from "next/link";

interface ShopProps {
  isHomepage?: boolean;
}

const Shop: React.FC<ShopProps> = ({ isHomepage = false }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [visibleItems, setVisibleItems] = useState(8); // For shop page pagination
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; product: ShopProduct | null }>({
    isOpen: false,
    product: null
  });

  // Filter products based on category and tag
  const filteredProducts = shopProducts.filter((product) => {
    const categoryMatch = activeCategory === "All" || product.category === activeCategory;
    const tagMatch = !selectedTag || product.tags.includes(selectedTag);
    return categoryMatch && tagMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popular":
        return (b.downloads || 0) - (a.downloads || 0);
      default:
        return 0;
    }
  });

  // Reset visible items when filters change (only for shop page)
  useEffect(() => {
    if (!isHomepage) {
      setVisibleItems(8);
    }
  }, [activeCategory, selectedTag, sortBy, isHomepage]);

  // Display logic based on page type
  const displayedProducts = isHomepage 
    ? sortedProducts.slice(0, 4) // Homepage: show 4 items
    : sortedProducts.slice(0, visibleItems); // Shop page: show based on visibleItems

  const hasMoreProducts = isHomepage 
    ? sortedProducts.length > 4 // Homepage: has more if total > 4
    : visibleItems < sortedProducts.length; // Shop page: has more if visible < total

  // Function to load more items (shop page only)
  const loadMoreItems = () => {
    if (!isHomepage) {
      setVisibleItems(prev => Math.min(prev + 8, sortedProducts.length));
    }
  };

  // Payment handlers
  const handleBuyProduct = (product: ShopProduct) => {
    setPaymentModal({ isOpen: true, product });
  };

  const handlePaymentSuccess = (productId: number) => {
    const product = shopProducts.find(p => p.id === productId);
    if (product) {
      addPurchase({
        id: Date.now().toString(),
        productId: product.id,
        productTitle: product.title,
        productThumbnail: product.thumbnail,
        downloadUrl: product.downloadUrl,
        purchaseDate: new Date().toISOString(),
        amount: product.price,
        status: 'completed'
      });
    }
    setPaymentModal({ isOpen: false, product: null });
  };

  const closePaymentModal = () => {
    setPaymentModal({ isOpen: false, product: null });
  };

  return (
    <section id="shop" className="relative py-20 px-4 overflow-hidden min-h-screen">
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <LiquidEther
          colors={["#7df9ff", "#ff6b9d", "#4ecdc4"]}
          mouseForce={20}
          cursorSize={120}
          isViscous={true}
          viscous={25}
          resolution={0.4}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.5}
        />
      </div>
      
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter/30 to-dark pointer-events-none" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * 1920,
              y: Math.random() * 1080,
            }}
            animate={{
              y: [null, Math.random() * 1080],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-end mb-6">
            <Link href="/account">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-dark-lighter/50 backdrop-blur-md border border-text-primary/20 rounded-lg text-text-primary hover:border-primary/50 hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUser />
                My Account
              </motion.button>
            </Link>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Shop <span className="text-primary glow-text">Templates & LUTs</span>
          </h2>
          <p className="text-lg text-text-primary/70 max-w-3xl mx-auto">
            High-quality video assets to elevate your projects. Professional templates, 
            cinematic LUTs, and motion graphics to bring your vision to life.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {shopCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full backdrop-blur-md border transition-all ${
                  activeCategory === category
                    ? "bg-primary/20 border-primary text-primary font-semibold glow-border"
                    : "bg-dark-lighter/50 border-text-primary/20 text-text-primary/70 hover:border-primary/50 hover:text-text-primary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {shopTags.slice(0, 8).map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-4 py-1 rounded-full text-sm backdrop-blur-md border transition-all ${
                  selectedTag === tag
                    ? "bg-secondary/20 border-secondary text-secondary font-semibold"
                    : "bg-dark-lighter/30 border-text-primary/10 text-text-primary/60 hover:border-secondary/50 hover:text-secondary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTag className="inline w-3 h-3 mr-1" />
                {tag}
              </motion.button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-dark-lighter/50 backdrop-blur-md border border-text-primary/20 rounded-lg text-text-primary focus:border-primary focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${selectedTag}-${sortBy}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
          >
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ElectricBorder
                  color="#7df9ff"
                  speed={1}
                  chaos={0.5}
                  thickness={2}
                  style={{ borderRadius: 16 }}
                >
                  <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    glareEnable={true}
                    glareMaxOpacity={0.3}
                    glareColor="#7df9ff"
                    glareBorderRadius="16px"
                    scale={1.02}
                  >
                    <Link href={`/shop/${product.id}`}>
                      <motion.div
                        className="group relative bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-2xl overflow-hidden cursor-pointer h-full"
                        whileHover={{ borderColor: "rgba(125, 249, 255, 0.5)" }}
                      >
                      {/* Product Thumbnail */}
                      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-dark-lighter overflow-hidden">
                        {product.thumbnail && !product.thumbnail.includes('placeholder') ? (
                          <Image 
                            src={product.thumbnail} 
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                              className="w-16 h-16 rounded-full bg-primary/30 backdrop-blur-md border border-primary flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              <FaPlay className="text-primary text-xl ml-1" />
                            </motion.div>
                          </motion.div>
                        )}

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && (
                            <span className="px-2 py-1 bg-primary/20 backdrop-blur-md border border-primary/50 rounded-full text-xs text-primary font-semibold">
                              NEW
                            </span>
                          )}
                          {product.isPopular && (
                            <span className="px-2 py-1 bg-secondary/20 backdrop-blur-md border border-secondary/50 rounded-full text-xs text-secondary font-semibold">
                              POPULAR
                            </span>
                          )}
                          {product.isOnSale && (
                            <span className="px-2 py-1 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-full text-xs text-red-400 font-semibold">
                              SALE
                            </span>
                          )}
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 px-3 py-1 bg-dark-lighter/80 backdrop-blur-md border border-text-primary/20 rounded-full text-xs text-text-primary font-semibold">
                          {product.category}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                          <p className="text-text-primary/60 text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          
                          {/* Rating and Downloads */}
                          <div className="flex items-center gap-4 mb-4 text-sm text-text-primary/60">
                            {product.rating && (
                              <div className="flex items-center gap-1">
                                <FaStar className="text-yellow-400" />
                                <span>{product.rating}</span>
                              </div>
                            )}
                            {product.downloads && (
                              <div className="flex items-center gap-1">
                                <FaDownload />
                                <span>{product.downloads.toLocaleString()}</span>
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {product.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price and Buy Button */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-primary">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-text-primary/50 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className="text-text-primary/60 text-sm">
                              {product.currency}
                            </span>
                          </div>
                          
                          {product.price === 0 ? (
                            <motion.button
                              className="w-full py-3 bg-green-500/20 backdrop-blur-md border border-green-500/50 rounded-lg text-green-400 font-semibold flex items-center justify-center gap-2 hover:bg-green-500/30 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FaGift />
                              Free Download
                            </motion.button>
                          ) : isProductPurchased(product.id) ? (
                            <Link href="/account">
                              <motion.button
                                className="w-full py-3 bg-green-500/20 backdrop-blur-md border border-green-500/50 rounded-lg text-green-400 font-semibold flex items-center justify-center gap-2 hover:bg-green-500/30 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <FaDownload />
                                Download Now
                              </motion.button>
                            </Link>
                          ) : (
                            <motion.button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleBuyProduct(product);
                              }}
                              className="w-full py-3 bg-primary/10 backdrop-blur-md border border-primary/50 rounded-lg text-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FaShoppingCart />
                              Buy Now - ${product.price}
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {/* Glow Effect on Hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          boxShadow: "inset 0 0 20px rgba(125, 249, 255, 0.2)",
                        }}
                      />
                      </motion.div>
                    </Link>
                  </Tilt>
                </ElectricBorder>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show More Button */}
        {hasMoreProducts && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isHomepage ? (
              // Homepage: Link to shop page
              <motion.a
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 backdrop-blur-md border border-primary/50 rounded-lg text-primary font-semibold hover:bg-primary/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More Products
                <svg
                  className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
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
              </motion.a>
            ) : (
              // Shop page: Load more items
              <motion.button
                onClick={loadMoreItems}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 backdrop-blur-md border border-primary/50 rounded-lg text-primary font-semibold hover:bg-primary/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More Products
                <svg
                  className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
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
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-text-primary/60">
            {isHomepage ? (
              <>
                Featured products: {displayedProducts.length} of {sortedProducts.length} total
                {activeCategory !== "All" && ` in ${activeCategory}`}
                {selectedTag && ` tagged with "${selectedTag}"`}
              </>
            ) : (
              <>
                Showing {displayedProducts.length} of {sortedProducts.length} products
                {activeCategory !== "All" && ` in ${activeCategory}`}
                {selectedTag && ` tagged with "${selectedTag}"`}
              </>
            )}
          </p>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        product={paymentModal.product}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </section>
  );
};

export default Shop;
