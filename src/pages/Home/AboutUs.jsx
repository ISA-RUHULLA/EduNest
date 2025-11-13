import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="dark:bg-gray-400 py-16 shadow">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6"
        >
          About <span className="text-blue-600">EduNest</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          EduNest is an innovative online learning platform designed to make quality
          education accessible to everyone, anywhere. Our mission is to build a
          digital “nest” where learners can grow their skills, explore new knowledge,
          and achieve their career goals — all at their own pace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          <div className="bg-white shadow-md rounded-2xl p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-blue-800 mb-3">🎓 Learn from Experts</h3>
            <p className="text-gray-600">
              Our instructors are professionals from top industries and universities,
              bringing real-world experience directly to your screen.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-blue-800 mb-3">🌍 Learn Anytime, Anywhere</h3>
            <p className="text-gray-600">
              Access our high-quality video lessons, quizzes, and projects from any
              device — at your convenience and pace.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-blue-800 mb-3">🚀 Grow Your Career</h3>
            <p className="text-gray-600">
              Whether you’re a student, professional, or lifelong learner, EduNest
              helps you develop in-demand skills that open new career opportunities.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
            To empower millions of learners by providing a flexible, affordable, and
            community-driven platform for personal and professional growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
