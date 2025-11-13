
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { desc } from "framer-motion/client";

const TopInstructors = () => {
    const instructors = [
        {
            name: "Ayman Sadiq",
            desc: "Expert in educational content creation and online teaching.",
            avgRating: 4.9,
            courseCount: 8,
            thumbnail: "https://cdn.10minuteschool.com/images/skills/lp/as_onset.jpg",
        },
        {
            name: "Fahad Hossain",
            desc: "Assistant Professor in the State University of Bangladesh.",
            avgRating: 4.8,
            courseCount: 6,
            thumbnail: "https://webapp.ft.education/storage/teacher_images/mdpNgblL5B7S5VN4k7XMtq5015OrlTIz9K8L1Ica.jpg",
        },
        {
            name: "Md. Numeri Sattar Apar",
            desc: "Experienced educator and curriculum developer.",
            avgRating: 4.7,
            courseCount: 5,
            thumbnail: "https://static1.personalitydatabase.net/2/pdb-images-prod/e72b521b/profile_images/7472ed67410a4631aefd5a91563cdb96.png",
        },
    ];

    return (
        <div className="p-6 my-3 dark:bg-gray-400 rounded-lg shadow">
            <div className="text-center">
                <h2 className="font-bold mt-10 mb-3 text-3xl md:text-4xl text-black">
                    🏆 Top Instructors
                </h2>
                <p className="dark:text-white text-center mb-10">
                    Meet our top-rated instructors who are experts in br their <br /> fields and passionate about teaching.
                </p>
            </div>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                {instructors.map((inst, i) => (
                    <AnimatedInstructorCard key={i} inst={inst} />
                ))}
            </div>
        </div>
    );
};

const AnimatedInstructorCard = ({ inst }) => {
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
                            transition: { duration: 0.6, ease: "easeOut" },
                        });
                    } else {
                        controls.start({ opacity: 0, y: 100 });
                    }
                });
            },
            { threshold: 0.2 }
        );
        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref, controls]);

    return (
        <motion.div
            ref={setRef}
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
            className="bg-blue-900  rounded-xl shadow-lg p-4 text-center hover:shadow-2xl transition"
        >
            <img
                src={inst.thumbnail}
                alt={inst.name}
                className="w-64 h-64 object-cover rounded-full mx-auto mb-3"
            />
            <h3 className="text-2xl font-bold text-white">{inst.name}</h3>
            <p className="text-gray-300 mt-2">{inst.desc}</p>
            <p className="text-gray-400 text-sm">{inst.courseCount} Courses</p>
            <p className="mt-2 font-bold text-yellow-500">⭐ {inst.avgRating}</p>
        </motion.div>
    );
};

export default TopInstructors;
