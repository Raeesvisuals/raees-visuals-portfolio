"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaEye, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import FileUpload from '@/components/FileUpload';

export default function NewPortfolioItem() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Fitness',
    type: 'Short Form',
    video: '',
    thumbnail: '',
    youtubeId: '',
    isYouTube: false,
    status: 'draft'
  });

  const [uploadedVideo, setUploadedVideo] = useState<string>('');

  const categories = ['Fitness', 'SaaS', 'Explainer', 'Commercial', 'Documentary', 'Animation'];
  const types = ['Short Form', 'Long Form', 'Animation'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving portfolio item:', formData);
    alert('Portfolio item saved! (In real implementation, this would save to your database)');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleVideoUpload = (files: File[]) => {
    // In real implementation, you would upload the video file to your server
    if (files.length > 0) {
      const videoUrl = `/uploads/portfolio/${Date.now()}_${files[0].name}`;
      setUploadedVideo(videoUrl);
      setFormData(prev => ({
        ...prev,
        video: videoUrl
      }));
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="flex items-center gap-2 text-primary hover:text-primary/70 transition-colors mb-4">
            <FaArrowLeft />
            Back to Admin Panel
          </Link>
          <h1 className="text-4xl font-bold text-text-primary">Add New Portfolio Item</h1>
          <p className="text-text-primary/70 mt-2">Add a new video to your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Video Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-primary font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark border border-text-primary/20 rounded-lg text-text-primary focus:border-primary focus:outline-none transition-colors"
                  placeholder="Enter video title..."
                  required
                />
              </div>

              <div>
                <label className="block text-text-primary font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark border border-text-primary/20 rounded-lg text-text-primary focus:border-primary focus:outline-none transition-colors"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-text-primary font-medium mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark border border-text-primary/20 rounded-lg text-text-primary focus:border-primary focus:outline-none transition-colors"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Video Source */}
          <div className="bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Video Source</h2>
            
            <div className="mb-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isYouTube"
                  checked={formData.isYouTube}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-primary bg-dark border-text-primary/20 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-text-primary">This is a YouTube video</span>
              </label>
            </div>

            {formData.isYouTube ? (
              <div>
                <label className="block text-text-primary font-medium mb-2">YouTube Video ID *</label>
                <input
                  type="text"
                  name="youtubeId"
                  value={formData.youtubeId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark border border-text-primary/20 rounded-lg text-text-primary focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g., dQw4w9WgXcQ (from youtube.com/watch?v=dQw4w9WgXcQ)"
                  required={formData.isYouTube}
                />
                <p className="text-text-primary/50 text-sm mt-2">
                  Just the video ID part, not the full URL. The thumbnail will be auto-generated.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Self-hosted Video Upload */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Upload Self-hosted Video</h3>
                  <FileUpload
                    label="Video File"
                    accept="video/*"
                    maxSize={500}
                    multiple={false}
                    onFilesSelected={handleVideoUpload}
                    uploadedFiles={uploadedVideo ? [uploadedVideo] : []}
                    fileType="video"
                  />
                </div>

                {/* OR Video URL */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-text-primary/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-dark text-text-primary/50">OR</span>
                  </div>
                </div>

                <div>
                  <label className="block text-text-primary font-medium mb-2">Video URL (Alternative)</label>
                  <input
                    type="url"
                    name="video"
                    value={formData.video}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark border border-text-primary/20 rounded-lg text-text-primary focus:border-primary focus:outline-none transition-colors"
                    placeholder="https://example.com/video.mp4"
                  />
                  <p className="text-text-primary/50 text-sm mt-2">
                    Use this if you want to provide a direct URL instead of uploading
                  </p>
                </div>
              </div>
            )}

            {!formData.isYouTube && (
              <div className="mt-6">
                <label className="block text-text-primary font-medium mb-2">Thumbnail URL</label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark border border-text-primary/20 rounded-lg text-text-primary focus:border-primary focus:outline-none transition-colors"
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>
            )}
          </div>

          {/* Preview */}
          {formData.youtubeId && formData.isYouTube && (
            <div className="bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6">Preview</h2>
              <div className="aspect-video bg-dark rounded-lg overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${formData.youtubeId}/maxresdefault.jpg`}
                  alt="YouTube thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Status */}
          <div className="bg-dark-lighter/50 backdrop-blur-md border border-text-primary/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Publish Settings</h2>
            <div>
              <label className="block text-text-primary font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark border border-text-primary/20 rounded-lg text-text-primary focus:border-primary focus:outline-none transition-colors"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSave />
              Save Portfolio Item
            </motion.button>

            <motion.button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-dark-lighter/50 border border-text-primary/20 rounded-lg text-text-primary hover:bg-dark-lighter/70 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEye />
              Preview
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
