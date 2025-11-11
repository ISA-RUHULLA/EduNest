import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div>
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    {/* Heading Animation */}
                    <motion.h1
                        className="text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        Welcome to EduNest
                    </motion.h1>

                    {/* Paragraph Animation */}
                    <motion.p
                        className="text-lg mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    >
                        Your gateway to quality online education.
                    </motion.p>

                    {/* Button Animation */}
                    <motion.button
                        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/dashboard')}
                    >
                        Get Started
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

export default Hero;
