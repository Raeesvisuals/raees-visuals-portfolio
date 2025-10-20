"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogPost() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Post Not Found
          </h1>
          <Link href="/blog">
            <motion.button
              className="px-6 py-3 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Blog
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/blog">
            <motion.button
              className="flex items-center gap-2 text-text-primary/70 hover:text-primary transition-colors"
              whileHover={{ x: -5 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </motion.button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/50 rounded-full text-sm text-primary font-semibold">
              {post.category}
            </span>
            <span className="text-text-primary/50 text-sm">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-text-primary/70 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Featured Image */}
          <motion.div
            className="relative aspect-video bg-gradient-to-br from-primary/10 via-dark-lighter to-primary/5 rounded-2xl overflow-hidden mb-12 border border-primary/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Content */}
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6 text-text-primary/80 leading-relaxed">
              <p>
                This is placeholder content for the blog post. In a real application,
                you would fetch the full article content from your CMS or database.
              </p>

              <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">
                The Process
              </h2>
              <p>
                Our approach combines technical expertise with creative storytelling.
                We believe that great video editing is about more than just cutting
                footage—it&apos;s about crafting narratives that resonate with your audience.
              </p>

              <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-text-primary/70">
                <li>Planning is essential for efficient editing workflows</li>
                <li>Color grading can dramatically enhance your story</li>
                <li>Sound design is equally important as visuals</li>
                <li>Pacing keeps your audience engaged throughout</li>
              </ul>

              <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">
                Conclusion
              </h2>
              <p>
                Whether you&apos;re creating fitness videos, commercials, or documentaries,
                these principles apply across all video editing projects. The key is
                to stay focused on your story and let the technical skills serve the
                narrative.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-md border border-primary/20 rounded-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              Ready to create something amazing?
            </h3>
            <p className="text-text-primary/70 mb-6">
              Let&apos;s bring your vision to life with professional video editing.
            </p>
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-primary/10 backdrop-blur-md border border-primary/50 rounded-lg text-primary font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}

