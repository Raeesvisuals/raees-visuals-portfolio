"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBlog, FaVideo, FaShoppingCart, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Link from 'next/link';

// Mock data - in real implementation, this would come from your backend/API
const mockBlogPosts = [
  { id: 1, title: "How We Edited a Cinematic Fitness Video", category: "Behind the Scenes", date: "2025-10-18", status: "Published" },
  { id: 2, title: "The Art of Color Grading for Brand Films", category: "Techniques", date: "2025-10-15", status: "Published" },
  { id: 3, title: "5 Transition Effects That Elevate Your Edits", category: "Tips & Tricks", date: "2025-10-12", status: "Draft" },
];

const mockPortfolioItems = [
  { id: 1, title: "Cinematic Fitness Edit", category: "Fitness", type: "Short Form", status: "Published" },
  { id: 2, title: "Motion Graphics Explainer", category: "Explainer", type: "Animation", status: "Published" },
  { id: 3, title: "SaaS Product Demo", category: "SaaS", type: "Short Form", status: "Draft" },
];

const mockShopItems = [
  { id: 1, title: "Cinematic LUT Pack - Vol. 1", category: "LUTs", price: 29.99, status: "Published" },
  { id: 2, title: "Motion Graphics Template - Tech Startup", category: "Templates", price: 45.00, status: "Published" },
  { id: 3, title: "Fitness Video Template Pack", category: "Templates", price: 39.99, status: "Draft" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'blog' | 'portfolio' | 'shop'>('blog');

  const tabs = [
    { id: 'blog' as const, label: 'Blog Posts', icon: FaBlog, count: mockBlogPosts.length },
    { id: 'portfolio' as const, label: 'Portfolio', icon: FaVideo, count: mockPortfolioItems.length },
    { id: 'shop' as const, label: 'Shop Items', icon: FaShoppingCart, count: mockShopItems.length },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'blog':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-text-primary">Blog Posts</h2>
              <Link href="/admin/blog/new">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus />
                  New Post
                </motion.button>
              </Link>
            </div>
            <div className="bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-lighter/70">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Title</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Category</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Date</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBlogPosts.map((post) => (
                      <tr key={post.id} className="border-t border-text-primary/10 hover:bg-dark-lighter/30 transition-colors">
                        <td className="px-4 py-3 text-text-primary">{post.title}</td>
                        <td className="px-4 py-3 text-text-primary/70">{post.category}</td>
                        <td className="px-4 py-3 text-text-primary/70">{post.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            post.status === 'Published' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="p-1 text-primary hover:bg-primary/10 rounded transition-colors">
                              <FaEdit />
                            </button>
                            <button className="p-1 text-text-primary hover:bg-text-primary/10 rounded transition-colors">
                              <FaEye />
                            </button>
                            <button className="p-1 text-red-400 hover:bg-red-400/10 rounded transition-colors">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-text-primary">Portfolio Items</h2>
              <Link href="/admin/portfolio/new">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus />
                  New Video
                </motion.button>
              </Link>
            </div>
            <div className="bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-lighter/70">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Title</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Category</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Type</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPortfolioItems.map((item) => (
                      <tr key={item.id} className="border-t border-text-primary/10 hover:bg-dark-lighter/30 transition-colors">
                        <td className="px-4 py-3 text-text-primary">{item.title}</td>
                        <td className="px-4 py-3 text-text-primary/70">{item.category}</td>
                        <td className="px-4 py-3 text-text-primary/70">{item.type}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Published' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="p-1 text-primary hover:bg-primary/10 rounded transition-colors">
                              <FaEdit />
                            </button>
                            <button className="p-1 text-text-primary hover:bg-text-primary/10 rounded transition-colors">
                              <FaEye />
                            </button>
                            <button className="p-1 text-red-400 hover:bg-red-400/10 rounded transition-colors">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'shop':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-text-primary">Shop Items</h2>
              <Link href="/admin/shop/new">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus />
                  New Product
                </motion.button>
              </Link>
            </div>
            <div className="bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-lighter/70">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Title</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Category</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Price</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockShopItems.map((item) => (
                      <tr key={item.id} className="border-t border-text-primary/10 hover:bg-dark-lighter/30 transition-colors">
                        <td className="px-4 py-3 text-text-primary">{item.title}</td>
                        <td className="px-4 py-3 text-text-primary/70">{item.category}</td>
                        <td className="px-4 py-3 text-primary font-semibold">${item.price}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Published' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="p-1 text-primary hover:bg-primary/10 rounded transition-colors">
                              <FaEdit />
                            </button>
                            <button className="p-1 text-text-primary hover:bg-text-primary/10 rounded transition-colors">
                              <FaEye />
                            </button>
                            <button className="p-1 text-red-400 hover:bg-red-400/10 rounded transition-colors">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-primary hover:text-primary/70 transition-colors">
            ← Back to Website
          </Link>
          <h1 className="text-4xl font-bold text-text-primary mt-4">Admin Panel</h1>
          <p className="text-text-primary/70 mt-2">Manage your content easily - just like WordPress!</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-1 bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary border border-primary/50'
                      : 'text-text-primary/70 hover:text-text-primary hover:bg-dark-lighter/30'
                  }`}
                >
                  <Icon />
                  {tab.label}
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
