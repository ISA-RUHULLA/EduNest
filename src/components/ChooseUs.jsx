import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const ChooseUs = () => {
    const reasons = [
        {
            title: "Expert Instructors",
            description:
                "Learn from highly qualified professionals with years of experience in their fields.",
        },
        {
            title: "Flexible Learning",
            description:
                "Access courses anytime, anywhere with our fully responsive and user-friendly platform.",
        },
        {
            title: "Career Growth",
            description:
                "Get hands-on skills and certifications that help you boost your professional journey.",
        },
    ];

    return (
        <div className="p-6 dark:bg-gray-400 md:p-10 lg:p-16 rounded-lg shadow">
            <div className="text-center mb-10">
                <h2 className="text-3xl dark:text-white md:text-4xl font-bold mb-3">🎯 Why Choose Us</h2>
                <p className="text-black text-sm md:text-base">
                    Discover the benefits of learning with EduNest and <br /> how we stand out from the rest.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {reasons.map((item, index) => (
                    <AnimatedCard key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
};

// Reusable Animated Card Component
const AnimatedCard = ({ item, index }) => {
    const controls = useAnimation();
    const [ref, setRef] = useState(null);

    useEffect(() => {
        if (!ref) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        controls.start({
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: index * 0.2 },
                        });
                    } else {
                        controls.start({ opacity: 0, y: 80 }); 
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref, controls, index]);

    return (
        <motion.div
            ref={setRef}
            initial={{ opacity: 0, y: 80 }}
            animate={controls}
            className="bg-blue-900 text-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition"
        >
            <h2 className="text-xl md:text-2xl font-bold mb-3">{item.title}</h2>
            <p className="text-gray-200 text-sm md:text-base mb-4">{item.description}</p>
            <button className="btn btn-primary border-none text-white font-semibold hover:bg-yellow-400">
                Learn More
            </button>
        </motion.div>
    );
};

export default ChooseUs;
