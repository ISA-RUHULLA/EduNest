import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className=" text-center py-20 px-6 rounded-lg shadow dark:bg-gray-400">
            <div className="max-w-3xl mx-auto">
                <motion.h1
                    className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    🎓 Unlock Limitless Learning with Expert-Led Online Courses 🎓
                </motion.h1>

                <motion.p
                    className=" text-base-content md:text-lg mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                >
                    Discover a world of knowledge with our top-rated instructors. Learn anytime,
                    anywhere, and upgrade your skills through practical, engaging, and
                    career-focused online courses.
                </motion.p>

                <motion.button
                    className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/courses')}
                >
                    Explore Courses & Get Started
                </motion.button>
            </div>
        </section>
    );
};

export default Hero;
