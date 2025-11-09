import React from 'react';

const Hero = () => {
    return (
        <div>
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to EduNest</h1>
                    <p className="text-lg mb-8">Your gateway to quality online education.</p>
                    <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200">
                        Get Started
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Hero;